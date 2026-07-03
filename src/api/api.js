import axios from "axios";

export const ACCESS_TOKEN = "access";
const isDevelopment = import.meta.env.MODE === 'development'
const base_url = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const api = axios.create({
    baseURL: base_url
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.like = (url, config={}) => {
    return api.request({
        ...config,
        method:'LIKE',
        url: url
    })
}

api.dislike = (url, config={}) => {
    return api.request({
        ...config,
        method:'DISLIKE',
        url: url
    })
}


export default api;