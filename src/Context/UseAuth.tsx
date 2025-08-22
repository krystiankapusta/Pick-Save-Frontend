import type {
    LoginFormInputs,
    UserContextType,
    UserProfile,
} from '../Models/User';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginAPI } from '../Services/AuthServices';
import Swal from 'sweetalert2';

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (user && token && tokenExpiry) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            const timeLeft = parseInt(tokenExpiry) - Date.now();
            if (timeLeft > 0) {
                setTimeout(() => {
                    logout();
                    alert('Session expired. You have been logged out.');
                }, timeLeft);
            } else {
                logout();
            }
        }
        setIsReady(true);
    }, []);

    const loginUser = async (loginFormInputs: LoginFormInputs) => {
        try {
            const response = await loginAPI(loginFormInputs);
            console.log('Login response -> ', response);
            if (!response) throw new Error('No response from server');

            const { expiredIn, token } = response;
            if (!token || !expiredIn)
                throw new Error('Token or expiration missing');

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const expiryTime = Date.now() + expiredIn;
            localStorage.setItem('tokenExpiry', expiryTime.toString());

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const username = decodedToken.sub;
            const role = decodedToken.role;
            const authorities = decodedToken.authorities;

            const userObject = { username, role, authorities };
            localStorage.setItem('user', JSON.stringify(userObject));
            console.log('Logged user details: ', userObject);

            setToken(token);
            setUser(userObject);
            setTimeout(() => {
                localStorage.removeItem('tokenExpiry');
                Swal.fire({
                    title: 'Session expired. You have been logged out.',
                    showClass: {
                        popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                        `,
                    },
                    hideClass: {
                        popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                        `,
                    },
                });
                logout();
            }, expiredIn);
            navigate(`/main`);
        } catch (error: any) {
            console.error('Login error at loginUser function: ', error.message);
            console.error('Login code at loginUser function: ', error.code);
            throw {
                message: error?.message || 'Login failed',
                code: error?.code || 'UNKNOWN_ERROR',
            };
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken('');
        navigate(`/auth/login`);
    };
    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const UseAuth = () => React.useContext(UserContext);
