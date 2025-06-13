import React, { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import './FormInput.css';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: 'text' | 'email' | 'password' | 'code';
    name: string;
    error?: string;
    register: UseFormRegister<any>;
    registerOptions?: Object;
    required?: boolean;
}

export const FormInput: React.FC<InputProps> = ({
    label,
    type,
    name,
    error,
    register,
    registerOptions,
    required = false,
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
                    aria-invalid={error ? 'true' : 'false'}
                    {...rest}
                    {...register(name, registerOptions)}
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
