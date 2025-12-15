const SHOP_ID = import.meta.env.SHOPIFY_SHOP_ID || '97366212901';

export const login = () => {
    // Redirect directly to the Shopify Customer Account page
    // For new customer accounts, this is the standard URL pattern
    window.location.href = `https://shopify.com/${SHOP_ID}/account`;
};

export const logout = () => {
    // Redirect to Shopify logout
    window.location.href = `https://shopify.com/authentication/${SHOP_ID}/logout`;
};

export const openAccount = () => {
    // Redirect to the Shopify Customer Account page
    window.location.href = `https://shopify.com/${SHOP_ID}/account`;
};

// Deprecated/Unused functions can be removed or kept as stubs if needed for other components temporarly,
// but based on the plan, we are removing local order handling.
export const getAccessToken = () => {
    return null;
};

