import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const navigate = useNavigate();
        if (error.response?.status === 401) {
            console.warn('Unauthorized – redirecting to login');
            localStorage.removeItem('token');
            navigate('/auth/login');
        }
        return Promise.reject(error);
    }
);

export default product_api;
