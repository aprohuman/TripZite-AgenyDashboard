import axios from "axios";
import API from "../config/api.config";


const {BaseURL, logIn, changePassword} = API;

export const apiClient = axios.create({
    baseURL: BaseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});


apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error(error.response);
            window.location.href = 'http://localhost:5173/login';
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
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value)
    }
    return apiClient.post('/register', data)
}

// login flow
export const logInAPI = async (data) => {
    return apiClient.post(logIn, data);
}

export const changePasswordAPI = async (data) => {
    console.log('hit in call')
    return apiClient.post(changePassword, data);
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
