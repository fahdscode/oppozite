const SHOP_ID = import.meta.env.SHOPIFY_SHOP_ID || '97366212901';
const CLIENT_ID = import.meta.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '8ef5e229-9f7c-4cfc-8c1c-a2b1c6eec67a';

// PKCE Helpers
async function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
}

async function generateCodeChallenge(verifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    return base64Digest;
}

export const login = async () => {
    let redirectUri = import.meta.env.VITE_SHOPIFY_REDIRECT_URI || window.location.origin + '/account/orders';

    // Force localhost usage if running locally, ignoring potentially stale env vars
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        redirectUri = window.location.origin + '/account/orders';
    }

    console.log('[Auth] Initiating login with redirect_uri:', redirectUri);
    const scope = 'openid email customer-account-api:full';
    const state = Math.random().toString(36).substring(7);

    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    // Store verifier for callback
    sessionStorage.setItem('shopify_auth_verifier', verifier);
    sessionStorage.setItem('shopify_auth_state', state);

    // Construct the authorization URL
    const authUrl = new URL(`https://shopify.com/authentication/${SHOP_ID}/oauth/authorize`);
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('code_challenge', challenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');

    window.location.href = authUrl.toString();
};

export const logout = () => {
    const redirectUri = import.meta.env.VITE_SHOPIFY_REDIRECT_URI || window.location.origin;
    const logoutUrl = new URL(`https://shopify.com/authentication/${SHOP_ID}/logout`);
    logoutUrl.searchParams.append('client_id', CLIENT_ID);
    logoutUrl.searchParams.append('post_logout_redirect_uri', redirectUri);

    // Clear local session
    localStorage.removeItem('shopify_access_token');
    localStorage.removeItem('shopify_refresh_token');
    sessionStorage.removeItem('shopify_auth_verifier');

    window.location.href = logoutUrl.toString();
};

export const exchangeToken = async (code: string) => {
    const verifier = sessionStorage.getItem('shopify_auth_verifier');
    if (!verifier) throw new Error('No code verifier found');

    let redirectUri = import.meta.env.VITE_SHOPIFY_REDIRECT_URI || window.location.origin + '/account/orders';

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        redirectUri = window.location.origin + '/account/orders';
    }

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        code,
        code_verifier: verifier,
    });

    const response = await fetch(`https://shopify.com/authentication/${SHOP_ID}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token exchange failed: ${errorText}`);
    }

    const data = await response.json();
    localStorage.setItem('shopify_access_token', data.access_token);
    localStorage.setItem('shopify_refresh_token', data.refresh_token);

    return data;
};

export const getAccessToken = () => {
    return localStorage.getItem('shopify_access_token');
};

export const openAccount = () => {
    // Redirect to internal orders page which handles auth check
    window.location.href = '/account/orders';
};
