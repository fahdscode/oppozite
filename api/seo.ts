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
            url
          }
        }
      }
    }
  }
`;

// Using standard Vercel function signature without explicit types to avoid adding dependency
export default async function handler(request: any, response: any) {
  const { handle } = request.query;

  if (!handle || typeof handle !== 'string') {
    return response.redirect('/');
  }

  let debugLog = `Handle detected: ${handle}`;
  let baseHtml = '';

  try {
    // 1. Fetch Product Data
    const shopifyUrl = `https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`;
    debugLog += ` | Shopify URL: ${shopifyUrl}`;

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
    const product = json?.data?.productByHandle;
    debugLog += ` | Product Found: ${!!product}`;

    // Default Fallback
    const title = product?.title ? `${product.title} | Oppozite Wears` : 'Oppozite Wears';
    const description = product?.description || 'Premium streetwear for those who dare to be different';
    const image = product?.images?.edges?.[0]?.node?.url || `${SITE_URL}/og-image.png`;
    debugLog += ` | Image: ${image}`;

    // 2. Fetch the Base HTML
    // Using the protocol and host from the request to ensure we hit the current deployment
    const proto = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['x-forwarded-host'] || request.headers.host;
    const htmlUrl = `${proto}://${host}/index.html`;
    debugLog += ` | Fetching HTML from: ${htmlUrl}`;

    const baseHtmlRes = await fetch(htmlUrl);
    baseHtml = await baseHtmlRes.text();

    // 3. Inject Meta Tags
    let html = baseHtml;

    // Helper to remove all existing instances and append new one
    // robust against attribute order
    const replaceMeta = (keyAttr: string, keyName: string, rawContent: string) => {
      // Escape double quotes to prevent breaking HTML attributes
      const content = (rawContent || '').replace(/"/g, '&quot;');

      // Regex to find any meta tag containing keyAttr="keyName" (case insensitive)
      const regex = new RegExp(`<meta[^>]*${keyAttr}=["']${keyName}["'][^>]*>`, 'gi');

      // Remove all existing tags
      html = html.replace(regex, '');

      // Append new tag before closing head
      const newTag = `<meta ${keyAttr}="${keyName}" content="${content}" />`;
      html = html.replace('</head>', `${newTag}\n</head>`);
    };

    // Remove existing title tags (standard and OG)
    html = html.replace(/<title>[\s\S]*?<\/title>/gi, '');
    // Append new title
    html = html.replace('</head>', `<title>${title}</title>\n</head>`);

    // Update Meta Tags
    replaceMeta('property', 'og:title', title);
    replaceMeta('name', 'twitter:title', title);

    replaceMeta('name', 'description', description);
    replaceMeta('property', 'og:description', description);
    replaceMeta('name', 'twitter:description', description);

    replaceMeta('property', 'og:image', image);
    replaceMeta('name', 'twitter:image', image);

    // Inject Debug Comment at the end of body
    html = html.replace('</body>', `<!-- SEO DEBUG: ${debugLog} --></body>`);

    // Set Cache Headers
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    return response.status(200).send(html);

  } catch (error: any) {
    console.error('SEO Generation Error:', error);
    // Serve base HTML (if available) with default tags on error, instead of redirect loop
    if (baseHtml) {
      return response.status(200).send(baseHtml + `<!-- SEO DEBUG ERROR: ${error.message} -->`);
    }
    return response.redirect('/');
  }
}
