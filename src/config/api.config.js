const API = {
    debugMode: import.meta.env.VITE_APP_DEBUG === "true",
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
    BaseURL: import.meta.env.VITE_APP_API_BASE_URL,
    logIn: "/login/",
    changePassword: "/change-password/",
    signUp: "/signUp/"
};

export default API;