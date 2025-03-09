const TOKEN_KEY = "jwt_token";
const EXPIRE_KEY = "jwt_expiry";
const EXPIRATION_DAYS = 7;

export const setToken = (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + EXPIRATION_DAYS);
    
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXPIRE_KEY, expiryDate.toISOString());
};

export const getToken = () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expiry = sessionStorage.getItem(EXPIRE_KEY);

    if (!token || !expiry) return null;

    if (new Date() > new Date(expiry)) {
        removeToken();
        return null;
    }

    return token;
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXPIRE_KEY);
};

export const isAuthenticated = () => !!getToken();
