import axios from 'axios';

const BASE_URL = 'https://i8b107.p.ssafy.io/api'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('userToken');
    if (!accessToken) {
        window.location.href = '/login';
        return
    }
    config.headers.authorization = `${accessToken}`;
    
    return config;
});


export default api
