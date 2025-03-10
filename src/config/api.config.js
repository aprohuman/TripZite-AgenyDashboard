const API = {
    debugMode: import.meta.env.VITE_APP_DEBUG === "true",
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
    Base_URL: import.meta.env.VITE_APP_API_BASE_URL,
    logIn: "logIn/",
    resetPassword: "resetPassword/",
    signUp: "signUp/"
}
export default API;