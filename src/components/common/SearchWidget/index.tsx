
import React, { useState } from 'react';
import { ArrowRight, Train } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StationInput from './StationInput';

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

  const handleSearch = () => {
    navigate('/book-train');
  };

  return (
    <Card glassEffect className="w-full max-w-4xl mx-auto">
      <Card.Content className="p-6">
        <h3 className="text-xl font-semibold text-irctc-dark-gray mb-6">Book Your Train Ticket</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          {/* From Station */}
          <div className="md:col-span-3">
            <StationInput
              label="From"
              value={fromStation}
              onChange={handleFromStationChange}
              onSelect={(station) => handleStationSelect('from', station)}
              stations={popularStations}
            />
          </div>
          
          {/* Swap Button */}
          <div className="flex items-center justify-center md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-irctc-light-gray rounded-full cursor-pointer hover:bg-irctc-light-blue/10 transition-colors"
              onClick={swapStations}
              aria-label="Swap stations"
            >
              <ArrowRight className="w-5 h-5 text-irctc-royal-blue rotate-90 md:rotate-0" aria-hidden="true" />
            </motion.div>
          </div>

          {/* To Station */}
          <div className="md:col-span-3">
            <StationInput
              label="To"
              value={toStation}
              onChange={handleToStationChange}
              onSelect={(station) => handleStationSelect('to', station)}
              stations={popularStations}
            />
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
