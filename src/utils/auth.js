const TOKEN_KEY = "jwt_token";
const EXPIRE_KEY = "jwt_expiry";

export const setToken = (token, keepMeLoggedIn) => {
    const expiryDate = new Date();
    keepMeLoggedIn
        ? expiryDate.setDate(expiryDate.getDate() + 365)
        : expiryDate.setDate(expiryDate.getDate() + 1);
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
