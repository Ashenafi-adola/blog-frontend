import axios from "axios";

export const ACCESS_TOKEN = "access";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
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