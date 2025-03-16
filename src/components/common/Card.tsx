
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  glassEffect?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  className, 
  glassEffect = false, 
  interactive = false, 
  children, 
  onClick 
}, ref) => {
  return (
    <div 
      className={cn(
        'rounded-xl overflow-hidden shadow',
        glassEffect ? 'glass-card' : 'bg-white',
        interactive && 'card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ 
  className, 
  children 
}, ref) => (
  <div 
    className={cn('p-5 border-b border-gray-100', className)}
    ref={ref}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ 
  className, 
  children 
}, ref) => (
  <div 
    className={cn('p-5', className)}
    ref={ref}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ 
  className, 
  children 
}, ref) => (
  <div 
    className={cn('p-5 border-t border-gray-100', className)}
    ref={ref}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
