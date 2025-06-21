export type SignupFormInputs = {
    username: string;
    email: string;
    password: string;
};

export type VerifyFormInputs = {
    email: string;
    verificationCode: string;
};

export type LoginFormInputs = {
    email: string;
    password: string;
};

export type UserProfile = {
    username: string;
};

export type UserProfileToken = {
    token: string;
    expiredIn: number;
};

export type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    loginUser: (loginFormInputs: LoginFormInputs) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
};
