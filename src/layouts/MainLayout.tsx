
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  className?: string;
}

const MainLayout = ({ 
  children, 
  hideFooter = false,
  className = "pt-16"
}: MainLayoutProps) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${className}`}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
