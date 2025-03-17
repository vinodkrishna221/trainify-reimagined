
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, AlertCircle, Mail, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { format } from 'date-fns';
import StationInput from '../common/SearchWidget/StationInput';

interface Station {
  code: string;
  name: string;
}

interface CreateAlertFormProps {
  onSubmit: (data: {
    fromStation: string;
    toStation: string;
    date: string;
    priceThreshold: number;
    email: string;
    active: boolean;
  }) => void;
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

const CreateAlertForm: React.FC<CreateAlertFormProps> = ({ onSubmit }) => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priceThreshold, setPriceThreshold] = useState<string>('');
  const [email, setEmail] = useState('');
  
  const [errors, setErrors] = useState({
    fromStation: false,
    toStation: false,
    date: false,
    priceThreshold: false,
    email: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {
      fromStation: !fromStation,
      toStation: !toStation,
      date: !date,
      priceThreshold: !priceThreshold || Number(priceThreshold) <= 0,
      email: !email || !/\S+@\S+\.\S+/.test(email),
    };
    
    setErrors(newErrors);
    
    // If any validation errors exist, don't submit
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    onSubmit({
      fromStation,
      toStation,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      priceThreshold: Number(priceThreshold),
      email,
      active: true,
    });
    
    // Reset form
    setFromStation('');
    setToStation('');
    setDate(undefined);
    setPriceThreshold('');
    setEmail('');
  };

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
    if (e.target.value) setErrors(prev => ({ ...prev, fromStation: false }));
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
    if (e.target.value) setErrors(prev => ({ ...prev, toStation: false }));
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and validate on change
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPriceThreshold(value);
    if (value && Number(value) > 0) {
      setErrors(prev => ({ ...prev, priceThreshold: false }));
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value && /\S+@\S+\.\S+/.test(e.target.value)) {
      setErrors(prev => ({ ...prev, email: false }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-irctc-dark-gray mb-3">Create New Fare Alert</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <StationInput
                    label="From"
                    value={fromStation}
                    onChange={handleFromStationChange}
                    onSelect={(station) => {
                      setFromStation(`${station.name} (${station.code})`);
                      setErrors(prev => ({ ...prev, fromStation: false }));
                    }}
                    stations={popularStations}
                  />
                  {errors.fromStation && (
                    <p className="text-sm text-red-500 mt-1">Please select a departure station</p>
                  )}
                </div>
                
                <div>
                  <StationInput
                    label="To"
                    value={toStation}
                    onChange={handleToStationChange}
                    onSelect={(station) => {
                      setToStation(`${station.name} (${station.code})`);
                      setErrors(prev => ({ ...prev, toStation: false }));
                    }}
                    stations={popularStations}
                  />
                  {errors.toStation && (
                    <p className="text-sm text-red-500 mt-1">Please select a destination station</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">Travel Date</Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !date && 'text-muted-foreground'
                          } ${errors.date ? 'border-red-500' : ''}`}
                          id="date"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarUI
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate) setErrors(prev => ({ ...prev, date: false }));
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-sm text-red-500 mt-1">Please select a travel date</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="price" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">
                    Price Threshold (₹)
                  </Label>
                  <div className="relative">
                    <Input
                      id="price"
                      type="text"
                      value={priceThreshold}
                      onChange={handlePriceChange}
                      placeholder="e.g., 1500"
                      className={`pl-10 ${errors.priceThreshold ? 'border-red-500' : ''}`}
                    />
                    <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-irctc-medium-gray" />
                    {errors.priceThreshold && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid price</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">
                  Email for Notifications
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your.email@example.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-irctc-medium-gray" />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
                  )}
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-irctc-royal-blue hover:bg-irctc-royal-blue/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};

export default CreateAlertForm;
