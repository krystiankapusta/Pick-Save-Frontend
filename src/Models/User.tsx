export type SignupFormInputs = {
    username: string;
    email: string;
    password: string;
};

export type VerifyFormInputs = {
    email: string;
    verificationCode: string;
};
