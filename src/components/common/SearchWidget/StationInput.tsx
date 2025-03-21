
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-irctc-medium-gray mb-1.5">{label}</label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => {
            setFocused(true);
            setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
          aria-label={label}
        />
        <MapPin 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" 
          aria-hidden="true"
        />
      </div>
      
      {/* Suggestions dropdown with fixed positioning */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 50,
              marginTop: '4px'
            }}
            className="bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="p-3">
              <div className="text-sm font-semibold bg-gray-50 text-gray-800 px-3 py-2 rounded mb-2">
                Popular Stations
              </div>
              <div className={`overflow-y-auto ${isMobile ? 'max-h-[40vh]' : 'max-h-[300px]'}`}>
                {stations.map((station) => (
                  <motion.div
                    key={station.code}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="px-4 py-3 rounded-md cursor-pointer hover:bg-gray-100 flex items-start justify-between"
                    onClick={() => {
                      onSelect(station);
                      setShowSuggestions(false);
                    }}
                    role="option"
                    aria-selected={value === `${station.name} (${station.code})`}
                  >
                    <div>
                      <div className="font-medium text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{station.code}</div>
                    </div>
                    {value === `${station.name} (${station.code})` && (
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StationInput;
