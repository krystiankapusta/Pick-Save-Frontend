import FormInput from '../../FormInput/FormInput';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { signupAPI } from '../../../Services/AuthServices';
import type { SignupFormInputs } from '../../../Models/User';
import { useNavigate } from 'react-router-dom';
import welcomeIllustration from '../../../assets/welcome.svg';

const SignupForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignupFormInputs>();

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            console.log('On submit before send request');
            const response = await signupAPI(data);
            console.log('On submit response: ', response);
            if (response && response.username && response.email) {
                console.log('Registration successful!');
                localStorage.setItem('email', response.email);
                navigate(`/auth/verify`);
            }
        } catch (error: any) {
            console.log('Signup error caught: ', error);
            const errorMessage = error.message || 'Something went wrong';
            if (errorMessage === 'Username is already registered') {
                setError('username', {
                    type: 'server',
                    message: errorMessage,
                });
            } else if (errorMessage === 'Email is already registered') {
                setError('email', {
                    type: 'server',
                    message: errorMessage,
                });
            } else {
                setError('root', {
                    type: 'server',
                    message:
                        errorMessage ||
                        'Registration failed. Please try again.',
                });
            }
            console.error('Signup Error:', errorMessage);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-800">
            <div className="flex items-center justify-center w-full max-w-6xl bg-gray-100 dark:bg-zinc-700 shadow-lg rounded-xl p-0 md:flex">
                <div className="w-full md:w-1/2 p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-gray-500 dark:text-gray-100 text-4xl font-bold -mt-4 mb-12">
                            Signup
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 "
                    >
                        <div>
                            <FormInput
                                className="w-full text-left text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-2 my-1"
                                label="Username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                register={register}
                                registerOptions={{
                                    required: 'Username is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]{3,30}$/,
                                        message:
                                            'Username must be 3-30 characters long',
                                    },
                                }}
                                error={errors.username?.message}
                                required
                            />

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
                                placeholder={'Enter your password'}
                                register={register}
                                registerOptions={{
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,
                                        message:
                                            'Password must be at least 8 characters long, include one uppercase letter, one digit, and one special character',
                                    },
                                }}
                                error={errors.password?.message}
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <Button
                                type="submit"
                                variant="primary"
                                label="Sign Up"
                            />
                        </div>

                        {errors.root && (
                            <p className="text-sm text-red-500">
                                {errors.root?.message}
                            </p>
                        )}
                    </form>
                </div>
                <div className="hidden md:block md:w-1/2 p-10">
                    <img alt="Welcome illustration" src={welcomeIllustration} />
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
