const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || 'oppozite-wears.myshopify.com';
const SHOPIFY_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'd6273dc275a3bc860f775a3efb506f52';
const SITE_URL = process.env.VITE_SITE_URL || 'https://oppozitewears.com';

const PRODUCT_QUERY = `
  query getProductMeta($handle: String!) {
    productByHandle(handle: $handle) {
      title
      description
      images(first: 1) {
        edges {
          node {
            url(transform: { maxWidth: 1200, maxHeight: 630, preferredContentType: JPG })
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query getCollectionMeta($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      description
      image {
        url(transform: { maxWidth: 1200, maxHeight: 630, preferredContentType: JPG })
      }
    }
  }
`;

// Using standard Vercel function signature without explicit types to avoid adding dependency
export default async function handler(request: any, response: any) {
  const { handle, collection } = request.query;

  if (!handle && !collection) {
    return response.redirect('/');
  }

  let debugLog = `Params: handle=${handle}, collection=${collection}`;

  // Default Fallbacks
  let title = 'Oppozite Wears';
  let description = 'Premium streetwear for those who dare to be different';
  let image = `${SITE_URL}/og-image.png`;

  try {
    const shopifyUrl = `https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`;
    debugLog += ` | Shopify URL: ${shopifyUrl}`;

    // 1. Prepare HTML URL
    const proto = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['x-forwarded-host'] || request.headers.host;
    const htmlUrl = `${proto}://${host}/index.html`;
    debugLog += ` | Fetching HTML from: ${htmlUrl}`;

    // 2. Parallel Execution: Fetch Shopify Data AND Base HTML
    const fetchShopify = async () => {
      if (collection) {
        // Fetch Collection Data
        const res = await fetch(shopifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
          },
          body: JSON.stringify({
            query: COLLECTION_QUERY,
            variables: { handle: collection },
          }),
        });
        const json = await res.json();
        return { type: 'collection', data: json?.data?.collectionByHandle };
      } else if (handle) {
        // Fetch Product Data
        const res = await fetch(shopifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
          },
          body: JSON.stringify({
            query: PRODUCT_QUERY,
            variables: { handle },
          }),
        });
        const json = await res.json();
        return { type: 'product', data: json?.data?.productByHandle };
      }
      return null;
    };

    const [shopifyResult, baseHtmlRes] = await Promise.all([
      fetchShopify().catch(err => {
        console.error('Shopify Fetch Error:', err);
        return null;
      }),
      fetch(htmlUrl).catch(err => {
        console.error('HTML Fetch Error:', err);
        return null;
      })
    ]);

    // Process Shopify Result
    if (shopifyResult?.data) {
      const { data, type } = shopifyResult;
      title = `${data.title} | Oppozite Wears`;
      description = data.description || description;

      if (type === 'collection') {
        image = data.image?.url || image;
        debugLog += ` | Collection Found: ${title}`;
      } else {
        image = data.images?.edges?.[0]?.node?.url || image;
        debugLog += ` | Product Found: ${title}`;
      }
    } else {
      debugLog += ` | Content NOT Found or Error`;
    }

    debugLog += ` | Final Image: ${image}`;

    // Process HTML
    let html = '';
    if (baseHtmlRes && baseHtmlRes.ok) {
      html = await baseHtmlRes.text();
    } else {
      // Fallback HTML if fetch fails (Critical fallback)
      console.error('Failed to fetch index.html, using fallback.');
      // We try to return a valid HTML shell that loads the app scripts
      // Note: We can't easily guess the script name in Vite (hashed), 
      // so this is a "Hail Mary" that relies on the rewrite trying again or something, 
      // but typically if index.html fetch fails, we should just redirect to avoid a blank screen
      // IF we can't serve the app.
      // However, simply redirecting to / might be annoying. 
      // We'll proceed with redirect if HTML failure, as we can't render the App without the JS refs.
      return response.redirect(307, '/index.html'); // Redirect to the static file directly
    }

    // Helper to remove all existing instances and append new one
    const replaceMeta = (keyAttr: string, keyName: string, rawContent: string) => {
      const content = (rawContent || '').replace(/"/g, '&quot;');
      const regex = new RegExp(`<meta[^>]*${keyAttr}=["']${keyName}["'][^>]*>`, 'gi');
      html = html.replace(regex, '');
      const newTag = `<meta ${keyAttr}="${keyName}" content="${content}" />`;
      html = html.replace('</head>', `${newTag}\n</head>`);
    };

    // Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/gi, '');
    html = html.replace('</head>', `<title>${title}</title>\n</head>`);

    // Replace Meta Tags
    replaceMeta('property', 'og:title', title);
    replaceMeta('name', 'twitter:title', title);

    replaceMeta('name', 'description', description);
    replaceMeta('property', 'og:description', description);
    replaceMeta('name', 'twitter:description', description);

    replaceMeta('property', 'og:image', image);
    replaceMeta('name', 'twitter:image', image);

    // Inject Debug Comment
    html = html.replace('</body>', `<!-- SEO DEBUG: ${debugLog} --></body>`);

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    return response.status(200).send(html);

  } catch (error: any) {
    console.error('SEO Generation Fatal Error:', error);
    // Fallback: Just let the client handle it via redirecting to the route (but bypassing API)
    // To bypass API, we might redirect to /index.html, but that changes URL.
    // Ideally we output something.
    return response.redirect('/');
  }
}
