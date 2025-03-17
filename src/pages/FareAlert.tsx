
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  BellRing, MapPin, Train, ArrowRightLeft, Calendar, Info, 
  Plus, X, Bell, PlusCircle, Check, Mail, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/common/Card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock station data
const popularStations = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'CSTM', name: 'Mumbai CST' },
  { code: 'HWH', name: 'Howrah Jn' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'SBC', name: 'Bengaluru' },
  { code: 'PNBE', name: 'Patna Jn' },
  { code: 'LKO', name: 'Lucknow' },
];

// Mock train classes
const trainClasses = [
  { value: 'SL', label: 'Sleeper Class' },
  { value: '3A', label: 'AC 3 Tier' },
  { value: '2A', label: 'AC 2 Tier' },
  { value: '1A', label: 'AC First Class' },
  { value: 'CC', label: 'Chair Car' },
];

// Mock existing alert data
const existingAlerts = [
  {
    id: 1,
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Mumbai CST (CSTM)',
    class: '3A',
    targetFare: '₹1,450',
    currentFare: '₹1,680',
    travelDate: '2023-09-15',
    status: 'active',
  },
  {
    id: 2,
    fromStation: 'Bengaluru (SBC)',
    toStation: 'Chennai Central (MAS)',
    class: 'SL',
    targetFare: '₹450',
    currentFare: '₹480',
    travelDate: '2023-10-05',
    status: 'active',
  },
  {
    id: 3,
    fromStation: 'Howrah Jn (HWH)',
    toStation: 'Patna Jn (PNBE)',
    class: '2A',
    targetFare: '₹1,200',
    currentFare: '₹1,150',
    travelDate: '2023-08-20',
    status: 'triggered',
  }
];

const FareAlert = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [targetFare, setTargetFare] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(false);
  const [alerts, setAlerts] = useState(existingAlerts);
  const { toast } = useToast();

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
    setShowFromSuggestions(true);
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
    setShowToSuggestions(true);
  };

  const handleStationSelect = (type: 'from' | 'to', station: { name: string, code: string }) => {
    if (type === 'from') {
      setFromStation(`${station.name} (${station.code})`);
      setShowFromSuggestions(false);
    } else {
      setToStation(`${station.name} (${station.code})`);
      setShowToSuggestions(false);
    }
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleCreateAlert = () => {
    if (!fromStation || !toStation || !travelClass || !travelDate || !targetFare) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }

    // Add new alert
    const newAlert = {
      id: alerts.length + 1,
      fromStation,
      toStation,
      class: travelClass,
      targetFare: `₹${targetFare}`,
      currentFare: `₹${parseInt(targetFare, 10) + Math.floor(Math.random() * 300)}`,
      travelDate,
      status: 'active',
    };

    setAlerts([newAlert, ...alerts]);
    
    // Reset form
    setFromStation('');
    setToStation('');
    setTravelClass('');
    setTravelDate('');
    setTargetFare('');
    
    // Show success toast
    toast({
      title: "Fare Alert Created",
      description: "You'll be notified when the fare meets your target",
    });

    // Switch to manage tab
    setActiveTab("manage");
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert Deleted",
      description: "The fare alert has been removed",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-irctc-dark-gray">Fare Alerts</h1>
          <p className="text-irctc-medium-gray mt-3 max-w-2xl mx-auto">
            Set up alerts to get notified when train fares drop below your target price
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <Card.Content className="p-6 md:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-2 mb-6">
                  <TabsTrigger value="create" className="text-base flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Alert
                  </TabsTrigger>
                  <TabsTrigger value="manage" className="text-base flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Manage Alerts
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="create">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-6"
                  >
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>How Fare Alerts Work</AlertTitle>
                      <AlertDescription>
                        Set your target fare and we'll notify you when prices drop below that amount for your selected route and date.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {/* From Station */}
                      <motion.div className="relative md:col-span-3" variants={itemVariants}>
                        <Label htmlFor="from-station" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">From Station</Label>
                        <div className="relative">
                          <Input
                            id="from-station"
                            type="text"
                            value={fromStation}
                            onChange={handleFromStationChange}
                            onFocus={() => setShowFromSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                            placeholder="Enter city or station"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                          
                          {showFromSuggestions && (
                            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 animate-slide-down">
                              <div className="p-2">
                                <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                                <div className="max-h-60 overflow-y-auto">
                                  {popularStations.map((station) => (
                                    <div
                                      key={station.code}
                                      className="px-2 py-2 hover:bg-irctc-light-gray rounded-md cursor-pointer transition-colors"
                                      onClick={() => handleStationSelect('from', station)}
                                    >
                                      <div className="font-medium">{station.name}</div>
                                      <div className="text-xs text-irctc-medium-gray">{station.code}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Swap Button */}
                      <motion.div 
                        className="flex items-center justify-center md:col-span-1" 
                        variants={itemVariants}
                      >
                        <div 
                          className="w-10 h-10 flex items-center justify-center bg-irctc-light-gray rounded-full cursor-pointer hover:bg-irctc-light-blue/10 transition-colors"
                          onClick={swapStations}
                        >
                          <ArrowRightLeft className="w-5 h-5 text-irctc-royal-blue" />
                        </div>
                      </motion.div>

                      {/* To Station */}
                      <motion.div className="relative md:col-span-3" variants={itemVariants}>
                        <Label htmlFor="to-station" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">To Station</Label>
                        <div className="relative">
                          <Input
                            id="to-station"
                            type="text"
                            value={toStation}
                            onChange={handleToStationChange}
                            onFocus={() => setShowToSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                            placeholder="Enter city or station"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                          
                          {showToSuggestions && (
                            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 animate-slide-down">
                              <div className="p-2">
                                <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                                <div className="max-h-60 overflow-y-auto">
                                  {popularStations.map((station) => (
                                    <div
                                      key={station.code}
                                      className="px-2 py-2 hover:bg-irctc-light-gray rounded-md cursor-pointer transition-colors"
                                      onClick={() => handleStationSelect('to', station)}
                                    >
                                      <div className="font-medium">{station.name}</div>
                                      <div className="text-xs text-irctc-medium-gray">{station.code}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Class Selection */}
                      <motion.div variants={itemVariants}>
                        <Label htmlFor="class" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">
                          Travel Class
                        </Label>
                        <Select value={travelClass} onValueChange={setTravelClass}>
                          <SelectTrigger id="class" className="w-full">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {trainClasses.map((cls) => (
                              <SelectItem key={cls.value} value={cls.value}>
                                {cls.label} ({cls.value})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Date of Journey */}
                      <motion.div variants={itemVariants}>
                        <Label htmlFor="journey-date" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">
                          Date of Journey
                        </Label>
                        <div className="relative">
                          <Input
                            id="journey-date"
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                          />
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="target-fare" className="block text-sm font-medium text-irctc-medium-gray mb-1.5">
                        Target Fare (₹)
                      </Label>
                      <div className="relative">
                        <Input
                          id="target-fare"
                          type="number"
                          value={targetFare}
                          onChange={(e) => setTargetFare(e.target.value)}
                          placeholder="e.g., 1450"
                          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-irctc-medium-gray">₹</span>
                      </div>
                      <p className="text-xs text-irctc-medium-gray mt-1">
                        You'll receive an alert when the fare drops below this amount
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="border-t border-gray-100 pt-4">
                      <h3 className="font-medium mb-3">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-irctc-medium-gray" />
                            <Label htmlFor="email-notification" className="cursor-pointer">
                              Email Notifications
                            </Label>
                          </div>
                          <Switch 
                            id="email-notification" 
                            checked={emailNotification}
                            onCheckedChange={setEmailNotification}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Smartphone className="w-5 h-5 mr-3 text-irctc-medium-gray" />
                            <Label htmlFor="sms-notification" className="cursor-pointer">
                              SMS Notifications
                            </Label>
                          </div>
                          <Switch 
                            id="sms-notification" 
                            checked={smsNotification}
                            onCheckedChange={setSmsNotification}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center pt-4">
                      <Button 
                        className="bg-irctc-royal-blue hover:bg-irctc-royal-blue/90 flex items-center px-8"
                        onClick={handleCreateAlert}
                      >
                        <BellRing className="mr-2 h-4 w-4" />
                        Create Fare Alert
                      </Button>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="manage">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-6"
                  >
                    {alerts.length === 0 ? (
                      <div className="text-center py-12">
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Bell className="w-10 h-10 text-gray-300" />
                        </motion.div>
                        <h3 className="text-lg font-medium text-irctc-dark-gray mb-2">No Fare Alerts</h3>
                        <p className="text-irctc-medium-gray">
                          You haven't created any fare alerts yet
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setActiveTab("create")}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Alert
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 text-left">
                              <tr>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Route</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Class</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Travel Date</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Target Fare</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Current Fare</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Status</th>
                                <th className="px-4 py-3 text-sm font-medium text-irctc-dark-gray">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {alerts.map((alert, index) => (
                                <motion.tr 
                                  key={alert.id}
                                  variants={itemVariants}
                                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                >
                                  <td className="px-4 py-4">
                                    <div className="font-medium text-sm">{alert.fromStation}</div>
                                    <div className="text-xs text-irctc-medium-gray">to {alert.toStation}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm">{alert.class}</td>
                                  <td className="px-4 py-4 text-sm">
                                    {new Date(alert.travelDate).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </td>
                                  <td className="px-4 py-4 text-sm">{alert.targetFare}</td>
                                  <td className="px-4 py-4 text-sm">
                                    <div className={cn(
                                      "font-medium",
                                      alert.status === 'triggered' ? "text-green-600" : "text-irctc-dark-gray"
                                    )}>
                                      {alert.currentFare}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className={cn(
                                      "px-2 py-1 rounded-full text-xs font-medium",
                                      alert.status === 'active' 
                                        ? "bg-blue-100 text-blue-800" 
                                        : "bg-green-100 text-green-800"
                                    )}>
                                      {alert.status === 'active' ? 'Monitoring' : 'Price Dropped!'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleDeleteAlert(alert.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            className="border-irctc-royal-blue text-irctc-royal-blue hover:bg-irctc-royal-blue/5"
                            onClick={() => setActiveTab("create")}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Alert
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </Card.Content>
          </Card>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Fare Alert FAQs</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">How do fare alerts work?</h4>
                <p className="text-sm text-irctc-medium-gray">
                  Our system continuously monitors fare changes for your selected route and date.
                  When the fare drops below your target price, we'll send you a notification.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">How long do fare alerts stay active?</h4>
                <p className="text-sm text-irctc-medium-gray">
                  Alerts remain active until either the train departs, you book a ticket, or you remove the alert.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I create multiple alerts?</h4>
                <p className="text-sm text-irctc-medium-gray">
                  Yes, you can create alerts for multiple routes, travel dates, and train classes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FareAlert;
