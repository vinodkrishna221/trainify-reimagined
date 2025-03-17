
import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { usePrefetch } from '@/App';

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean;
  children: React.ReactNode;
}

const PrefetchLink: React.FC<PrefetchLinkProps> = ({ 
  to, 
  prefetch = true, 
  children, 
  onMouseEnter,
  ...props 
}) => {
  const prefetchRoute = usePrefetch();
  
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefetch && typeof to === 'string') {
      prefetchRoute(to);
    }
    
    onMouseEnter?.(e);
  }, [prefetch, to, prefetchRoute, onMouseEnter]);
  
  return (
    <Link 
      to={to} 
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;
