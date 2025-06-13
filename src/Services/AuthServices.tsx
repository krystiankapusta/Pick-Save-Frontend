import type { SignupFormInputs, VerifyFormInputs } from '../Models/User';
import { auth_api } from '../API/AxiosConfig';

export const signupAPI = async (signupFormInputs: SignupFormInputs) => {
    try {
        console.log('Sending data to API ', signupFormInputs);
        const response = await auth_api.post<SignupFormInputs>(
            `/auth/signup`,
            signupFormInputs
        );
        return response.data;
    } catch (error: any) {
        console.error('Signup error: ', error);
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
        console.error('Verify error ', error);
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
