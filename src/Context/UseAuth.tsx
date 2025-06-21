import type {
    LoginFormInputs,
    UserContextType,
    UserProfile,
} from '../Models/User';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginAPI } from '../Services/AuthServices';

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

        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        setIsReady(true);
    }, []);

    const loginUser = async (loginFormInputs: LoginFormInputs) => {
        try {
            const response = await loginAPI(loginFormInputs);
            console.log('Login response -> ', response);
            if (!response) throw new Error('No response from server');

            const token = response?.token;
            if (!token) throw new Error('Token not found in response');

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const username = decodedToken.sub;

            const userObject = { username };
            localStorage.setItem('user', JSON.stringify(userObject));

            setToken(token);
            setUser(userObject);
            navigate(`/Pick-Save`);
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
