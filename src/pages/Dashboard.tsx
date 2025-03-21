
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, CreditCard, TicketCheck, MapPin, Calendar, 
  Clock, ChevronRight, BellRing, LogOut, Train, Plane, Building,
  ShieldCheck, Star, TrendingUp
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import StatusIndicator from '@/components/common/StatusIndicator';

const Dashboard = () => {
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

  // Particle animation container reference
  const particlesRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <MainLayout>
      {/* Hero Section with User Welcome */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, Rahul!</h1>
              <p className="text-white/80">
                Manage your bookings, track trips, and discover personalized travel recommendations.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        
        {/* Particle animation container */}
        <div 
          ref={particlesRef} 
          className="absolute inset-0 z-0 overflow-hidden"
          id="tsparticles"
        ></div>
      </section>
      
      {/* Quick Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickStats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-5">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{stat.title}</div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.change}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upcoming Trips */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-irctc-royal-blue" />
                    Upcoming Trips
                  </h2>
                  <Button variant="outline" size="sm">
                    View All Trips
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingTrips.length > 0 ? (
                    upcomingTrips.map((trip) => (
                      <motion.div 
                        key={trip.id}
                        whileHover={{ scale: 1.01 }}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="bg-gray-100 p-3 rounded-lg mr-4">
                              {getIconForTripType(trip.type)}
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{trip.title}</div>
                              <div className="text-sm text-gray-500">{trip.details}</div>
                              <div className="mt-2 flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                <span className="mr-4">{trip.date}</span>
                                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                <span>{trip.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <StatusIndicator type={getStatusColor(trip.status)} showDot>
                              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                            </StatusIndicator>
                            <div className="mt-2 text-sm text-gray-500">
                              PNR: {trip.pnr}
                            </div>
                            <Button variant="ghost" size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">No upcoming trips</div>
                      <Button variant="outline" size="sm">
                        Book a Trip
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
              
              {/* Tabs Section for Recent Activity */}
              <Card className="p-6 mt-8">
                <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                
                <Tabs defaultValue="bookings">
                  <TabsList className="mb-4">
                    <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
                    <TabsTrigger value="searches">Recent Searches</TabsTrigger>
                    <TabsTrigger value="payments">Payment History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bookings" className="mt-0">
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border-b last:border-0">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                              {getIconForTripType(booking.type)}
                            </div>
                            <div>
                              <div className="font-medium">{booking.title}</div>
                              <div className="text-sm text-gray-500">{booking.date}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="text-right mr-4">
                              <div className="font-medium">{booking.amount}</div>
                              <StatusIndicator 
                                type={getStatusColor(booking.status)} 
                                showDot 
                                size="sm"
                              >
                                {booking.status}
                              </StatusIndicator>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="searches" className="mt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <Train className="h-5 w-5 text-irctc-royal-blue" />
                          </div>
                          <div>
                            <div className="font-medium">Delhi to Mumbai</div>
                            <div className="text-sm text-gray-500">Jul 15, 2023</div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Search Again
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <Plane className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium">Bengaluru to Hyderabad</div>
                            <div className="text-sm text-gray-500">Aug 22, 2023</div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Search Again
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <Building className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Hotels in Udaipur</div>
                            <div className="text-sm text-gray-500">Aug 12-15, 2023</div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Search Again
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payments" className="mt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <CreditCard className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="font-medium">Flight Booking Payment</div>
                            <div className="text-sm text-gray-500">Jun 28, 2023</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">₹4,580</div>
                          <div className="text-xs text-green-600">Successful</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <CreditCard className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="font-medium">Train Ticket Payment</div>
                            <div className="text-sm text-gray-500">Jun 18, 2023</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">₹1,245</div>
                          <div className="text-xs text-green-600">Successful</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <CreditCard className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="font-medium">Hotel Booking Payment</div>
                            <div className="text-sm text-gray-500">May 25, 2023</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">₹18,500</div>
                          <div className="text-xs text-green-600">Successful</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            {/* Right Column - User Info & Notifications */}
            <div className="space-y-8">
              {/* User Profile Card */}
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-irctc-royal-blue p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Rahul Sharma</h3>
                    <p className="text-gray-500">rahul.s@example.com</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profile Completion</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium">Saved Travelers</div>
                      <Button variant="ghost" size="sm">
                        Add New
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
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
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium">Saved Payment Methods</div>
                      <Button variant="ghost" size="sm">
                        Add New
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                          <span>•••• •••• •••• 4523</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Profile
                  </Button>
                </div>
              </Card>
              
              {/* Notifications Card */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <BellRing className="w-5 h-5 mr-2 text-irctc-royal-blue" />
                    Notifications
                  </h3>
                  <Button variant="ghost" size="sm">
                    Mark All As Read
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-l-4 rounded-sm ${notification.isRead ? 'border-gray-200 bg-gray-50' : 'border-irctc-royal-blue bg-blue-50'}`}
                    >
                      <div className="font-medium mb-1">{notification.title}</div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="text-xs text-gray-500">{notification.time}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm">
                    View All Notifications
                  </Button>
                </div>
              </Card>
              
              {/* Saved Locations */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold flex items-center mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-irctc-royal-blue" />
                  Frequent Routes
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium">Delhi → Mumbai</div>
                      <div className="text-xs text-gray-500">5 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Train className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium">Delhi → Bengaluru</div>
                      <div className="text-xs text-gray-500">3 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plane className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                    <div>
                      <div className="font-medium">Mumbai → Pune</div>
                      <div className="text-xs text-gray-500">2 times in last 6 months</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Train className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Trips Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recommended For You</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-40 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                  alt="Kolkata" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1">Kolkata to Delhi</h3>
                <p className="text-sm text-gray-500 mb-3">Based on your previous trips</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Train className="h-4 w-4 mr-2 text-irctc-royal-blue" />
                  <span>Rajdhani Express • 20h 45m</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-irctc-royal-blue" />
                  <span>Available next week</span>
                </div>
              </div>
              <div className="p-4 pt-0 mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-lg font-bold text-irctc-royal-blue">₹2,345</div>
                  <StatusIndicator type="success" showDot>
                    Seats Available
                  </StatusIndicator>
                </div>
                <Button className="w-full">
                  Book Now
                </Button>
              </div>
            </Card>
            
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-40 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1586183189334-0589346aedbb?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                  alt="Jaipur" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1">Weekend in Jaipur</h3>
                <p className="text-sm text-gray-500 mb-3">Special package for you</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Train className="h-4 w-4 mr-2 text-irctc-royal-blue" />
                  <span>Delhi to Jaipur • 4h 30m</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Building className="h-4 w-4 mr-2 text-purple-600" />
                  <span>2 Nights at Royal Palace Hotel</span>
                </div>
              </div>
              <div className="p-4 pt-0 mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-lg font-bold text-irctc-royal-blue">₹12,999</div>
                  <StatusIndicator type="warning" showDot>
                    Limited Offer
                  </StatusIndicator>
                </div>
                <Button className="w-full">
                  View Package
                </Button>
              </div>
            </Card>
            
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-40 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1596422846543-75c6fc197825?ixlib=rb-4.0.3&q=85&w=400&h=200&crop=center" 
                  alt="Bengaluru" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1">Flights to Bengaluru</h3>
                <p className="text-sm text-gray-500 mb-3">Special discount this month</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Plane className="h-4 w-4 mr-2 text-indigo-600" />
                  <span>Delhi to Bengaluru • 2h 45m</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                  <span>Multiple dates available</span>
                </div>
              </div>
              <div className="p-4 pt-0 mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-lg font-bold text-irctc-royal-blue">₹4,799</div>
                  <StatusIndicator type="success" showDot>
                    15% Off
                  </StatusIndicator>
                </div>
                <Button className="w-full">
                  Book Flight
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
