import FormInput from '../../FormInput/FormInput';
import { useForm } from 'react-hook-form';
import type { LoginFormInputs } from '../../../Models/User';
import Button from '../../Button/Button';
import { UseAuth } from '../../../Context/UseAuth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import login from '../../../assets/login.svg';

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
        <section className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-800">
            <div className="flex items-center justify-center w-full max-w-6xl bg-gray-100 dark:bg-zinc-700 shadow-lg rounded-xl p-0 md:flex">
                <div className="w-full md:w-1/2 p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-gray-500 text-4xl dark:text-gray-100 font-bold -mt-4 mb-12">
                            Login
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-6 "
                    >
                        <FormInput
                            className="w-full text-left text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-2 my-1"
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
                            className="w-full text-left text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-2 my-1"
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
                        <div className="flex justify-center items-center">
                            <Button
                                type="submit"
                                variant="primary"
                                label="Log in"
                            />
                            {showVerifyButton && (
                                <Button
                                    onClick={handleNavigate}
                                    type="button"
                                    variant="warning"
                                    label="Verify account"
                                />
                            )}
                        </div>

                        {errors.root && (
                            <p className="text-sm text-red-500">
                                {errors.root?.message}
                            </p>
                        )}
                        <div className="flex flex-col md:flex-row items-center justify-center ">
                            <h3 className="dark:text-white mr-2">
                                Don't have an account?
                            </h3>
                            <Link
                                to="/auth/signup"
                                className="font-bold text-blue-500"
                            >
                                Register here
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block md:w-1/2 p-10">
                    <img alt="Welcome illustration" src={login} />
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
