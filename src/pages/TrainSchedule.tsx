
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarClock, Train, Search, Clock, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock train schedule data
const scheduleData = [
  { time: '05:00', station: 'New Delhi (NDLS)', day: 1, distance: '0 km', platform: '5', halt: 'Start' },
  { time: '06:15', station: 'Ghaziabad (GZB)', day: 1, distance: '28 km', platform: '2', halt: '2 min' },
  { time: '07:32', station: 'Aligarh Jn (ALJN)', day: 1, distance: '126 km', platform: '1', halt: '2 min' },
  { time: '08:52', station: 'Tundla Jn (TDL)', day: 1, distance: '203 km', platform: '3', halt: '5 min' },
  { time: '10:35', station: 'Kanpur Central (CNB)', day: 1, distance: '355 km', platform: '7', halt: '10 min' },
  { time: '12:50', station: 'Prayagraj Jn (PRYJ)', day: 1, distance: '498 km', platform: '4', halt: '10 min' },
  { time: '15:15', station: 'Pt. Deen Dayal Upadhyaya Jn (DDU)', day: 1, distance: '601 km', platform: '6', halt: '5 min' },
  { time: '18:45', station: 'Gaya Jn (GAYA)', day: 1, distance: '747 km', platform: '1', halt: '5 min' },
  { time: '21:20', station: 'Dhanbad Jn (DHN)', day: 1, distance: '883 km', platform: '3', halt: '5 min' },
  { time: '01:30', station: 'Asansol Jn (ASN)', day: 2, distance: '992 km', platform: '2', halt: '3 min' },
  { time: '05:15', station: 'Howrah Jn (HWH)', day: 2, distance: '1,090 km', platform: '9', halt: 'End' },
];

const trainDetails = {
  name: 'Rajdhani Express',
  number: '12301',
  from: 'New Delhi',
  to: 'Howrah Jn',
  departure: '05:00',
  arrival: '05:15',
  duration: '24h 15m',
  distance: '1,090 km',
  days: 'M T W T F S S',
  coaches: [
    { type: '1A', count: 2 },
    { type: '2A', count: 4 },
    { type: '3A', count: 10 },
    { type: 'PC', count: 1 },
  ]
};

const TrainSchedule = () => {
  const [searchTrain, setSearchTrain] = useState('');
  const [activeTab, setActiveTab] = useState('schedule');

  const handleSearch = () => {
    console.log('Searching for train:', searchTrain);
    // In a real app, this would fetch the train schedule
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-irctc-dark-gray">Train Schedule</h1>
          <p className="text-irctc-medium-gray mt-2">
            View complete schedule, route, and timings of any train
          </p>
        </div>

        {/* Search Box */}
        <Card className="max-w-2xl mx-auto mb-10">
          <Card.Content className="p-6">
            <div className="space-y-4">
              <Label htmlFor="train-search">Enter Train Number or Name</Label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Input
                    id="train-search"
                    placeholder="e.g. 12301 or Rajdhani Express"
                    value={searchTrain}
                    onChange={(e) => setSearchTrain(e.target.value)}
                    className="pl-10"
                  />
                  <Train className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Button 
                  className="bg-irctc-royal-blue"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Train Details and Schedule */}
        <div className="max-w-5xl mx-auto">
          <Card>
            <Card.Content className="p-0">
              {/* Train Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-irctc-dark-gray">{trainDetails.name}</h2>
                      <span className="ml-3 text-irctc-medium-gray">({trainDetails.number})</span>
                    </div>
                    <div className="flex items-center mt-2 text-irctc-medium-gray text-sm">
                      <span className="mr-4">{trainDetails.from} to {trainDetails.to}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{trainDetails.days}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-irctc-light-blue/10 text-irctc-royal-blue px-4 py-2 rounded-lg flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{trainDetails.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{trainDetails.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="schedule" className="p-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="schedule" onClick={() => setActiveTab('schedule')}>Schedule</TabsTrigger>
                  <TabsTrigger value="coach" onClick={() => setActiveTab('coach')}>Coach Composition</TabsTrigger>
                  <TabsTrigger value="fare" onClick={() => setActiveTab('fare')}>Fare Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="schedule" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-irctc-medium-gray">
                          <th className="px-4 py-3 text-left text-sm font-medium">Day</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Station</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Distance</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Halt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleData.map((stop, index) => (
                          <tr 
                            key={index} 
                            className={`border-b border-gray-100 ${
                              index === 0 || index === scheduleData.length - 1 
                                ? 'bg-irctc-light-blue/5' 
                                : ''
                            }`}
                          >
                            <td className="px-4 py-4 text-sm">{stop.day}</td>
                            <td className="px-4 py-4 text-sm font-medium">{stop.time}</td>
                            <td className="px-4 py-4">
                              <div className="font-medium">{stop.station.split('(')[0]}</div>
                              <div className="text-xs text-irctc-medium-gray">{stop.station.match(/\(([^)]+)\)/)?.[1]}</div>
                            </td>
                            <td className="px-4 py-4 text-sm">{stop.distance}</td>
                            <td className="px-4 py-4 text-sm">{stop.platform}</td>
                            <td className="px-4 py-4 text-sm">
                              {stop.halt === 'Start' ? (
                                <span className="text-green-600">Start</span>
                              ) : stop.halt === 'End' ? (
                                <span className="text-red-600">End</span>
                              ) : (
                                stop.halt
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="coach" className="mt-0">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Coach Composition</h3>
                    <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
                      <div className="bg-irctc-royal-blue text-white px-4 py-2 rounded-lg">ENG</div>
                      {trainDetails.coaches.map((coach, idx) => (
                        <React.Fragment key={idx}>
                          {Array.from({ length: coach.count }).map((_, i) => (
                            <div 
                              key={`${coach.type}-${i}`} 
                              className="border border-irctc-royal-blue text-irctc-royal-blue px-4 py-2 rounded-lg"
                            >
                              {coach.type}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Coach Types</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-irctc-royal-blue text-white rounded flex items-center justify-center mr-2">1A</div>
                          <span>AC First Class</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-irctc-royal-blue text-white rounded flex items-center justify-center mr-2">2A</div>
                          <span>AC 2 Tier</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-irctc-royal-blue text-white rounded flex items-center justify-center mr-2">3A</div>
                          <span>AC 3 Tier</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-irctc-royal-blue text-white rounded flex items-center justify-center mr-2">PC</div>
                          <span>Pantry Car</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="fare" className="mt-0">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Fare Information</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-irctc-medium-gray">
                            <th className="px-4 py-3 text-left text-sm font-medium">Class</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Base Fare</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Reservation Fee</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">GST</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Total Fare</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="px-4 py-4">
                              <div className="font-medium">AC First Class</div>
                              <div className="text-xs text-irctc-medium-gray">1A</div>
                            </td>
                            <td className="px-4 py-4 text-sm">₹3,050</td>
                            <td className="px-4 py-4 text-sm">₹60</td>
                            <td className="px-4 py-4 text-sm">₹135</td>
                            <td className="px-4 py-4 font-medium">₹3,245</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="px-4 py-4">
                              <div className="font-medium">AC 2 Tier</div>
                              <div className="text-xs text-irctc-medium-gray">2A</div>
                            </td>
                            <td className="px-4 py-4 text-sm">₹1,750</td>
                            <td className="px-4 py-4 text-sm">₹50</td>
                            <td className="px-4 py-4 text-sm">₹90</td>
                            <td className="px-4 py-4 font-medium">₹1,890</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="px-4 py-4">
                              <div className="font-medium">AC 3 Tier</div>
                              <div className="text-xs text-irctc-medium-gray">3A</div>
                            </td>
                            <td className="px-4 py-4 text-sm">₹1,150</td>
                            <td className="px-4 py-4 text-sm">₹40</td>
                            <td className="px-4 py-4 text-sm">₹55</td>
                            <td className="px-4 py-4 font-medium">₹1,245</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                      <p className="text-yellow-800">
                        Fares shown are indicative and may vary based on quotas, season, and dynamic pricing.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card.Content>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainSchedule;
