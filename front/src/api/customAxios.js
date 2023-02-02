import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');
    if (!accessToken || !refreshToken) {
        window.location.href = '/login';
    }
    // refreshToken 만료되기 전 accessToken을 발급 받으면, access만 남아 있을수도 있다.
    // accessToken은 만료되고 refreshToken만 남는 경우

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
            const refreshToken = localStorage.getItem('refreshToken');


            const { data } = await axios
                .post(
                    `${BASE_URL}refresh/token`,
                    {
                        refreshToken
                    }
                )
                .then(res => {
                    if (res.data === 'Refresh Succeed') {
                        const newAccessToken = res.headers.authorization;
                        const newRefreshToken = res.headers.Set-Cookie;

                        originalRequest.headers.authorization = newAccessToken;
                        originalRequest.headers.Set-Cookie = newRefreshToken;

                        localStorage.setItem('accessToken', newAccessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);

                        return axios(originalRequest);
                    }
                    return Promise.reject(error);
                })
                .catch(err => {
                    if (
                        err.response.data.error.code === 'REFRESH_TOKEN_EXPIRED'
                    ) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        // window.location.replace = '/login';
                    }
                });
        }
        return Promise.reject(error);
    },
);

export default api;