import FormInput from '../../FormInput/FormInput';
import { useForm } from 'react-hook-form';
import type { LoginFormInputs } from '../../../Models/User';
import Button from '../../Button/Button';
import { UseAuth } from '../../../Context/UseAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const { loginUser } = UseAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const [showVerifyButton, setShowVerifyButton] = useState(false);

    const handleLogin = async (loginFormInputs: LoginFormInputs) => {
        try {
            await loginUser(loginFormInputs);
            setShowVerifyButton(false);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Handle login error: ', errorMessage);
            console.log('Testing code type', typeof 'Hello');
            console.log('Testing code type 2', typeof errorMessage);
            console.error('Error code', errorCode);
            if (errorCode === 'INVALID_EMAIL_OR_PASSWORD') {
                setError('root', {
                    type: 'server',
                    message: errorMessage,
                });
            } else if (errorCode === 'EMAIL_NOT_VERIFIED') {
                setError('root', {
                    type: 'server',
                    message: errorMessage,
                });
                localStorage.setItem(
                    'manuallyVerifyEmail',
                    loginFormInputs.email
                );
                setShowVerifyButton(true);
            } else if (errorCode === 'USER_NOT_FOUND') {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login failed. Please register your account first!',
                    showClass: {
                        popup: 'animate__animated animate__shakeX animate__faster',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster',
                    },
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                navigate(`/auth/signup`);
            } else {
                setError('root', {
                    type: 'server',
                    message: 'Login failed. Please try again.',
                });
            }
        }
    };

    const handleNavigate = (): void => {
        navigate(`/auth/verify`);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    register={register}
                    registerOptions={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    error={errors.email?.message}
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    register={register}
                    registerOptions={{
                        required: 'Password is required',
                    }}
                    error={errors.password?.message}
                    required
                />
                <Button type="submit" variant="primary" label="Login" />
                {showVerifyButton && (
                    <Button
                        onClick={handleNavigate}
                        type="button"
                        variant="warning"
                        label="Verify account"
                    />
                )}
                {errors.root && (
                    <p className="form-error">{errors.root?.message}</p>
                )}
            </form>
        </div>
    );
};

export default LoginForm;
