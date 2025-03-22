
import React, { useEffect, useState } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  imageSrc?: string;
  children?: React.ReactNode;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  className, 
  imageSrc = '/lovable-uploads/d69e29d2-3007-48e6-851c-ad9df37c83a4.png',
  children 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if viewing on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          // Apply different opacity and scaling based on device size
          opacity: 0.8,
          backgroundSize: isMobile ? '200% auto' : 'cover'
        }}
      />
      {children}
    </div>
  );
};

export default ParticleBackground;
