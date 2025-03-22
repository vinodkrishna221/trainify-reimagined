
import React, { useEffect, useState } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  imageSrc?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  className, 
  imageSrc,
  children,
  overlay = true,
  overlayColor = 'bg-gradient-to-r from-blue-600/90 to-purple-600/90',
  overlayOpacity = 0.8
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
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center -z-5 w-full h-full"
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: isMobile ? '250% auto' : 'cover',
          backgroundPosition: isMobile ? 'center center' : 'center'
        }}
      />
      
      {/* Optional overlay */}
      {overlay && (
        <div 
          className={`absolute inset-0 ${overlayColor} -z-5`}
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {children}
    </div>
  );
};

export default ParticleBackground;
