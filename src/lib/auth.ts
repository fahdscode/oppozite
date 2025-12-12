const SHOP_ID = import.meta.env.SHOPIFY_SHOP_ID || '97366212901';
const CLIENT_ID = import.meta.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '8ef5e229-9f7c-4cfc-8c1c-a2b1c6eec67a';

export const login = () => {
    const redirectUri = import.meta.env.VITE_SHOPIFY_REDIRECT_URI || window.location.origin; // Ensure this is whitelisted in Shopify Admin
    const scope = 'openid email';
    const state = Math.random().toString(36).substring(7); // Simple state for now

    // Construct the authorization URL
    const authUrl = new URL(`https://shopify.com/authentication/${SHOP_ID}/oauth/authorize`);
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', state);

    window.location.href = authUrl.toString();
};

export const logout = () => {
    const logoutUrl = `https://shopify.com/authentication/${SHOP_ID}/logout`;
    window.location.href = logoutUrl;
};

export const getCustomer = () => {
    // Function to handle token exchange if we were processing the callback
    return null;
};
