
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const MainLayout = ({ children, hideFooter = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
