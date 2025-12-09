import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    to?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    fullWidth = false,
    isLoading = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gold text-navy hover:bg-gold-hover hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:ring-gold',
        secondary: 'bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white focus:ring-navy',
        outline: 'bg-transparent text-gold border-2 border-gold hover:bg-gold hover:text-navy focus:ring-gold',
        ghost: 'bg-transparent text-navy hover:bg-navy/10 focus:ring-navy',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {isLoading ? 'Loading...' : children}
            </Link>
        );
    }

    return (
        <button className={classes} disabled={isLoading || props.disabled} {...props}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
