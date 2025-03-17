
import React, { useState } from 'react';
import { Calendar, MapPin, Train, ArrowRight, CalendarDays } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

const SearchWidget = () => {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
    setShowFromSuggestions(true);
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
    setShowToSuggestions(true);
  };

  const handleStationSelect = (type: 'from' | 'to', station: Station) => {
    if (type === 'from') {
      setFromStation(`${station.name} (${station.code})`);
      setShowFromSuggestions(false);
    } else {
      setToStation(`${station.name} (${station.code})`);
      setShowToSuggestions(false);
    }
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = () => {
    navigate('/book-train');
  };

  return (
    <Card glassEffect className="w-full max-w-4xl mx-auto">
      <Card.Content className="p-6">
        <h3 className="text-xl font-semibold text-irctc-dark-gray mb-6">Book Your Train Ticket</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          {/* From Station */}
          <div className="relative md:col-span-3">
            <label className="block text-sm font-medium text-irctc-medium-gray mb-1.5">From</label>
            <div className="relative">
              <input
                type="text"
                value={fromStation}
                onChange={handleFromStationChange}
                onFocus={() => setShowFromSuggestions(true)}
                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                placeholder="Enter city or station"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
              
              <AnimatePresence>
                {showFromSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100"
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                      <div className="max-h-60 overflow-y-auto">
                        {popularStations.map((station) => (
                          <motion.div
                            key={station.code}
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            className="px-3 py-2 rounded-md cursor-pointer transition-colors"
                            onClick={() => handleStationSelect('from', station)}
                          >
                            <div className="font-medium">{station.name}</div>
                            <div className="text-xs text-irctc-medium-gray">{station.code}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="flex items-center justify-center md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-irctc-light-gray rounded-full cursor-pointer hover:bg-irctc-light-blue/10 transition-colors"
              onClick={swapStations}
            >
              <ArrowRight className="w-5 h-5 text-irctc-royal-blue rotate-90 md:rotate-0" />
            </motion.div>
          </div>

          {/* To Station */}
          <div className="relative md:col-span-3">
            <label className="block text-sm font-medium text-irctc-medium-gray mb-1.5">To</label>
            <div className="relative">
              <input
                type="text"
                value={toStation}
                onChange={handleToStationChange}
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                placeholder="Enter city or station"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
              
              <AnimatePresence>
                {showToSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100"
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                      <div className="max-h-60 overflow-y-auto">
                        {popularStations.map((station) => (
                          <motion.div
                            key={station.code}
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            className="px-3 py-2 rounded-md cursor-pointer transition-colors"
                            onClick={() => handleStationSelect('to', station)}
                          >
                            <div className="font-medium">{station.name}</div>
                            <div className="text-xs text-irctc-medium-gray">{station.code}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              variant="accent" 
              size="lg" 
              icon={<Train className="w-4 h-4" />}
              className="w-full sm:w-auto min-w-[150px] bg-orange-500 hover:bg-orange-600"
              onClick={handleSearch}
            >
              Book Ticket
            </Button>
          </motion.div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SearchWidget;
