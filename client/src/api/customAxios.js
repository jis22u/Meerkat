import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'api/auth'

const BASE_URL = process.env.REACT_APP_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use(function (config) {
    const { isLogin } = useSelector((state) => state.auth)
    if (!isLogin) {
        window.location.href = '/login';
    }

    const accessToken = localStorage.getItem('access-token');
    config.headers.authorization = `${accessToken}`;
    
    return config;
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.data.error.code === 'ACCESS_TOKEN_EXPIRED') {
            await axios
                .post(
                    `${BASE_URL}/refresh`,
                )
                .then(res => {
                    if (res.data === 'REFRESH_SUCCEED') {
                        const newAccessToken = res.headers.authorization;

                        originalRequest.headers.authorization = newAccessToken;
                        localStorage.setItem('accessToken', newAccessToken);

                        return axios(originalRequest);
                    }
                })
                .catch(err => {
                    if ( err.response.data.error.code === 'REFRESH_TOKEN_EXPIRED' ) {
                        localStorage.removeItem('accessToken');
                        useDispatch(logout)
                        window.location.replace = '/login';
                    }
                });
        }
        return Promise.reject(error);
    },
);

export default api;