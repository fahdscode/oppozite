import { getAccessToken, logout } from "./auth";

const SHOP_ID = import.meta.env.SHOPIFY_SHOP_ID || '97366212901';

export async function fetchCustomerOrders() {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token found");
    }

    const query = `
    {
      customer {
        firstName
        lastName
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          nodes {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              nodes {
                title
                variant {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch(`https://shopify.com/${SHOP_ID}/account/customer/api/2025-01/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout(); // Token likely expired
            throw new Error("Unauthorized");
        }
        const text = await response.text();
        throw new Error(`Failed to fetch orders: ${text}`);
    }

    const { data, errors } = await response.json();
    if (errors) {
        throw new Error(errors[0].message);
    }

    return data.customer;
}
