
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarClock, Clock, Filter, IndianRupee, LocateFixed, AlertTriangle, ShieldCheck, Trash2, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock train data for demonstration
const trains = [
  {
    id: 1,
    name: 'Rajdhani Express',
    number: '12301',
    from: 'New Delhi',
    to: 'Howrah Jn',
    departure: '16:10',
    arrival: '10:05',
    duration: '17h 55m',
    days: 'M T W T F S S',
    classes: ['1A', '2A', '3A'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 12, price: 3245 },
      '2A': { status: 'LIMITED', seats: 4, price: 1890 },
      '3A': { status: 'AVAILABLE', seats: 28, price: 1245 }
    }
  },
  {
    id: 2,
    name: 'Shatabdi Express',
    number: '12019',
    from: 'New Delhi',
    to: 'Lucknow',
    departure: '06:10',
    arrival: '12:40',
    duration: '6h 30m',
    days: 'M T W T F S -',
    classes: ['EC', 'CC'],
    availability: {
      'EC': { status: 'AVAILABLE', seats: 24, price: 1460 },
      'CC': { status: 'AVAILABLE', seats: 56, price: 985 }
    }
  },
  {
    id: 3,
    name: 'Duronto Express',
    number: '12213',
    from: 'New Delhi',
    to: 'Mumbai Central',
    departure: '23:00',
    arrival: '15:55',
    duration: '16h 55m',
    days: '- T - T - S -',
    classes: ['1A', '2A', '3A', 'SL'],
    availability: {
      '1A': { status: 'WL', seats: -5, price: 4280 },
      '2A': { status: 'WL', seats: -12, price: 2510 },
      '3A': { status: 'LIMITED', seats: 3, price: 1725 },
      'SL': { status: 'AVAILABLE', seats: 68, price: 650 }
    }
  },
  {
    id: 4,
    name: 'Sampark Kranti',
    number: '12565',
    from: 'New Delhi',
    to: 'Patna Jn',
    departure: '13:45',
    arrival: '06:10',
    duration: '16h 25m',
    days: 'M - W - F - -',
    classes: ['2A', '3A', 'SL'],
    availability: {
      '2A': { status: 'RAC', seats: -2, price: 1825 },
      '3A': { status: 'AVAILABLE', seats: 16, price: 1215 },
      'SL': { status: 'AVAILABLE', seats: 126, price: 445 }
    }
  },
  {
    id: 5,
    name: 'Garib Rath',
    number: '12203',
    from: 'New Delhi',
    to: 'Chennai',
    departure: '15:35',
    arrival: '20:15',
    duration: '28h 40m',
    days: '- - W - - S -',
    classes: ['3A', 'SL'],
    availability: {
      '3A': { status: 'AVAILABLE', seats: 42, price: 865 },
      'SL': { status: 'AVAILABLE', seats: 115, price: 320 }
    }
  }
];

type AvailabilityStatus = 'AVAILABLE' | 'LIMITED' | 'WL' | 'RAC';

const TrainList = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedTrains, setSelectedTrains] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('departure');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectTrain = (id: number) => {
    if (selectedTrains.includes(id)) {
      setSelectedTrains(selectedTrains.filter(trainId => trainId !== id));
    } else {
      setSelectedTrains([...selectedTrains, id]);
    }
  };

  const handleClassSelection = (trainClass: string) => {
    setSelectedClass(trainClass);
  };

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'text-green-600';
      case 'LIMITED':
        return 'text-amber-600';
      case 'RAC':
        return 'text-amber-600';
      case 'WL':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSortedTrains = () => {
    return [...trains].sort((a, b) => {
      switch (sortBy) {
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'arrival':
          return a.arrival.localeCompare(b.arrival);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'price':
          const priceA = a.classes[0] ? a.availability[a.classes[0]].price : 0;
          const priceB = b.classes[0] ? b.availability[b.classes[0]].price : 0;
          return priceA - priceB;
        default:
          return 0;
      }
    });
  };

  const handleSort = (sortKey: string) => {
    setSortBy(sortKey);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-80" />
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          
          {/* Skeleton for sort options */}
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-9 w-24 rounded-md" />
            ))}
          </div>

          {/* Skeleton for train cards */}
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-64 w-full rounded-md" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-irctc-dark-gray">New Delhi to Mumbai</h1>
            <p className="text-irctc-medium-gray">Wed, 15 June • 1 Passenger • AC 3 Tier (3A)</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              Modify Search
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <Card className="mb-8 animate-fade-in shadow-md">
            <Card.Content className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label className="mb-3 block font-medium">Departure Time</Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox id="morning" />
                      <label htmlFor="morning" className="ml-3 text-sm">Morning (6:00 - 12:00)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="afternoon" />
                      <label htmlFor="afternoon" className="ml-3 text-sm">Afternoon (12:00 - 18:00)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="evening" />
                      <label htmlFor="evening" className="ml-3 text-sm">Evening (18:00 - 00:00)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="night" />
                      <label htmlFor="night" className="ml-3 text-sm">Night (00:00 - 6:00)</label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block font-medium">Class</Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox id="1a" />
                      <label htmlFor="1a" className="ml-3 text-sm">AC First Class (1A)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="2a" />
                      <label htmlFor="2a" className="ml-3 text-sm">AC 2 Tier (2A)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="3a" />
                      <label htmlFor="3a" className="ml-3 text-sm">AC 3 Tier (3A)</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="sl" />
                      <label htmlFor="sl" className="ml-3 text-sm">Sleeper (SL)</label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block font-medium">Train Type</Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox id="rajdhani" />
                      <label htmlFor="rajdhani" className="ml-3 text-sm">Rajdhani</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="shatabdi" />
                      <label htmlFor="shatabdi" className="ml-3 text-sm">Shatabdi</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="duronto" />
                      <label htmlFor="duronto" className="ml-3 text-sm">Duronto</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="superfast" />
                      <label htmlFor="superfast" className="ml-3 text-sm">Superfast</label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block font-medium">Availability</Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox id="available" />
                      <label htmlFor="available" className="ml-3 text-sm">Available</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="rac" />
                      <label htmlFor="rac" className="ml-3 text-sm">RAC</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="waitlist" />
                      <label htmlFor="waitlist" className="ml-3 text-sm">WL</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
                <Button className="bg-irctc-royal-blue text-white">Apply Filters</Button>
              </div>
            </Card.Content>
          </Card>
        )}
        
        {/* Sort options */}
        <div className="flex overflow-x-auto gap-3 mb-6 pb-2">
          <Button 
            variant={sortBy === 'departure' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('departure')}
            className={cn(
              "whitespace-nowrap",
              sortBy === 'departure' ? "bg-irctc-royal-blue text-white" : ""
            )}
          >
            Departure
          </Button>
          <Button 
            variant={sortBy === 'arrival' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('arrival')}
            className={cn(
              "whitespace-nowrap",
              sortBy === 'arrival' ? "bg-irctc-royal-blue text-white" : ""
            )}
          >
            Arrival
          </Button>
          <Button 
            variant={sortBy === 'duration' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('duration')}
            className={cn(
              "whitespace-nowrap",
              sortBy === 'duration' ? "bg-irctc-royal-blue text-white" : ""
            )}
          >
            Duration
          </Button>
          <Button 
            variant={sortBy === 'price' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('price')}
            className={cn(
              "whitespace-nowrap",
              sortBy === 'price' ? "bg-irctc-royal-blue text-white" : ""
            )}
          >
            Price
          </Button>
        </div>

        {/* Train List */}
        <div className="space-y-5">
          {getSortedTrains().map(train => (
            <Card key={train.id} className={cn(
              "border-l-4 transition-all duration-300 hover:shadow-md",
              selectedTrains.includes(train.id) ? "border-l-irctc-royal-blue" : "border-l-transparent"
            )}>
              <Card.Content className="p-0">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="font-bold text-irctc-dark-gray">{train.name}</div>
                    <div className="text-sm text-irctc-medium-gray">{train.number}</div>
                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">{train.days}</div>
                  </div>
                  <div>
                    <Button 
                      variant={selectedTrains.includes(train.id) ? "selected" : "select"}
                      size="sm"
                      onClick={() => handleSelectTrain(train.id)}
                      className="text-sm transition-colors duration-300"
                    >
                      {selectedTrains.includes(train.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Time and Station Info */}
                    <div className="md:col-span-5 flex items-center">
                      <div className="flex-1">
                        <div className="text-xl font-bold">{train.departure}</div>
                        <div className="text-sm text-irctc-medium-gray">{train.from}</div>
                      </div>
                      <div className="flex flex-col items-center mx-3">
                        <div className="text-xs text-irctc-medium-gray">{train.duration}</div>
                        <div className="w-24 h-px bg-gray-300 my-1"></div>
                        <div className="text-xs text-irctc-medium-gray flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {train.days.split(' ').filter(d => d !== '-').length} days
                        </div>
                      </div>
                      <div className="flex-1 text-right">
                        <div className="text-xl font-bold">{train.arrival}</div>
                        <div className="text-sm text-irctc-medium-gray">{train.to}</div>
                      </div>
                    </div>
                    
                    {/* Class and Availability Info */}
                    <div className="md:col-span-7">
                      <div className="grid grid-cols-3 gap-3">
                        {train.classes.map(trainClass => (
                          <div 
                            key={trainClass} 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all",
                              selectedClass === `${train.id}-${trainClass}` 
                                ? "border-irctc-royal-blue bg-irctc-royal-blue/5" 
                                : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => handleClassSelection(`${train.id}-${trainClass}`)}
                          >
                            <div className="font-medium">{trainClass}</div>
                            <div className={cn(
                              "text-sm font-medium", 
                              getStatusColor(train.availability[trainClass].status as AvailabilityStatus)
                            )}>
                              {train.availability[trainClass].status}
                              {train.availability[trainClass].seats > 0 && 
                                ` (${train.availability[trainClass].seats})`
                              }
                              {train.availability[trainClass].seats < 0 && 
                                ` (${Math.abs(train.availability[trainClass].seats)})`
                              }
                            </div>
                            <div className="text-sm mt-2 flex items-center">
                              <IndianRupee className="h-3 w-3 mr-1" />
                              {train.availability[trainClass].price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info and Book Button */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
                      <div className="flex items-center text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                        <ShieldCheck className="h-3 w-3 mr-1.5" />
                        Refundable
                      </div>
                      <div className="flex items-center text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                        <LocateFixed className="h-3 w-3 mr-1.5" />
                        Live Tracking
                      </div>
                      <div className="flex items-center text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                        <CalendarClock className="h-3 w-3 mr-1.5" />
                        Dynamic Fare
                      </div>
                    </div>
                    <Button 
                      className="bg-irctc-royal-blue hover:bg-irctc-royal-blue/90 transition-all duration-300"
                      onClick={() => window.location.href = '/passenger-details'}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainList;
