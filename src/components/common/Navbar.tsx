
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Train, Package, Plane, Hotel, CreditCard, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Trains',
    href: '/book-train',
    icon: <Train className="w-4 h-4" />,
    children: [
      { label: 'Book Ticket', href: '/book-train' },
      { label: 'PNR Status', href: '/pnr-status' },
      { label: 'Train Schedule', href: '/train-schedule' },
      { label: 'Cancel Ticket', href: '/cancel-ticket' },
    ]
  },
  {
    label: 'Holiday Packages',
    href: '/packages',
    icon: <Package className="w-4 h-4" />,
  },
  {
    label: 'Flights',
    href: '/flights',
    icon: <Plane className="w-4 h-4" />,
  },
  {
    label: 'Hotels',
    href: '/hotels',
    icon: <Hotel className="w-4 h-4" />,
  },
  {
    label: 'Loyalty Program',
    href: '/loyalty',
    icon: <CreditCard className="w-4 h-4" />,
    highlight: true
  },
  {
    label: 'Help',
    href: '/help',
    icon: <HelpCircle className="w-4 h-4" />,
  }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300',
        scrolled ? 'bg-white/95 shadow-sm py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-irctc-royal-blue font-poppins font-bold text-xl md:text-2xl">IRCTC</span>
          <span className="text-irctc-orange ml-1 text-sm md:text-base">Express</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <div 
                className={cn(
                  "px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer transition-colors",
                  location.pathname === item.href ? "text-irctc-royal-blue font-medium" : "text-irctc-dark-gray hover:text-irctc-royal-blue hover:bg-irctc-royal-blue/5",
                  item.highlight && "text-irctc-orange font-medium"
                )}
                onClick={() => item.children && toggleDropdown(item.label)}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
                {item.children && (
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform", 
                      openDropdown === item.label ? "rotate-180" : ""
                    )} 
                  />
                )}
              </div>

              {/* Dropdown Menu */}
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-100 z-20 animate-fade-in">
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-irctc-dark-gray hover:bg-irctc-light-gray"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<User className="w-4 h-4" />}
            onClick={() => window.location.href = '/login'}
          >
            Login
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => window.location.href = '/login?signup=true'}
          >
            Register
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-irctc-royal-blue/30"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className="w-6 h-6 text-irctc-dark-gray" /> : 
            <Menu className="w-6 h-6 text-irctc-dark-gray" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white animate-fade-in" style={{ top: '64px', height: 'calc(100% - 64px)' }}>
          <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
            {/* Logo in mobile menu */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-irctc-royal-blue font-poppins font-bold text-xl">IRCTC</span>
                <span className="text-irctc-orange ml-1 text-sm">Express</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 py-2.5">
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    item.highlight && "text-irctc-orange font-medium"
                  )}
                  onClick={() => item.children && toggleDropdown(item.label)}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="text-irctc-medium-gray">{item.icon}</span>}
                    <span className="font-medium text-irctc-dark-gray">{item.label}</span>
                  </div>
                  {item.children && (
                    <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", openDropdown === item.label ? "rotate-180" : "")} />
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="mt-1.5 ml-7 space-y-1.5 animate-slide-down bg-gray-50 rounded-md p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block py-1.5 px-3 text-irctc-medium-gray hover:bg-gray-100 rounded-md"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Authentication Buttons */}
            <div className="pt-4 flex flex-col gap-3 fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
              <Button 
                variant="outline" 
                fullWidth 
                size="sm"
                icon={<User className="w-4 h-4" />}
                onClick={() => window.location.href = '/login'}
                className="h-10"
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                fullWidth
                size="sm"
                onClick={() => window.location.href = '/login?signup=true'}
                className="h-10"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
