import axios from 'axios';
import { toast } from 'react-toastify';

export const auth_api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

auth_api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const publicEndpoints = [
        '/auth/signup',
        '/auth/verify',
        '/auth/resend-verification',
        '/auth/login',
    ];
    if (
        token &&
        !publicEndpoints.some((endpoint) => config.url?.includes(endpoint))
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

auth_api.interceptors.response.use(
    (response) => {
        const newAuthHeader = response.headers['Authorization'];
        if (newAuthHeader && newAuthHeader.startsWith('Bearer ')) {
            const newToken = newAuthHeader.substring(7);
            localStorage.setItem('token', newToken);
        }
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const errorData = error.response?.data;
        const code = errorData?.code;
        const message = errorData?.message || 'Something went wrong';
        const url = error.config?.url || '';

        const isValidationError =
            status === 400 && !code && typeof errorData === 'object';
        if (isValidationError) {
            return Promise.reject({
                type: 'validation',
                fieldErrors: errorData, // dynamic: can contain multiple fields
            });
        }
        switch (code) {
            case 'EMAIL_ALREADY_REGISTERED':
            case 'USERNAME_ALREADY_REGISTERED':
            case 'INVALID_EMAIL_OR_PASSWORD':
            case 'EMAIL_NOT_VERIFIED':
            case 'VERIFICATION_CODE_EXPIRED':
            case 'INVALID_VERIFICATION_CODE':
            case 'ACCOUNT_ALREADY_VERIFIED':
            case 'USER_NOT_FOUND':
                return Promise.reject({ code, message });

            default:
                break;
        }
        console.log('Interceptor response error message -> ', message);

        const publicEndpoints = [
            '/auth/signup',
            '/auth/verify',
            '/auth/resend-verification',
        ];
        const isPublic = publicEndpoints.some((endpoint) =>
            url.includes(endpoint)
        );

        if (status === 401 && !isPublic) {
            if (message === 'Invalid username or password') {
                return Promise.reject({
                    message: 'Invalid username or password',
                }); // return error for form to display
            } else {
                // session expired or unauthenticated access
                toast.warning('Session expired. Please log in.', {
                    autoClose: 1150,
                });
                window.history.pushState(null, '', `/auth/login`);
                return Promise.reject({
                    message: 'Unauthorized. Please log in!',
                });
            }
        }
        if (status === 403 && !isPublic) {
            toast.warning('Access denied', { autoClose: 1150 });
            return Promise.reject({
                message: 'Access denied. You do not have permission!',
            });
        }
        return Promise.reject({ code: code || 'UNKNOWN_ERROR', message });
    }
);
