
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-irctc-royal-blue text-white hover:bg-irctc-royal-blue/90 focus:ring-irctc-royal-blue/30",
    secondary: "bg-irctc-light-blue text-white hover:bg-irctc-light-blue/90 focus:ring-irctc-light-blue/30",
    accent: "bg-irctc-orange text-white hover:bg-irctc-orange/90 focus:ring-irctc-orange/30",
    outline: "border border-irctc-royal-blue text-irctc-royal-blue bg-transparent hover:bg-irctc-royal-blue/5 focus:ring-irctc-royal-blue/30",
    ghost: "bg-transparent text-irctc-royal-blue hover:bg-irctc-royal-blue/5 focus:ring-irctc-royal-blue/30",
    link: "bg-transparent text-irctc-royal-blue underline-offset-4 hover:underline focus:ring-0 p-0",
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        widthClass,
        "btn-pulse",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </span>
    </button>
  );
};

export default Button;
