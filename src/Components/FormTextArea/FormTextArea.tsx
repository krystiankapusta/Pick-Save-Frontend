import type { UseFormRegister } from 'react-hook-form';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: string;
    register: UseFormRegister<any>;
    registerOptions?: Object;
    required?: boolean;
}

export const FormTextarea: React.FC<TextareaProps> = ({
    label,
    name,
    error,
    register,
    registerOptions,
    required = false,
    className = '',
    ...rest
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-bold dark:text-white" htmlFor={name}>
                {label}
                {required && <span className="text-red-500"> * </span>}
            </label>
            <textarea
                id={name}
                className={className}
                aria-invalid={error ? 'true' : 'false'}
                {...rest}
                {...register(name, registerOptions)}
            />
            {error && (
                <span role="alert" className="text-red-500 text-sm my-1">
                    {error}
                </span>
            )}
        </div>
    );
};
