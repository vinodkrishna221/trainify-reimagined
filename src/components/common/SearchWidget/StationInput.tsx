
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Station {
  code: string;
  name: string;
}

interface StationInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (station: Station) => void;
  placeholder?: string;
  stations: Station[];
}

const StationInput: React.FC<StationInputProps> = ({
  label,
  value,
  onChange,
  onSelect,
  placeholder = "Enter city or station",
  stations
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-irctc-medium-gray mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
          aria-label={label}
        />
        <MapPin 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" 
          aria-hidden="true"
        />
        
        <AnimatePresence>
          {showSuggestions && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-1 w-full md:w-[300px] lg:w-[350px] bg-white rounded-lg shadow-xl border border-gray-300 max-h-[75vh] md:max-h-[350px] overflow-hidden"
            >
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-800 px-3 py-2 bg-gray-100 rounded mb-3">
                  Popular Stations
                </div>
                <div className="max-h-[300px] overflow-y-auto py-2">
                  {stations.map((station) => (
                    <motion.div
                      key={station.code}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      className="px-4 py-3.5 rounded-md cursor-pointer transition-colors hover:bg-gray-100 my-2"
                      onClick={() => onSelect(station)}
                      role="option"
                      aria-selected={value === `${station.name} (${station.code})`}
                    >
                      <div className="font-medium text-gray-900 text-base">{station.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{station.code}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StationInput;
