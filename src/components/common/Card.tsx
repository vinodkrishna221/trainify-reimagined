
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  glassEffect?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card = ({ 
  className, 
  glassEffect = false, 
  interactive = false, 
  children, 
  onClick 
}: CardProps) => {
  return (
    <div 
      className={cn(
        'rounded-xl overflow-hidden shadow',
        glassEffect ? 'glass-card' : 'bg-white',
        interactive && 'card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader = ({ className, children }: CardHeaderProps) => (
  <div className={cn('p-5 border-b border-gray-100', className)}>
    {children}
  </div>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent = ({ className, children }: CardContentProps) => (
  <div className={cn('p-5', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={cn('p-5 border-t border-gray-100', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
