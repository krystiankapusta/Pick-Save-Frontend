import axios from 'axios';

export const product_api = axios.create({
    baseURL: '/aki',
    headers: {
        'Content-Type': 'application/json',
    },
});

product_api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Interceptors request token is: ', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

product_api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized – redirecting to login');
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default product_api;
