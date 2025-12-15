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

    try {
        // 1. Fetch Product Data
        const shopifyRes = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`, {
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

        const { data } = await shopifyRes.json();
        const product = data?.productByHandle;

        // Default Fallback
        const title = product?.title ? `${product.title} | Oppozite Wears` : 'Oppozite Wears';
        const description = product?.description || 'Premium streetwear for those who dare to be different';
        const image = product?.images?.edges?.[0]?.node?.url || `${SITE_URL}/og-image.png`;

        // 2. Fetch the Base HTML (we fetch the index page from the production deployment)
        // Using the protocol and host from the request to ensure we hit the current deployment
        const proto = request.headers['x-forwarded-proto'] || 'https';
        const host = request.headers['x-forwarded-host'] || request.headers.host;
        const baseHtmlRes = await fetch(`${proto}://${host}/index.html`);
        let html = await baseHtmlRes.text();

        // 3. Inject Meta Tags
        // We strictly replace existing tags to avoid duplication, or inject if missing
        // Simple string replacement strategy

        // Replace Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

        // Replace Description
        html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
        html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
        html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);

        // Replace Title Meta
        html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
        html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);

        // Replace Image
        html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`);
        html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`);

        // Set Cache Headers (important for performance, but short enough for updates)
        response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        response.setHeader('Content-Type', 'text/html; charset=utf-8');

        return response.status(200).send(html);

    } catch (error) {
        console.error('SEO Generation Error:', error);
        // Fallback to basic redirect or serving index if possible, but redirect is safest to ensure app loads
        // However, returning index.html content (even if stale tags) is better.
        return response.redirect(`/products/${handle}`);
    }
}
