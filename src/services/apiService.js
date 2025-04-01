import axios from "axios";
import API from "../config/api.config";

export const apiClient = axios.create({
    baseURL: API.Base_URL,
    headers: {

        "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
    },
    withCredentials: true,
})


// Add an interceptor to handle session expiration


apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Clear user state in Redux
            // store.dispatch(clearUser());

            // Redirect to login page
            window.location.href = 'http://localhost:5173/login'; // Force page refresh
        }
        return Promise.reject(error);
    }
);



// sign-up flow
export const sentOtp = async (data) => {
    return apiClient.post('/user/setOtp', data)
}
export const verifyOneTimePassword = async (data) => {
    return apiClient.post('/user/verifyOtp', data)
}
export const submitAddress = async (data) => {
    console.log("data", data)
    return apiClient.post('/register', data)
}

// login flow


export const logInUser = async (data) => {
    return apiClient.post('/user/login', data)
}




export const logOutUser = async (id) => {
    return apiClient.post(`/user/logout${id}`)
}
export const notification = async () => { }
export const noticeBoard = async () => { }
export const findUpComingTrip = async () => { }





// get packages
export const getPackages = async (filters) => {

    const params = {
        sort: filters.sortMethod,
        location: filters.location !== "all" ? filters.location : undefined,
        priceRange: filters.priceRange !== "any" ? filters.priceRange : undefined,
        rating: filters.rating !== "all" ? filters.rating : undefined,
        category: filters.category !== "all" ? filters.category : undefined,
    };

    // Remove undefined values
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    return apiClient.get('/user/allPackages', { params })
}

// forgot password
export const resetPassword = async () => { }
