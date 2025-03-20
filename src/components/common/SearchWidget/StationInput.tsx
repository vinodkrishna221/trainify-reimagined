
import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    function updatePosition() {
      if (inputRef.current && showSuggestions) {
        const rect = inputRef.current.getBoundingClientRect();
        
        if (isMobile) {
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left,
            width: Math.min(window.innerWidth - 32, 350)
          });
        } else {
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left,
            width: Math.max(rect.width, 350)
          });
        }
      }
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [showSuggestions, isMobile]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-irctc-medium-gray mb-1.5">{label}</label>
      <div className="relative" ref={inputRef}>
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
              className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
              style={{
                top: `${dropdownPosition.top}px`, 
                left: isMobile ? '50%' : `${dropdownPosition.left}px`,
                width: isMobile ? `${dropdownPosition.width}px` : `${dropdownPosition.width}px`,
                maxHeight: isMobile ? '40vh' : '75vh',
                transform: isMobile ? 'translateX(-50%)' : 'none'
              }}
            >
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-800 px-3 py-2 bg-gray-100 rounded mb-3">
                  Popular Stations
                </div>
                <div className={`overflow-y-auto ${isMobile ? 'max-h-[30vh]' : 'max-h-[300px]'}`}>
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
