
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-irctc-royal-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-bold text-xl mb-4">IRCTC Express</h3>
            <p className="text-white/80 mb-4">
              Indian Railway Catering and Tourism Corporation - Your one-stop destination for train bookings, 
              travel packages, and hospitality services across India.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/book-train" className="text-white/80 hover:text-white transition-colors">Book Train Ticket</Link>
              </li>
              <li>
                <Link to="/pnr-status" className="text-white/80 hover:text-white transition-colors">PNR Status</Link>
              </li>
              <li>
                <Link to="/track-train" className="text-white/80 hover:text-white transition-colors">Track Your Train</Link>
              </li>
              <li>
                <Link to="/cancel-ticket" className="text-white/80 hover:text-white transition-colors">Cancel Ticket</Link>
              </li>
              <li>
                <Link to="/refund" className="text-white/80 hover:text-white transition-colors">Refund Status</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Travel Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/packages" className="text-white/80 hover:text-white transition-colors">Holiday Packages</Link>
              </li>
              <li>
                <Link to="/flights" className="text-white/80 hover:text-white transition-colors">Flight Bookings</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-white/80 hover:text-white transition-colors">Hotel Bookings</Link>
              </li>
              <li>
                <Link to="/tours" className="text-white/80 hover:text-white transition-colors">Tourist Trains</Link>
              </li>
              <li>
                <Link to="/bus" className="text-white/80 hover:text-white transition-colors">Bus Bookings</Link>
              </li>
              <li>
                <Link to="/loyalty" className="text-white/80 hover:text-white transition-colors">Loyalty Programs</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-irctc-light-blue shrink-0 mt-0.5" />
                <span className="text-white/80">IRCTC Corporate Office, New Delhi, India - 110001</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-irctc-light-blue" />
                <span className="text-white/80">+91 1800-110-139</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-irctc-light-blue" />
                <span className="text-white/80">care@irctc.co.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} IRCTC Express. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-white/70 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-sm text-white/70 hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
