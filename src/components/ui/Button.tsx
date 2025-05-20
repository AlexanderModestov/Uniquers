import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withGlow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  withGlow = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50';
  
  const variantStyles = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white border border-primary-500 focus:ring-primary-500',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white border border-secondary-500 focus:ring-secondary-500',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white border border-accent-500 focus:ring-accent-500',
    outline: 'bg-transparent hover:bg-primary-500/10 text-primary-500 border border-primary-500 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-primary-500/10 text-primary-500 border-0 focus:ring-primary-500',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const glowStyles = withGlow ? {
    primary: 'shadow-neon',
    secondary: 'shadow-neon-secondary',
    accent: 'shadow-neon-accent',
    outline: '',
    ghost: '',
  }[variant] : '';

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};