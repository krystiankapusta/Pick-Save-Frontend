import type { SignupFormInputs } from '../Models/User';
import { auth_api } from '../API/AxiosConfig';

export const signupAPI = async (signupFormInputs: SignupFormInputs) => {
    try {
        console.log('Sending data to API ', signupFormInputs);
        const response = await auth_api.post<SignupFormInputs>(
            `/auth/signup`,
            signupFormInputs
        );
        return response.data;
    } catch (error) {
        console.log('Signup error: ', error);
        throw error;
    }
};
