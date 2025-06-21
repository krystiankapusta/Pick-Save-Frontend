import FormInput from '../../FormInput/FormInput';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { signupAPI } from '../../../Services/AuthServices';
import type { SignupFormInputs } from '../../../Models/User';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Signup form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    register={register}
                    registerOptions={{
                        required: 'Username is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_]{3,30}$/,
                            message: 'Username must be 3-30 characters long',
                        },
                    }}
                    error={errors.username?.message}
                    required
                />

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
                <Button type="submit" variant="primary" label="Sign Up" />
                {errors.root && <p>{errors.root?.message}</p>}
            </form>
        </div>
    );
};

export default SignupForm;
