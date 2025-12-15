const https = require('https');

const SHOPIFY_DOMAIN = 'oppozite-wears.myshopify.com';
const SHOPIFY_TOKEN = 'd6273dc275a3bc860f775a3efb506f52';

const query = `
  query getProductMeta($handle: String!) {
    products(first: 1) {
      edges {
        node {
          handle
          title
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const options = {
  hostname: SHOPIFY_DOMAIN,
  path: '/api/2025-07/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status Base:', res.statusCode);
    try {
        const json = JSON.parse(data);
        console.log('Response:', JSON.stringify(json, null, 2));
    } catch (e) {
        console.log('Raw Data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(JSON.stringify({ query, variables: { handle: 'test' } }));
req.end();
