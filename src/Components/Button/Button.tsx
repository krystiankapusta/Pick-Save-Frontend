import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: React.ReactNode; // SVG or icon component
    iconPosition?: 'left' | 'right';
    variant:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'tertiary'
        | 'logout'
        | 'disabled'
        | 'transparent';
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
    transparent: 'bg-transparent',
};

const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    iconPosition = 'left',
    variant,
    disabled,
    className = '',
    ...rest
}) => {
    const isIconOnly = icon && !label;

    return (
        <button
            className={clsx(
                'flex items-center justify-center rounded-md transition duration-150 ease-in-out',
                isIconOnly ? 'p-1' : 'px-4 py-2 gap-2',
                variantClasses[variant],
                className
            )}
            disabled={disabled || variant === 'disabled'}
            aria-label={
                isIconOnly
                    ? (rest['aria-label'] as string) || 'Button'
                    : undefined
            }
            {...rest}
        >
            {icon && iconPosition === 'left' && icon}
            {label && <span>{label}</span>}
            {icon && iconPosition === 'right' && icon}
        </button>
    );
};

export default Button;
