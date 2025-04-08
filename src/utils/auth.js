const ACCESS_TOKEN_KEY = "access_token";
const ACCESS_TOKEN_EXPIRE_KEY = "access_token_expiry";
const REFRESH_TOKEN_KEY = "refresh_token";
const REFRESH_TOKEN_EXPIRE_KEY = "refresh_token_expiry";

export const setToken = (token, keepMeLoggedIn, tokenType) => {
    const expiryDate = new Date();
    keepMeLoggedIn
        ? expiryDate.setDate(expiryDate.getDate() + 365)
        : expiryDate.setDate(expiryDate.getDate() + 1);
    if(tokenType === 'access-token'){
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
        sessionStorage.setItem(ACCESS_TOKEN_EXPIRE_KEY, expiryDate.toISOString());
    }
    if(tokenType === 'refresh-token'){
        sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
        sessionStorage.setItem(REFRESH_TOKEN_EXPIRE_KEY, expiryDate.toISOString());
    }

};

export const getToken = (tokenType) => {
    let token, expiry;
    if(tokenType === 'access-token'){
         token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
         expiry = sessionStorage.getItem(ACCESS_TOKEN_EXPIRE_KEY);
    }

    if(tokenType === 'refresh-token'){
         token = sessionStorage.getItem(REFRESH_TOKEN_KEY);
         expiry = sessionStorage.getItem(REFRESH_TOKEN_EXPIRE_KEY);
    }

    if (!token || !expiry) return null;
    if (new Date() > new Date(expiry)) {
        removeToken();
        return null;
    }
    return token;
};

export const removeToken = (tokenType) => {
    if(tokenType === 'access-token'){
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(ACCESS_TOKEN_EXPIRE_KEY);
    }

    if(tokenType === 'refresh-token'){
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_EXPIRE_KEY);
    }
};

export const isAuthenticated = (tokenType) => !!getToken(tokenType);
