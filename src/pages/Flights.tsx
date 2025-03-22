
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, Search, Star, Wifi, CreditCard, Coffee, 
         MapPin, Filter, ArrowRight, ArrowUpDown, Tv as TvIcon, 
         ChevronsUpDown, AlertCircle, Bookmark } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusIndicator from '@/components/common/StatusIndicator';
import ParticleBackground from '@/components/common/ParticleBackground';

interface Flight {
  id: number;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  status: 'on-time' | 'delayed' | 'cancelled';
}

const initialFlights: Flight[] = [
  {
    id: 1,
    airline: 'IRCTC Airways',
    departure: '06:00 DEL',
    arrival: '09:00 BOM',
    duration: '3h 0m',
    price: 4500,
    stops: 0,
    status: 'on-time',
  },
  {
    id: 2,
    airline: 'Spice Express',
    departure: '07:30 DEL',
    arrival: '10:30 BOM',
    duration: '3h 0m',
    price: 5200,
    stops: 0,
    status: 'on-time',
  },
  {
    id: 3,
    airline: 'Air India',
    departure: '09:00 DEL',
    arrival: '12:30 BOM',
    duration: '3h 30m',
    price: 6000,
    stops: 1,
    status: 'delayed',
  },
  {
    id: 4,
    airline: 'Indigo',
    departure: '11:00 DEL',
    arrival: '14:00 BOM',
    duration: '3h 0m',
    price: 4800,
    stops: 0,
    status: 'on-time',
  },
  {
    id: 5,
    airline: 'Vistara',
    departure: '13:00 DEL',
    arrival: '16:30 BOM',
    duration: '3h 30m',
    price: 5500,
    stops: 1,
    status: 'on-time',
  },
];

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState(initialFlights);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    navigate('/book-train');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const sortFlights = (criteria: 'price' | 'duration') => {
    setSortBy(criteria);
    const sortedFlights = [...flights].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (criteria === 'price') {
        return order * (a.price - b.price);
      } else {
        // Simple duration comparison (assuming format is always 'Xh Ym')
        const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].split('m')[0]);
        const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].split('m')[0]);
        return order * (durationA - durationB);
      }
    });
    setFlights(sortedFlights);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Flight Tickets</h1>
            <p className="text-xl text-white/90 mb-8">
              Find the best deals on domestic and international flights
            </p>
            <Button variant="accent" size="lg" className="font-medium" onClick={handleSearch}>
              <Plane className="w-5 h-5 mr-2" />
              Search Flights
            </Button>
          </div>
        </div>
        <ParticleBackground 
          className="absolute inset-0 z-0" 
          imageSrc="https://images.unsplash.com/photo-1606768666853-403c90a981ad?q=80&w=2671&auto=format&fit=crop"
          overlayColor="bg-gradient-to-r from-blue-600/70 to-purple-600/70"
          overlayOpacity={0.7}
        />
      </section>

      {/* Search and Filter Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Card className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            {/* From Location */}
            <div>
              <Label htmlFor="from">From</Label>
              <Input type="text" id="from" placeholder="Enter city or airport" />
            </div>

            {/* To Location */}
            <div>
              <Label htmlFor="to">To</Label>
              <Input type="text" id="to" placeholder="Enter city or airport" />
            </div>

            {/* Departure Date */}
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input type="date" id="departureDate" />
            </div>

            {/* Passengers */}
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="1 Passenger" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={`${num} Passenger`}>
                      {num} Passenger{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </section>

      {/* Flight Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Available Flights</h2>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => sortFlights('price')}>
                Price <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => sortFlights('duration')}>
                Duration <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={toggleFilter}>
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Filter Options (Conditionally Rendered) */}
          {isFilterOpen && (
            <Card className="mb-6 p-4">
              <h3 className="text-lg font-semibold mb-3">Filter Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="block mb-2">Airline</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Airline" />
                    </SelectTrigger>
                    <SelectContent>
                      {['IRCTC Airways', 'Spice Express', 'Air India', 'Indigo', 'Vistara'].map((airline) => (
                        <SelectItem key={airline} value={airline}>
                          {airline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block mb-2">Stops</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Stops" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Non-Stop', '1 Stop', '2+ Stops'].map((stopOption, index) => (
                        <SelectItem key={index} value={stopOption}>
                          {stopOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}

          {/* Flight List */}
          {flights.map((flight) => (
            <Card key={flight.id} className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                {/* Airline and Flight Details */}
                <div className="md:col-span-1">
                  <div className="text-lg font-semibold text-gray-700">{flight.airline}</div>
                  <div className="text-sm text-gray-500">
                    {flight.departure.split(' ')[1]} - {flight.arrival.split(' ')[1]}
                  </div>
                </div>

                {/* Departure and Arrival Times */}
                <div className="md:col-span-1">
                  <div className="text-xl font-semibold text-gray-800">{flight.departure.split(' ')[0]}</div>
                  <div className="text-sm text-gray-500">Departure</div>
                </div>
                <div className="md:col-span-1">
                  <div className="text-xl font-semibold text-gray-800">{flight.arrival.split(' ')[0]}</div>
                  <div className="text-sm text-gray-500">Arrival</div>
                </div>

                {/* Duration and Stops */}
                <div className="md:col-span-1 flex flex-col items-end">
                  <div className="text-md font-medium text-gray-700">{flight.duration}</div>
                  <div className="text-sm text-gray-500">{flight.stops} Stop{flight.stops !== 1 ? 's' : ''}</div>
                  <div className="text-lg font-semibold text-blue-600">₹{flight.price}</div>
                  <Button variant="default" size="sm">Book Now</Button>
                </div>
              </div>
              {flight.status === 'delayed' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <AlertCircle className="inline w-4 h-4 mr-2 align-middle" />
                  Flight is delayed
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Replace Tag with Bookmark and Train with Plane */}
      <Bookmark className="mr-2 h-4 w-4" />
      <Plane className="w-5 h-5 mr-2" />
    </MainLayout>
  );
};

export default Flights;
