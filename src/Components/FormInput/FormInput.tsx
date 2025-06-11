import React, { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import './FormInput.css';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: 'text' | 'email' | 'password';
    name: string;
    error?: string;
    register: UseFormRegister<any>;
    registerOptions?: Object;
}

export const FormInput: React.FC<InputProps> = ({
    label,
    type,
    name,
    error,
    register,
    registerOptions,
    required,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label htmlFor={name}>
                {label}
                {required && <span> * </span>}
            </label>
            <div>
                <input
                    id={name}
                    type={
                        type === 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : type
                    }
                    {...register(name, registerOptions)}
                    aria-invalid={error ? 'true' : 'false'}
                    {...rest}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
            {error && (
                <span role="alert" className="form-error">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormInput;
