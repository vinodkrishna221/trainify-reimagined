
import React, { useState, memo, useEffect } from 'react';
import { Calendar, MapPin, Train, ArrowRight, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StationInput from './SearchWidget/StationInput';
import { usePrefetch } from '@/App';
import PrefetchLink from './PrefetchLink';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface Station {
  code: string;
  name: string;
}

const popularStations: Station[] = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'CSTM', name: 'Mumbai CST' },
  { code: 'HWH', name: 'Howrah Jn' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'SBC', name: 'Bengaluru' },
  { code: 'PNBE', name: 'Patna Jn' },
  { code: 'LKO', name: 'Lucknow' },
];

// Memoize the component for better performance
const SearchWidget = memo(() => {
  const navigate = useNavigate();
  const prefetchRoute = usePrefetch();
  const isMobile = useIsMobile();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to trigger the entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
  };

  const handleStationSelect = (type: 'from' | 'to', station: Station) => {
    if (type === 'from') {
      setFromStation(`${station.name} (${station.code})`);
    } else {
      setToStation(`${station.name} (${station.code})`);
    }
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default button behavior
    navigate('/train-list'); // Navigate to train-list instead of book-train
  };

  const handleMouseEnterSearch = () => {
    // Prefetch both possible routes the user might navigate to
    prefetchRoute('/train-list');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100",
        "backdrop-blur-sm"
      )}
    >
      <div className="p-5 md:p-8">
        <h3 className="text-xl font-semibold text-irctc-dark-gray mb-6">Book Your Train Ticket</h3>
        
        <div className={cn(
          "grid gap-6 mb-8",
          isMobile ? "grid-cols-1" : "grid-cols-7"
        )}>
          {/* From Station */}
          <div className={isMobile ? "col-span-1" : "col-span-3"}>
            <StationInput
              label="From"
              value={fromStation}
              onChange={handleFromStationChange}
              onSelect={(station) => handleStationSelect('from', station)}
              stations={popularStations}
            />
          </div>
          
          {/* Swap Button */}
          <div className="flex items-center justify-center col-span-1">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-irctc-light-gray rounded-full cursor-pointer hover:bg-irctc-light-blue/10 transition-colors"
              onClick={swapStations}
            >
              <ArrowRight className={cn(
                "w-5 h-5 text-irctc-royal-blue",
                isMobile ? "rotate-90" : ""
              )} />
            </motion.div>
          </div>

          {/* To Station */}
          <div className={isMobile ? "col-span-1" : "col-span-3"}>
            <StationInput
              label="To"
              value={toStation}
              onChange={handleToStationChange}
              onSelect={(station) => handleStationSelect('to', station)}
              stations={popularStations}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <PrefetchLink to="/train-list">
              <Button 
                variant="accent" 
                size="lg" 
                className="w-full sm:w-auto min-w-[150px] bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                onClick={handleSearch}
                onMouseEnter={handleMouseEnterSearch}
              >
                <Train className="w-4 h-4" />
                Book Ticket
              </Button>
            </PrefetchLink>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default SearchWidget;
