const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || 'oppozite-wears.myshopify.com';
const SHOPIFY_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'd6273dc275a3bc860f775a3efb506f52';
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.oppozitewears.com';

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

    if (collection) {
      // Fetch Collection Data
      const shopifyRes = await fetch(shopifyUrl, {
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
      const json = await shopifyRes.json();
      const data = json?.data?.collectionByHandle;

      if (data) {
        title = `${data.title} | Oppozite Wears`;
        description = data.description || description;
        image = data.image?.url || image;
        debugLog += ` | Collection Found: ${title}`;
      } else {
        debugLog += ` | Collection NOT Found`;
      }

    } else if (handle) {
      // Fetch Product Data
      const shopifyRes = await fetch(shopifyUrl, {
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
      const json = await shopifyRes.json();
      const data = json?.data?.productByHandle;

      if (data) {
        title = `${data.title} | Oppozite Wears`;
        description = data.description || description;
        image = data?.images?.edges?.[0]?.node?.url || image;
        debugLog += ` | Product Found: ${title}`;
      } else {
        debugLog += ` | Product NOT Found`;
      }
    }

    debugLog += ` | Final Image: ${image}`;

    // 2. Fetch the Base HTML
    const proto = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['x-forwarded-host'] || request.headers.host;
    const htmlUrl = `${proto}://${host}/index.html`;
    debugLog += ` | Fetching HTML from: ${htmlUrl}`;

    const baseHtmlRes = await fetch(htmlUrl);
    let baseHtml = await baseHtmlRes.text();
    let html = baseHtml;

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
    console.error('SEO Generation Error:', error);
    // Fallback to basic redirect
    return response.redirect('/');
  }
}
