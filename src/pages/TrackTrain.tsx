
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Train, 
  AlertCircle, 
  Clock, 
  MapPin, 
  LocateFixed, 
  Cloud, 
  Thermometer, 
  Wind 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock train status data
const trainStatus = {
  trainName: "Rajdhani Express",
  trainNumber: "12301",
  startStation: "New Delhi",
  endStation: "Howrah Jn",
  departureTime: "16:10",
  arrivalTime: "10:05",
  delay: 24, // minutes
  currentStation: "Kanpur Central",
  nextStation: "Allahabad Junction",
  nextStationArrival: "01:32",
  lastLocation: "10 KM from Kanpur Central",
  lastUpdated: "16:42",
  status: "Running",
  speed: 92, // km/h
  journey: {
    totalDistance: 1451,
    distanceCovered: 440,
    percentageComplete: 30,
  },
  weather: {
    temperature: 28,
    condition: "Partly Cloudy",
    precipitation: "10%",
    windSpeed: "12 km/h"
  },
  stations: [
    { 
      name: "New Delhi", 
      code: "NDLS", 
      status: "departed", 
      scheduledTime: "16:10",
      actualTime: "16:15",
      delay: 5,
      distance: 0,
      platform: 3
    },
    { 
      name: "Kanpur Central", 
      code: "CNB", 
      status: "departed", 
      scheduledTime: "21:40",
      actualTime: "22:04", 
      delay: 24,
      distance: 440,
      platform: 1
    },
    { 
      name: "Allahabad Junction", 
      code: "ALD", 
      status: "upcoming", 
      scheduledTime: "01:08",
      actualTime: "01:32", 
      delay: 24,
      distance: 632,
      platform: 4
    },
    { 
      name: "Gaya Junction", 
      code: "GAYA", 
      status: "upcoming", 
      scheduledTime: "04:13",
      actualTime: "04:37", 
      delay: 24,
      distance: 997,
      platform: 2
    },
    { 
      name: "Dhanbad Junction", 
      code: "DHN", 
      status: "upcoming", 
      scheduledTime: "06:30",
      actualTime: "06:54", 
      delay: 24,
      distance: 1158,
      platform: 3
    },
    { 
      name: "Asansol Junction", 
      code: "ASN", 
      status: "upcoming", 
      scheduledTime: "07:37",
      actualTime: "08:01", 
      delay: 24,
      distance: 1232,
      platform: 1
    },
    { 
      name: "Howrah Jn", 
      code: "HWH", 
      status: "upcoming", 
      scheduledTime: "10:05",
      actualTime: "10:29", 
      delay: 24,
      distance: 1451,
      platform: 9
    },
  ]
};

const TrackTrain = () => {
  const [activeTab, setActiveTab] = useState("pnr");
  const [trainNumber, setTrainNumber] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);

  const handleSearch = () => {
    // In a real app, this would call an API to get train status
    setShowTrackingInfo(true);
  };

  // Calculate current position for the train progress indicator
  const positionPercentage = trainStatus.journey.percentageComplete;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-irctc-dark-gray">Track Your Train</h1>
          <p className="text-irctc-medium-gray mt-3 max-w-2xl mx-auto">
            Get real-time updates on train location, arrival times, and platform information
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Card.Content className="p-6 md:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-2 mb-6">
                  <TabsTrigger value="pnr" className="text-base">Track by PNR</TabsTrigger>
                  <TabsTrigger value="train" className="text-base">Track by Train Number</TabsTrigger>
                </TabsList>
                <TabsContent value="pnr">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pnr">Enter 10-digit PNR Number</Label>
                      <div className="relative mt-1">
                        <Input
                          id="pnr"
                          placeholder="e.g., 1234567890"
                          value={pnrNumber}
                          onChange={(e) => setPnrNumber(e.target.value)}
                          className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-irctc-royal-blue hover:bg-irctc-royal-blue/90"
                      onClick={handleSearch}
                    >
                      Track PNR Status
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="train">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="train-number">Enter Train Number</Label>
                      <div className="relative mt-1">
                        <Input
                          id="train-number"
                          placeholder="e.g., 12301"
                          value={trainNumber}
                          onChange={(e) => setTrainNumber(e.target.value)}
                          className="pl-10"
                        />
                        <Train className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-irctc-royal-blue hover:bg-irctc-royal-blue/90"
                      onClick={handleSearch}
                    >
                      Track Train
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card.Content>
          </Card>

          {showTrackingInfo && (
            <div className="mt-8 space-y-6">
              {/* Train Information Card */}
              <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <Card.Content className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold text-irctc-dark-gray">{trainStatus.trainName}</div>
                      <div className="text-irctc-medium-gray">{trainStatus.trainNumber}</div>
                    </div>
                    <div className="flex items-center">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium flex items-center",
                        trainStatus.status === "Running" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                      )}>
                        <LocateFixed className="h-4 w-4 mr-1" />
                        {trainStatus.status}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="text-sm text-irctc-medium-gray">From</div>
                      <div className="font-medium">{trainStatus.startStation}</div>
                      <div className="text-sm">{trainStatus.departureTime}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                      <div className="text-sm text-irctc-medium-gray">
                        {trainStatus.journey.totalDistance} KM
                      </div>
                      <div className="w-16 md:w-32 h-px bg-gray-300 my-2"></div>
                      <div className={cn(
                        "text-sm font-medium",
                        trainStatus.delay > 0 ? "text-amber-600" : "text-green-600"
                      )}>
                        {trainStatus.delay > 0 
                          ? `Delayed by ${trainStatus.delay} min` 
                          : "On Time"
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-irctc-medium-gray">To</div>
                      <div className="font-medium">{trainStatus.endStation}</div>
                      <div className="text-sm">{trainStatus.arrivalTime}</div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Current Status Card */}
              <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <Card.Content className="p-6">
                  <h3 className="text-lg font-semibold text-irctc-dark-gray mb-4">Current Status</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <div className="text-sm text-irctc-medium-gray">Current Station</div>
                        <div className="font-medium">{trainStatus.currentStation}</div>
                      </div>
                      <div>
                        <div className="text-sm text-irctc-medium-gray">Next Station</div>
                        <div className="font-medium">{trainStatus.nextStation}</div>
                        <div className="text-sm text-irctc-medium-gray">
                          Expected at {trainStatus.nextStationArrival}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-irctc-medium-gray">Last Updated</div>
                        <div className="font-medium">{trainStatus.lastUpdated}</div>
                        <div className="text-sm text-irctc-medium-gray">{trainStatus.lastLocation}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-irctc-medium-gray mb-2">
                      <span>{trainStatus.startStation}</span>
                      <span>{trainStatus.endStation}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full relative">
                      <div 
                        className="h-full bg-irctc-royal-blue rounded-full"
                        style={{ width: `${positionPercentage}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 -mt-1 -ml-2 w-6 h-6 bg-white border-2 border-irctc-royal-blue rounded-full flex items-center justify-center"
                        style={{ left: `${positionPercentage}%` }}
                      >
                        <Train className="w-3 h-3 text-irctc-royal-blue" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm">
                        <span className="font-medium">{trainStatus.journey.distanceCovered} KM</span>
                        <span className="text-irctc-medium-gray"> covered</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{trainStatus.journey.totalDistance - trainStatus.journey.distanceCovered} KM</span>
                        <span className="text-irctc-medium-gray"> remaining</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Speed and Weather */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-irctc-medium-gray">Current Speed</div>
                          <div className="font-medium">{trainStatus.speed} km/h</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Cloud className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm text-irctc-medium-gray">Weather at Current Location</div>
                          <div className="font-medium">{trainStatus.weather.temperature}°C, {trainStatus.weather.condition}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
              
              {/* Station List */}
              <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <Card.Content className="p-6">
                  <h3 className="text-lg font-semibold text-irctc-dark-gray mb-4">Journey Route</h3>
                  <div className="space-y-6">
                    {trainStatus.stations.map((station, index) => (
                      <div key={station.code} className="relative">
                        {/* Vertical Line */}
                        {index < trainStatus.stations.length - 1 && (
                          <div className={cn(
                            "absolute top-6 left-3 w-px h-full -ml-px",
                            station.status === "departed" ? "bg-irctc-royal-blue" : "bg-gray-200"
                          )}></div>
                        )}
                        
                        <div className="flex">
                          {/* Station Status Circle */}
                          <div className={cn(
                            "relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                            station.status === "departed" 
                              ? "bg-irctc-royal-blue" 
                              : station.status === "upcoming" 
                                ? "border-2 border-gray-300 bg-white" 
                                : "bg-green-500"
                          )}>
                            {station.status === "departed" && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          
                          {/* Station Details */}
                          <div className="ml-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <div className="font-medium">{station.name}</div>
                                <div className="text-sm text-irctc-medium-gray">{station.code}</div>
                              </div>
                              <div className="md:text-right mt-2 md:mt-0">
                                <div className="flex items-center text-sm">
                                  <span className="text-irctc-medium-gray mr-2">Scheduled: {station.scheduledTime}</span>
                                  {station.status === "departed" && (
                                    <span className={station.delay > 0 ? "text-amber-600" : "text-green-600"}>
                                      Actual: {station.actualTime}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center text-sm mt-1">
                                  <span className="text-irctc-medium-gray mr-2">Platform: {station.platform}</span>
                                  <span className="text-irctc-medium-gray">{station.distance} KM</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Delay Badge */}
                            {station.status === "departed" && station.delay > 0 && (
                              <div className="mt-2 inline-flex items-center px-2 py-1 rounded text-xs bg-amber-50 text-amber-800">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Delayed by {station.delay} min
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
              
              {/* Weather Information */}
              <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <Card.Content className="p-6">
                  <h3 className="text-lg font-semibold text-irctc-dark-gray mb-4">Weather Along Route</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Thermometer className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-irctc-medium-gray">Temperature</div>
                        <div className="font-medium">{trainStatus.weather.temperature}°C</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Cloud className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-irctc-medium-gray">Conditions</div>
                        <div className="font-medium">{trainStatus.weather.condition}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Wind className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-irctc-medium-gray">Wind</div>
                        <div className="font-medium">{trainStatus.weather.windSpeed}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-4 border-amber-200 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Weather Advisory</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Light rain expected along parts of the route. No significant delays anticipated.
                    </AlertDescription>
                  </Alert>
                </Card.Content>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackTrain;
