import { toast } from "sonner";

// Shopify API Configuration
// Shopify API Configuration
const SHOPIFY_API_VERSION = import.meta.env.SHOPIFY_API_VERSION || import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-07';



const SHOPIFY_STORE_PERMANENT_DOMAIN = import.meta.env.SHOPIFY_STORE_DOMAIN || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'oppozite-wears.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

// Shopify Product Types
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          compareAtPrice: {
            amount: string;
            currencyCode: string;
          } | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          image: {
            url: string;
            altText: string | null;
          } | null;
          colorCode?: {
            value: string;
          } | null;
          quantityAvailable?: number;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// GraphQL Queries
const STOREFRONT_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                  image {
                  url
                  altText
                }
                colorCode: metafield(namespace: "custom", key: "color_code") {
                  value
                }
                quantityAvailable
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const STOREFRONT_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            url
            altText
            width
            height
          }
          products(first: 1) {
            edges {
              node {
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const STOREFRONT_COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      image {
        url
        altText
      }
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                    image {
                    url
                    altText
                  }
                  colorCode: metafield(namespace: "custom", key: "color_code") {
                    value
                  }
                  quantityAvailable
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

const STOREFRONT_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            colorCode: metafield(namespace: "custom", key: "color_code") {
              value
            }
            quantityAvailable
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export interface ShopifyCollection {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    image: {
      url: string;
      altText: string | null;
      width: number;
      height: number;
    } | null;
    products: {
      edges: Array<{
        node: {
          images: {
            edges: Array<{
              node: {
                url: string;
                altText: string | null;
                width?: number;
                height?: number;
              };
            }>;
          };
        };
      }>;
    };
  };
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront API helper function
export async function storefrontApiRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    throw new Error("Payment required");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch all products
export async function fetchShopifyProducts(first: number = 20, query?: string, after?: string): Promise<{ products: ShopifyProduct[], pageInfo: PageInfo }> {
  const data = await storefrontApiRequest<{
    data: {
      products: {
        edges: ShopifyProduct[];
        pageInfo: PageInfo;
      };
    };
  }>(STOREFRONT_PRODUCTS_QUERY, { first, query, after });

  return {
    products: data.data.products.edges,
    pageInfo: data.data.products.pageInfo,
  };
}

// Fetch single product by handle
export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  const data = await storefrontApiRequest<{
    data: {
      productByHandle: ShopifyProduct['node'] | null;
    };
  }>(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.data.productByHandle;
}

// Fetch all collections
export async function fetchShopifyCollections(first: number = 20): Promise<ShopifyCollection[]> {
  const data = await storefrontApiRequest<{
    data: {
      collections: {
        edges: ShopifyCollection[];
      };
    };
  }>(STOREFRONT_COLLECTIONS_QUERY, { first });

  return data.data.collections.edges;
}

// Fetch products by collection handle
export async function fetchShopifyCollectionProducts(handle: string, first: number = 20, after?: string): Promise<{ title: string; image: { url: string; altText: string | null } | null; products: ShopifyProduct[], pageInfo: PageInfo } | null> {
  const data = await storefrontApiRequest<{
    data: {
      collection: {
        title: string;
        image: {
          url: string;
          altText: string | null;
        } | null;
        products: {
          edges: ShopifyProduct[];
          pageInfo: PageInfo;
        };
      } | null;
    };
  }>(STOREFRONT_COLLECTION_PRODUCTS_QUERY, { handle, first, after });

  if (!data.data.collection) return null;

  return {
    title: data.data.collection.title,
    image: data.data.collection.image,
    products: data.data.collection.products.edges,
    pageInfo: data.data.collection.products.pageInfo,
  };
}

// Cart Item type for checkout
export interface ShopifyCartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  quantityAvailable?: number;
}

// Create checkout
export async function createStorefrontCheckout(items: ShopifyCartItem[]): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const cartData = await storefrontApiRequest<{
    data: {
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
        };
        userErrors: Array<{ field: string; message: string }>;
      };
    };
  }>(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map(e => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;

  if (!cart.checkoutUrl) {
    throw new Error('No checkout URL returned from Shopify');
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}

// Helper to format price
export function formatShopifyPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export interface ShopifyMenuItem {
  id: string;
  title: string;
  url: string;
  items: ShopifyMenuItem[];
}

export interface ShopifyMenu {
  handle: string;
  title: string;
  items: ShopifyMenuItem[];
}

const MENU_QUERY = `
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      handle
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
          items {
            id
            title
            url
            items {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

// Fetch menu by handle
export async function fetchShopifyMenu(handle: string): Promise<ShopifyMenu | null> {
  const data = await storefrontApiRequest<{
    data: {
      menu: {
        id: string;
        handle: string;
        title: string;
        items: Array<{
          id: string;
          title: string;
          url: string;
          items: Array<{
            id: string;
            title: string;
            url: string;
            items: Array<{
              id: string;
              title: string;
              url: string;
              items: Array<{
                id: string;
                title: string;
                url: string;
              }>;
            }>;
          }>;
        }>;
      } | null;
    };
  }>(MENU_QUERY, { handle });

  if (!data?.data?.menu) return null;

  const mapItem = (item: any): ShopifyMenuItem => ({
    id: item.id,
    title: item.title,
    url: item.url,
    items: item.items ? item.items.map(mapItem) : [],
  });

  return {
    handle: data.data.menu.handle,
    title: data.data.menu.title,
    items: data.data.menu.items.map(mapItem),
  };
}
