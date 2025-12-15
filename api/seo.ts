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

    // 2. Fetch the Base HTML
    // Using the protocol and host from the request to ensure we hit the current deployment
    const proto = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['x-forwarded-host'] || request.headers.host;
    const htmlUrl = `${proto}://${host}/index.html`;
    debugLog += ` | Fetching HTML from: ${htmlUrl}`;

    const baseHtmlRes = await fetch(htmlUrl);
    baseHtml = await baseHtmlRes.text();

    // 3. Inject Meta Tags
    // Using robust regex to handle potential minification (missing spaces, etc.)
    let html = baseHtml;

    // Helper to safe replace
    const replaceMeta = (property: string, content: string) => {
      // Matches <meta property="p" content="..." /> OR <meta name="p" ... />
      // Handles variable whitespace, single/double quotes, and closing slash
      const regex = new RegExp(`<meta (?:property|name)=["']${property}["'] content=["'][^"']*["']\\s*\\/?>`, 'i');

      // If match found, replace it. If not, append it to <head>.
      if (regex.test(html)) {
        html = html.replace(regex, `<meta property="${property}" content="${content}" />`);
      } else {
        // If not found (unlikely for standard tags), inject before </head>
        html = html.replace('</head>', `<meta property="${property}" content="${content}" /></head>`);
      }
    };

    const replaceTitle = (newTitle: string) => {
      const regex = /<title>[\s\S]*?<\/title>/i;
      if (regex.test(html)) {
        html = html.replace(regex, `<title>${newTitle}</title>`);
      } else {
        html = html.replace('</head>', `<title>${newTitle}</title></head>`);
      }
    };

    replaceTitle(title);

    // Replace Descriptions
    replaceMeta('description', description);
    replaceMeta('og:description', description);
    replaceMeta('twitter:description', description);

    // Replace Titles
    replaceMeta('og:title', title);
    replaceMeta('twitter:title', title);

    // Replace Images
    replaceMeta('og:image', image);
    replaceMeta('twitter:image', image);

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
