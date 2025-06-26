import React, { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
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
    className = '',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className="dark:text-white" htmlFor={name}>
                {label}
                {required && <span className="text-red-500"> * </span>}
            </label>
            <div className="relative">
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
                    className={className}
                    {...rest}
                    {...register(name, registerOptions)}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-900"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? (
                            <Eye size={20} />
                        ) : (
                            <EyeOff size={20} />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <span role="alert" className="text-red-500 text-sm my-1">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormInput;
