import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'tertiary'
        | 'disabled';
}
const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    disabled,
    className = '',
    ...rest
}) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            disabled={disabled || variant === 'disabled'}
            {...rest}
        >
            {label}
        </button>
    );
};

export default Button;
