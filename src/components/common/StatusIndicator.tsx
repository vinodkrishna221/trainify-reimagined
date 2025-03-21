
import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'default';
type StatusSize = 'sm' | 'md' | 'lg';

interface StatusIndicatorProps {
  type: StatusType;
  size?: StatusSize;
  showDot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const StatusIndicator = ({
  type,
  size = 'md',
  showDot = true,
  className,
  children,
}: StatusIndicatorProps) => {
  const typeStyles = {
    success: 'bg-irctc-success/10 text-irctc-success border-irctc-success/20',
    warning: 'bg-irctc-warning/10 text-irctc-warning border-irctc-warning/20',
    error: 'bg-irctc-error/10 text-irctc-error border-irctc-error/20',
    info: 'bg-irctc-light-blue/10 text-irctc-light-blue border-irctc-light-blue/20',
    neutral: 'bg-irctc-medium-gray/10 text-irctc-medium-gray border-irctc-medium-gray/20',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const dotColors = {
    success: 'bg-irctc-success',
    warning: 'bg-irctc-warning',
    error: 'bg-irctc-error',
    info: 'bg-irctc-light-blue',
    neutral: 'bg-irctc-medium-gray',
    default: 'bg-gray-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        typeStyles[type],
        sizeStyles[size],
        className
      )}
    >
      {showDot && (
        <span 
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            dotColors[type]
          )}
        />
      )}
      {children}
    </span>
  );
};

export default StatusIndicator;
