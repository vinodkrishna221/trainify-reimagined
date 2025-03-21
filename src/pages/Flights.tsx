
import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, Search, Filter, Clock, Wifi, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusIndicator from '@/components/common/StatusIndicator';

const Flights = () => {
  const [tripType, setTripType] = useState('roundtrip');
  
  const flights = [
    {
      id: '1',
      airline: 'IndiGo',
      logo: 'https://images.unsplash.com/photo-1649615489989-bee9630a1cea?ixlib=rb-4.0.3&q=85&w=64&h=64&crop=center',
      flightNumber: '6E-2135',
      departure: '10:25',
      arrival: '12:35',
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      duration: '2h 10m',
      price: '₹4,230',
      isRefundable: true,
      amenities: ['meal', 'wifi', 'entertainment'],
      stops: 'Non-stop',
    },
    {
      id: '2',
      airline: 'Air India',
      logo: 'https://images.unsplash.com/photo-1649615489989-bee9630a1cea?ixlib=rb-4.0.3&q=85&w=64&h=64&crop=center',
      flightNumber: 'AI-864',
      departure: '08:10',
      arrival: '10:35',
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      duration: '2h 25m',
      price: '₹5,120',
      isRefundable: true,
      amenities: ['meal', 'wifi', 'entertainment', 'usb'],
      stops: 'Non-stop',
    },
    {
      id: '3',
      airline: 'Vistara',
      logo: 'https://images.unsplash.com/photo-1649615489989-bee9630a1cea?ixlib=rb-4.0.3&q=85&w=64&h=64&crop=center',
      flightNumber: 'UK-945',
      departure: '16:45',
      arrival: '19:05',
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      duration: '2h 20m',
      price: '₹4,750',
      isRefundable: true,
      amenities: ['meal', 'wifi', 'entertainment', 'usb'],
      stops: 'Non-stop',
    },
    {
      id: '4',
      airline: 'SpiceJet',
      logo: 'https://images.unsplash.com/photo-1649615489989-bee9630a1cea?ixlib=rb-4.0.3&q=85&w=64&h=64&crop=center',
      flightNumber: 'SG-8169',
      departure: '12:00',
      arrival: '14:15',
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      duration: '2h 15m',
      price: '₹3,850',
      isRefundable: false,
      amenities: ['meal'],
      stops: 'Non-stop',
    },
    {
      id: '5',
      airline: 'GoAir',
      logo: 'https://images.unsplash.com/photo-1649615489989-bee9630a1cea?ixlib=rb-4.0.3&q=85&w=64&h=64&crop=center',
      flightNumber: 'G8-339',
      departure: '07:05',
      arrival: '09:25',
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      duration: '2h 20m',
      price: '₹3,620',
      isRefundable: false,
      amenities: [],
      stops: 'Non-stop',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Find and Book the Perfect Flight</h1>
            <p className="text-xl text-white/90 mb-8 text-center">
              Discover affordable flights to hundreds of destinations across India
            </p>
            
            <Card className="bg-white rounded-xl p-6 shadow-lg">
              <Tabs defaultValue="roundtrip" className="w-full" onValueChange={setTripType}>
                <TabsList className="mb-6 w-full bg-gray-100 p-1">
                  <TabsTrigger value="roundtrip" className="flex-1">Round Trip</TabsTrigger>
                  <TabsTrigger value="oneway" className="flex-1">One Way</TabsTrigger>
                  <TabsTrigger value="multicity" className="flex-1">Multi-City</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roundtrip" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="From City or Airport"
                          defaultValue="New Delhi (DEL)"
                        />
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="To City or Airport"
                          defaultValue="Mumbai (BOM)"
                        />
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure - Return</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="Select Dates"
                          defaultValue="Jul 15 - Jul 22"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Travelers & Class</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="Passengers & Class"
                          defaultValue="1 Adult, Economy"
                        />
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 h-auto text-lg font-medium"
                    >
                      <Search className="mr-2 w-5 h-5" /> Search Flights
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="oneway" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="From City or Airport"
                        />
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="To City or Airport"
                        />
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="Select Date"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Travelers & Class</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="Passengers & Class"
                        />
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 h-auto text-lg font-medium"
                    >
                      <Search className="mr-2 w-5 h-5" /> Search Flights
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="multicity" className="mt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                            placeholder="From City or Airport"
                          />
                          <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                            placeholder="To City or Airport"
                          />
                          <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                            placeholder="Select Date"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                      </div>
                      
                      <div className="flex items-end">
                        <Button variant="outline" className="w-full">+ Add City</Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Travelers & Class</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-10 py-3 border border-gray-200 rounded-lg" 
                          placeholder="Passengers & Class"
                        />
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 h-auto text-lg font-medium"
                    >
                      <Search className="mr-2 w-5 h-5" /> Search Flights
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
        
        {/* Background particle effect */}
        <div id="tsparticles" className="absolute inset-0 z-0"></div>
      </section>
      
      {/* Available Flights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Available Flights</h2>
              <p className="text-irctc-medium-gray">Delhi to Mumbai • July 15</p>
            </div>
            
            <Button variant="outline" className="mt-4 md:mt-0">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flights.map((flight) => (
              <motion.div key={flight.id} variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img 
                          src={flight.logo} 
                          alt={flight.airline} 
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{flight.airline}</div>
                        <div className="text-sm text-irctc-medium-gray">{flight.flightNumber}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.departure}</div>
                        <div className="text-sm text-irctc-medium-gray">{flight.origin}</div>
                      </div>
                      
                      <div className="flex flex-col items-center px-4">
                        <div className="text-xs text-irctc-medium-gray mb-1">{flight.duration}</div>
                        <div className="relative w-32 h-px bg-gray-300">
                          <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-irctc-royal-blue"></div>
                          <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-irctc-royal-blue"></div>
                        </div>
                        <div className="text-xs text-irctc-medium-gray mt-1">{flight.stops}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.arrival}</div>
                        <div className="text-sm text-irctc-medium-gray">{flight.destination}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center lg:items-end">
                      <div className="flex items-center gap-2 mb-2">
                        {flight.amenities.includes('wifi') && (
                          <div className="text-gray-500 tooltip" title="WiFi Available">
                            <Wifi className="w-4 h-4" />
                          </div>
                        )}
                        {flight.amenities.includes('meal') && (
                          <div className="text-gray-500 tooltip" title="Meals Included">
                            <Coffee className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-2xl font-bold text-irctc-royal-blue mb-1">{flight.price}</div>
                      <StatusIndicator type={flight.isRefundable ? "success" : "warning"} showDot>
                        {flight.isRefundable ? "Refundable" : "Non-Refundable"}
                      </StatusIndicator>
                      
                      <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Why Book With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book Flights With Us?</h2>
            <p className="text-irctc-medium-gray max-w-3xl mx-auto">
              We make booking flights easy and affordable with special benefits for IRCTC users
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Hidden Charges</h3>
              <p className="text-irctc-medium-gray">Transparent pricing with no surprise fees</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Rescheduling</h3>
              <p className="text-irctc-medium-gray">Change your flight with minimal fees</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-irctc-medium-gray">Round-the-clock customer assistance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Combo Discounts</h3>
              <p className="text-irctc-medium-gray">Special offers when booking with train tickets</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Download Our App for Exclusive Flight Deals
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Get special mobile-only discounts, instant notifications for price drops, and manage your bookings on the go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px]"
            >
              Download App
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Flights;
