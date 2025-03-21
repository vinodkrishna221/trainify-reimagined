
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, CreditCard, TicketCheck, MapPin, Calendar, 
  Clock, ChevronRight, BellRing, LogOut, Train, Plane, Building,
  ShieldCheck, Star, TrendingUp, ChevronDown, Plus, X
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import StatusIndicator from '@/components/common/StatusIndicator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Dashboard = () => {
  const [openSections, setOpenSections] = useState({
    upcomingTrips: true,
    recentActivity: false,
    notifications: true,
    quickStats: true,
    recommendations: false
  });

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section as keyof typeof openSections]
    });
  };

  const upcomingTrips = [
    {
      id: 1,
      type: 'train',
      title: 'New Delhi to Mumbai',
      date: 'Jul 22, 2023',
      time: '16:35',
      status: 'confirmed',
      details: 'Rajdhani Express • 12952 • 2A',
      pnr: '2541267890',
    },
    {
      id: 2,
      type: 'flight',
      title: 'Bengaluru to Chennai',
      date: 'Aug 05, 2023',
      time: '10:15',
      status: 'confirmed',
      details: 'IndiGo • 6E-345 • Economy',
      pnr: '6E7X2Z',
    },
    {
      id: 3,
      type: 'hotel',
      title: 'Taj Lake Palace, Udaipur',
      date: 'Aug 12-15, 2023',
      time: '14:00',
      status: 'confirmed',
      details: 'Deluxe Room • 2 Adults',
      pnr: 'HOTEL87652',
    },
  ];
  
  const recentBookings = [
    {
      id: 1,
      type: 'train',
      title: 'Kolkata to Patna',
      date: 'Jun 18, 2023',
      amount: '₹1,245',
      status: 'completed',
    },
    {
      id: 2,
      type: 'flight',
      title: 'Mumbai to Delhi',
      date: 'Jun 10, 2023',
      amount: '₹4,580',
      status: 'completed',
    },
    {
      id: 3,
      type: 'hotel',
      title: 'Grand Hyatt, Mumbai',
      date: 'May 25-27, 2023',
      amount: '₹18,500',
      status: 'completed',
    },
    {
      id: 4,
      type: 'train',
      title: 'Chennai to Coimbatore',
      date: 'May 15, 2023',
      amount: '₹825',
      status: 'cancelled',
    },
  ];
  
  const notifications = [
    {
      id: 1,
      title: 'PNR Status Update',
      message: 'Your PNR 2541267890 is now confirmed with berth allocation.',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Special Offer',
      message: 'Get 15% off on your next hotel booking until July 30.',
      time: '1 day ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Payment Confirmation',
      message: 'Payment of ₹4,580 for Mumbai-Delhi flight successfully processed.',
      time: '3 days ago',
      isRead: true,
    },
    {
      id: 4,
      title: 'Trip Reminder',
      message: 'Your trip to Mumbai is scheduled in 2 days. Get ready!',
      time: '3 days ago',
      isRead: true,
    },
  ];
  
  const quickStats = [
    {
      title: 'Total Bookings',
      value: '24',
      icon: <TicketCheck className="h-5 w-5 text-blue-600" />,
      change: '+4 this month',
      color: 'bg-blue-50',
    },
    {
      title: 'Loyalty Points',
      value: '1,250',
      icon: <Star className="h-5 w-5 text-amber-600" />,
      change: 'Silver Tier',
      color: 'bg-amber-50',
    },
    {
      title: 'Saved Amount',
      value: '₹5,840',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      change: 'Using IRCTC Express',
      color: 'bg-green-50',
    },
    {
      title: 'Account Status',
      value: 'Verified',
      icon: <ShieldCheck className="h-5 w-5 text-purple-600" />,
      change: 'All KYC complete',
      color: 'bg-purple-50',
    },
  ];

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const getIconForTripType = (type: string) => {
    switch (type) {
      case 'train':
        return <Train className="h-5 w-5 text-irctc-royal-blue" />;
      case 'flight':
        return <Plane className="h-5 w-5 text-indigo-600" />;
      case 'hotel':
        return <Building className="h-5 w-5 text-purple-600" />;
      default:
        return <TicketCheck className="h-5 w-5 text-irctc-royal-blue" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout>
      {/* Hero Section with User Welcome */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 pt-10 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-6 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Rahul!</h1>
              <p className="text-white/80 text-sm md:text-base">
                Manage your bookings, track trips, and discover personalized recommendations.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Profile</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-600 rounded-full p-3">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-xl font-semibold">Rahul Sharma</h3>
                          <p className="text-gray-500 text-sm">rahul.s@example.com</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Profile Completion</span>
                            <span>80%</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-4 h-4 mr-2" /> 
                          Account Settings
                        </Button>
                        <Button size="sm" className="w-full">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="travelers">
                        <AccordionTrigger className="text-sm font-medium">
                          Saved Travelers
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Rahul Sharma (You)</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Priya Sharma</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              <Plus className="h-3 w-3 mr-1" /> Add Traveler
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="payment">
                        <AccordionTrigger className="text-sm font-medium">
                          Saved Payment Methods
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                <span>•••• •••• •••• 4523</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              <Plus className="h-3 w-3 mr-1" /> Add Payment Method
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="preferences">
                        <AccordionTrigger className="text-sm font-medium">
                          Travel Preferences
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span>Preferred Seat Type</span>
                              <span className="text-blue-600">Window</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Meal Preference</span>
                              <span className="text-blue-600">Vegetarian</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Travel Class</span>
                              <span className="text-blue-600">AC 2 Tier</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-1">
                              Edit Preferences
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-white/90">
                <TicketCheck className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Content - Reorganized with Collapsible Sections */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Quick Stats Section */}
          <Collapsible 
            open={openSections.quickStats} 
            onOpenChange={() => toggleSection('quickStats')}
            className="mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quick Stats</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.quickStats ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {quickStats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mr-3`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{stat.title}</div>
                          <div className="text-xl font-bold">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.change}</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Upcoming Trips */}
            <div className="lg:col-span-2">
              {/* Upcoming Trips Section */}
              <Collapsible 
                open={openSections.upcomingTrips} 
                onOpenChange={() => toggleSection('upcomingTrips')}
                className="mb-6"
              >
                <Card className="overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Upcoming Trips
                    </h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          {openSections.upcomingTrips ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="divide-y">
                      {upcomingTrips.length > 0 ? (
                        upcomingTrips.map((trip) => (
                          <motion.div 
                            key={trip.id}
                            whileHover={{ scale: 1.01 }}
                            className="p-4 hover:bg-gray-50 transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start">
                                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                  {getIconForTripType(trip.type)}
                                </div>
                                <div>
                                  <div className="font-medium">{trip.title}</div>
                                  <div className="text-xs text-gray-500">{trip.details}</div>
                                  <div className="mt-1 flex items-center text-xs">
                                    <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                                    <span className="mr-3">{trip.date}</span>
                                    <Clock className="w-3 h-3 mr-1 text-gray-400" />
                                    <span>{trip.time}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <StatusIndicator type={getStatusColor(trip.status)} showDot size="sm">
                                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                                </StatusIndicator>
                                <div className="mt-1 text-xs text-gray-500">
                                  PNR: {trip.pnr}
                                </div>
                                <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                                  View
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <div className="text-gray-400 mb-2 text-sm">No upcoming trips</div>
                          <Button variant="outline" size="sm">
                            Book a Trip
                          </Button>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
              
              {/* Recent Activity Section */}
              <Collapsible 
                open={openSections.recentActivity} 
                onOpenChange={() => toggleSection('recentActivity')}
                className="mb-6"
              >
                <Card className="overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Recent Activity</h2>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        {openSections.recentActivity ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="p-4">
                      <Tabs defaultValue="bookings" className="w-full">
                        <TabsList className="mb-4 w-full justify-start">
                          <TabsTrigger value="bookings" className="text-xs">Recent Bookings</TabsTrigger>
                          <TabsTrigger value="searches" className="text-xs">Recent Searches</TabsTrigger>
                          <TabsTrigger value="payments" className="text-xs">Payment History</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="bookings" className="mt-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Booking</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {recentBookings.map((booking) => (
                                <TableRow key={booking.id} className="cursor-pointer hover:bg-gray-50">
                                  <TableCell>
                                    <div className="flex items-center">
                                      <div className="bg-gray-100 p-1.5 rounded-md mr-2">
                                        {getIconForTripType(booking.type)}
                                      </div>
                                      <span className="text-sm font-medium">{booking.title}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm">{booking.date}</TableCell>
                                  <TableCell className="text-sm font-medium">{booking.amount}</TableCell>
                                  <TableCell>
                                    <StatusIndicator 
                                      type={getStatusColor(booking.status)} 
                                      showDot 
                                      size="sm"
                                    >
                                      {booking.status}
                                    </StatusIndicator>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TabsContent>
                        
                        <TabsContent value="searches" className="mt-0">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                              <div className="flex items-center">
                                <div className="bg-white p-1.5 rounded-md mr-2">
                                  <Train className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Delhi to Mumbai</div>
                                  <div className="text-xs text-gray-500">Jul 15, 2023</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                Search Again
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                              <div className="flex items-center">
                                <div className="bg-white p-1.5 rounded-md mr-2">
                                  <Plane className="h-4 w-4 text-indigo-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Bengaluru to Hyderabad</div>
                                  <div className="text-xs text-gray-500">Aug 22, 2023</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                Search Again
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="payments" className="mt-0">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-white p-1.5 rounded-md mr-2">
                                  <CreditCard className="h-4 w-4 text-gray-700" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Flight Booking Payment</div>
                                  <div className="text-xs text-gray-500">Jun 28, 2023</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">₹4,580</div>
                                <div className="text-xs text-green-600">Successful</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-white p-1.5 rounded-md mr-2">
                                  <CreditCard className="h-4 w-4 text-gray-700" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Train Ticket Payment</div>
                                  <div className="text-xs text-gray-500">Jun 18, 2023</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">₹1,245</div>
                                <div className="text-xs text-green-600">Successful</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
              
              {/* Recommended Trips Section */}
              <Collapsible 
                open={openSections.recommendations} 
                onOpenChange={() => toggleSection('recommendations')}
              >
                <Card className="overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Recommended For You</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          {openSections.recommendations ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="overflow-hidden h-full flex flex-col border-none shadow-sm">
                          <div className="h-32 w-full">
                            <img 
                              src="https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                              alt="Kolkata" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 flex-grow">
                            <h3 className="font-semibold text-base">Kolkata to Delhi</h3>
                            <p className="text-xs text-gray-500 mb-2">Based on your previous trips</p>
                            <div className="flex items-center text-xs text-gray-700 mb-1">
                              <Train className="h-3 w-3 mr-1 text-blue-600" />
                              <span>Rajdhani Express • 20h 45m</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-700">
                              <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                              <span>Available next week</span>
                            </div>
                          </div>
                          <div className="p-3 pt-0 mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-base font-bold text-blue-600">₹2,345</div>
                              <StatusIndicator type="success" showDot size="sm">
                                Available
                              </StatusIndicator>
                            </div>
                            <Button size="sm" className="w-full h-8 text-xs">
                              Book Now
                            </Button>
                          </div>
                        </Card>
                        
                        <Card className="overflow-hidden h-full flex flex-col border-none shadow-sm">
                          <div className="h-32 w-full">
                            <img 
                              src="https://images.unsplash.com/photo-1586183189334-0589346aedbb?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                              alt="Jaipur" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 flex-grow">
                            <h3 className="font-semibold text-base">Weekend in Jaipur</h3>
                            <p className="text-xs text-gray-500 mb-2">Special package for you</p>
                            <div className="flex items-center text-xs text-gray-700 mb-1">
                              <Train className="h-3 w-3 mr-1 text-blue-600" />
                              <span>Delhi to Jaipur • 4h 30m</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-700">
                              <Building className="h-3 w-3 mr-1 text-purple-600" />
                              <span>2 Nights at Royal Palace Hotel</span>
                            </div>
                          </div>
                          <div className="p-3 pt-0 mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-base font-bold text-blue-600">₹12,999</div>
                              <StatusIndicator type="warning" showDot size="sm">
                                Limited
                              </StatusIndicator>
                            </div>
                            <Button size="sm" className="w-full h-8 text-xs">
                              View Package
                            </Button>
                          </div>
                        </Card>
                        
                        <Card className="overflow-hidden h-full flex flex-col border-none shadow-sm">
                          <div className="h-32 w-full">
                            <img 
                              src="https://images.unsplash.com/photo-1596422846543-75c6fc197825?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                              alt="Bengaluru" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 flex-grow">
                            <h3 className="font-semibold text-base">Flights to Bengaluru</h3>
                            <p className="text-xs text-gray-500 mb-2">Special discount this month</p>
                            <div className="flex items-center text-xs text-gray-700 mb-1">
                              <Plane className="h-3 w-3 mr-1 text-indigo-600" />
                              <span>Delhi to Bengaluru • 2h 45m</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-700">
                              <Calendar className="h-3 w-3 mr-1 text-indigo-600" />
                              <span>Multiple dates available</span>
                            </div>
                          </div>
                          <div className="p-3 pt-0 mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-base font-bold text-blue-600">₹4,799</div>
                              <StatusIndicator type="success" showDot size="sm">
                                15% Off
                              </StatusIndicator>
                            </div>
                            <Button size="sm" className="w-full h-8 text-xs">
                              Book Flight
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </div>
            
            {/* Right Column - Notifications & Frequent Routes */}
            <div className="space-y-6">
              {/* Notifications Section */}
              <Collapsible 
                open={openSections.notifications} 
                onOpenChange={() => toggleSection('notifications')}
              >
                <Card className="overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center">
                      <BellRing className="w-5 h-5 mr-2 text-blue-600" />
                      Notifications
                    </h2>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Mark All Read
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          {openSections.notifications ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="max-h-[450px] overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-l-4 ${notification.isRead ? 'border-gray-200 bg-white' : 'border-blue-600 bg-blue-50'} border-b`}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium text-sm mb-1">{notification.title}</div>
                            {!notification.isRead && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                          <div className="text-xs text-gray-500">{notification.time}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t">
                      <Button variant="ghost" size="sm">
                        View All Notifications
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
              
              {/* Frequent Routes Card */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Frequent Routes
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">Delhi → Mumbai</div>
                      <div className="text-xs text-gray-500">5 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Train className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">Delhi → Bengaluru</div>
                      <div className="text-xs text-gray-500">3 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Plane className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">Mumbai → Pune</div>
                      <div className="text-xs text-gray-500">2 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Train className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Routes
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
