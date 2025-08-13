import type {
    LoginFormInputs,
    SignupFormInputs,
    VerifyFormInputs,
} from '../Models/User';
import { auth_api } from '../API/AuthAxiosConfig';

export const signupAPI = async (signupFormInputs: SignupFormInputs) => {
    try {
        console.log('Sending data to API ', signupFormInputs);
        const response = await auth_api.post<SignupFormInputs>(
            `/auth/signup`,
            signupFormInputs
        );
        return response.data;
    } catch (error: any) {
        console.error('SignupAPI error: ', error);
        throw error;
    }
};

export const verify = async (verifyFormInputs: VerifyFormInputs) => {
    try {
        const response = await auth_api.post<VerifyFormInputs>(
            `/auth/verify`,
            verifyFormInputs
        );
        return response.data;
    } catch (error: any) {
        console.error('VerifyAPI error ', error);
        throw error;
    }
};

export const resendVerificationCode = async (email: string) => {
    try {
        const response = await auth_api.post(`/auth/resend-verification`, {
            email,
        });
        return response.data;
    } catch (error: any) {
        console.error('Resend code error: ', error);
        throw error;
    }
};

export const loginAPI = async (loginFormInputs: LoginFormInputs) => {
    try {
        console.log('Send login data -> ', loginFormInputs);
        const response = await auth_api.post(`/auth/login`, loginFormInputs);

        console.log('Full loginApi response-> ', response);
        console.log('loginApi response-> ', response.data);
        return response.data;
    } catch (error: any) {
        console.error('LoginAPI error: ', error);
        throw error;
    }
};
