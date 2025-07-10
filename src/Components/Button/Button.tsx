import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'tertiary'
        | 'logout'
        | 'disabled';
}

const variantClasses: Record<ButtonProps['variant'], string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
    tertiary:
        'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50',
    logout: 'text-red-400',
    disabled: 'bg-gray-300 text-gray-600 cursor-not-allowed',
};

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    disabled,
    className = '',
    ...rest
}) => {
    return (
        <button
            className={clsx(
                'px-4 py-2 rounded-md transition duration-150 ease-in-out',
                variantClasses[variant],
                className
            )}
            disabled={disabled || variant === 'disabled'}
            {...rest}
        >
            {label}
        </button>
    );
};

export default Button;
