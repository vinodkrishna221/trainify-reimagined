import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, MapPin, Train, Ticket, Bell, BarChart4, Users, Star } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import SearchWidget from '@/components/common/SearchWidget';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import StatusIndicator from '@/components/common/StatusIndicator';

const useAnimateOnScroll = () => {
  const animationRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    animationRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      animationRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (ref: HTMLElement | null) => {
    if (ref) {
      ref.classList.add('animate-on-scroll');
      animationRefs.current.push(ref);
    }
  };
};

const Index = () => {
  const animateRef = useAnimateOnScroll();
  
  const quickLinks = [
    { title: 'Book Ticket', icon: <Ticket className="w-10 h-10 text-irctc-royal-blue" />, href: '/book-train', color: 'bg-blue-50' },
    { title: 'Train Status', icon: <Train className="w-10 h-10 text-irctc-royal-blue" />, href: '/track-train', color: 'bg-blue-50' },
    { title: 'PNR Status', icon: <BarChart4 className="w-10 h-10 text-irctc-light-blue" />, href: '/pnr-status', color: 'bg-indigo-50' },
    { title: 'Fare Alert', icon: <Bell className="w-10 h-10 text-irctc-orange" />, href: '/fare-alert', color: 'bg-orange-50' },
  ];
  
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Frequent Traveler',
      content: 'The new IRCTC Express interface is so intuitive! I can book tickets in less than a minute now. Great improvement!',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      role: 'Business Traveler',
      content: 'Love the new train tracking feature. It\'s accurate and helps me plan my arrivals much better. The notifications are timely too.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
    },
    {
      name: 'Aditya Singh',
      role: 'Family Vacationer',
      content: 'Booking for my family of five used to be tedious, but with the new passenger management system, it\'s effortless. Highly recommend!',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 5,
    },
  ];
  
  const popularDestinations = [
    { name: 'Delhi to Mumbai', image: 'https://images.unsplash.com/photo-1579840881689-3926db2983da?ixlib=rb-4.0.3&q=85&w=500&h=350&crop=center', trains: '42+ trains', time: '16h 35m avg' },
    { name: 'Bengaluru to Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&q=85&w=500&h=350&crop=center', trains: '23+ trains', time: '6h 15m avg' },
    { name: 'Kolkata to Delhi', image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&q=85&w=500&h=350&crop=center', trains: '19+ trains', time: '20h 45m avg' },
  ];
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] pt-16 pb-24 flex items-center hero-gradient">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70" />
          <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&q=85&w=1920&h=1080&crop=center')] bg-cover bg-center opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 lg:ml-0 ml-auto mr-auto">
              <SearchWidget />
            </div>
            
            <div className="lg:col-span-7">
              <span className="inline-block mb-3 px-3 py-1 bg-irctc-royal-blue/10 text-irctc-royal-blue text-sm font-medium rounded-full">
                India's #1 Rail Booking Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Travel Smart with <span className="text-irctc-royal-blue">IRCTC Express</span>
              </h1>
              <p className="text-lg text-irctc-medium-gray mb-8 text-balance">
                Book train tickets effortlessly, track journeys in real-time, and enjoy seamless travel experiences with India's most trusted railway platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Book Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" ref={animateRef}>
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Access essential services with a single click and get moving faster
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link to={link.href} key={index}>
                <Card 
                  interactive
                  className="text-center p-6 h-full transition-transform hover:scale-105"
                  ref={animateRef}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${link.color}`}>
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-irctc-medium-gray">Access quickly</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Indicators Section */}
      <section className="py-16 bg-irctc-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" ref={animateRef}>
            <h2 className="text-3xl font-bold mb-4">Why Choose IRCTC Express</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Reliable, efficient, and designed with your convenience in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border border-gray-100" ref={animateRef}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-irctc-royal-blue/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-irctc-royal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast & Efficient</h3>
                <p className="text-irctc-medium-gray">
                  Book tickets in under 60 seconds with our streamlined booking process and intelligent recommendations.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 border border-gray-100" ref={animateRef}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-irctc-orange/10 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-irctc-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                <p className="text-irctc-medium-gray">
                  Industry-leading security measures ensure your payment information is always safe and protected.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 border border-gray-100" ref={animateRef}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-irctc-light-blue/10 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-irctc-light-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
                <p className="text-irctc-medium-gray">
                  Stay informed with accurate real-time train tracking and timely notifications about your journey.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="mt-16 text-center" ref={animateRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-irctc-royal-blue mb-2">99.8%</div>
                <p className="text-irctc-medium-gray">Booking Success Rate</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-irctc-royal-blue mb-2">10M+</div>
                <p className="text-irctc-medium-gray">Monthly Active Users</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-irctc-royal-blue mb-2">5,000+</div>
                <p className="text-irctc-medium-gray">Trains Covered</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-irctc-royal-blue mb-2">7,500+</div>
                <p className="text-irctc-medium-gray">Stations Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div ref={animateRef}>
              <h2 className="text-3xl font-bold mb-3">Popular Routes</h2>
              <p className="text-irctc-medium-gray max-w-2xl">
                Discover the most traveled train routes across India
              </p>
            </div>
            
            <Link to="/all-routes" className="mt-4 md:mt-0 inline-flex items-center text-irctc-royal-blue font-medium">
              View All Routes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card 
                key={index} 
                interactive 
                className="overflow-hidden"
                ref={animateRef}
              >
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                    </div>
                  </div>
                </div>
                <Card.Content className="flex justify-between items-center">
                  <div>
                    <StatusIndicator type="success" showDot>
                      {destination.trains}
                    </StatusIndicator>
                  </div>
                  <div className="text-irctc-medium-gray text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {destination.time}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-irctc-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" ref={animateRef}>
            <h2 className="text-3xl font-bold mb-4">What Travelers Say</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Hear from our satisfied users about their experiences with IRCTC Express
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="h-full"
                ref={animateRef}
              >
                <Card.Content className="p-6">
                  <div className="flex items-start mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-irctc-medium-gray">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4 italic text-irctc-dark-gray">"{testimonial.content}"</p>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-irctc-orange fill-irctc-orange' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-irctc-royal-blue text-white">
        <div className="container mx-auto px-4 text-center" ref={animateRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to Experience Smarter Rail Travel?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join millions of satisfied travelers who use IRCTC Express for their railway booking needs.
            Download our app today for an even better experience on the go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px]"
            >
              Download App
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10 min-w-[200px]"
            >
              Book Your First Trip
            </Button>
          </div>
        </div>
      </section>
      
      {/* App Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1" ref={animateRef}>
              <span className="inline-block mb-3 px-3 py-1 bg-irctc-light-blue/10 text-irctc-light-blue text-sm font-medium rounded-full">
                Mobile Experience
              </span>
              <h2 className="text-3xl font-bold mb-6">
                Take IRCTC Express Wherever You Go
              </h2>
              <p className="text-irctc-medium-gray mb-8">
                Our mobile apps for iOS and Android provide a complete booking experience with additional features designed specifically for on-the-go travelers.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-irctc-light-gray p-1 rounded-full mr-3 mt-1">
                    <Shield className="w-4 h-4 text-irctc-royal-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Offline Ticket Access</h4>
                    <p className="text-irctc-medium-gray text-sm">Access your tickets even without an internet connection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-irctc-light-gray p-1 rounded-full mr-3 mt-1">
                    <Bell className="w-4 h-4 text-irctc-royal-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Notifications</h4>
                    <p className="text-irctc-medium-gray text-sm">Get timely updates about your journey, platform changes, and delays</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-irctc-light-gray p-1 rounded-full mr-3 mt-1">
                    <Users className="w-4 h-4 text-irctc-royal-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Traveler Profiles</h4>
                    <p className="text-irctc-medium-gray text-sm">Save passenger details for quick booking in the future</p>
                  </div>
                </li>
              </ul>
              <Button variant="primary">
                Download Now
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center" ref={animateRef}>
              <div className="relative max-w-[300px]">
                <div className="absolute -top-6 -left-6 w-full h-full bg-irctc-royal-blue rounded-3xl transform -rotate-6"></div>
                <img 
                  src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&q=85&w=600&h=900&crop=center" 
                  alt="IRCTC Express Mobile App" 
                  className="relative z-10 w-full h-auto rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
