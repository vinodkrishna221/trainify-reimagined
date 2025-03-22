import React from 'react';
import { Package, MapPin, Calendar, Users, Clock, Bookmark, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ParticleBackground from '@/components/common/ParticleBackground';

const HolidayPackages = () => {
  const holidayPackages = [
    {
      id: 1,
      title: 'Golden Triangle Tour',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'Delhi - Agra - Jaipur',
      duration: '6 Days / 5 Nights',
      price: '₹25,999',
      rating: 4.7,
      reviewCount: 235,
      featured: true,
    },
    {
      id: 2,
      title: 'Kerala Backwaters',
      image: 'https://images.unsplash.com/photo-1580289152210-61f54d0fb9a9?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'Kochi - Munnar - Alleppey - Kovalam',
      duration: '8 Days / 7 Nights',
      price: '₹32,499',
      rating: 4.8,
      reviewCount: 189,
      featured: true,
    },
    {
      id: 3,
      title: 'Darjeeling & Sikkim Tour',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'Darjeeling - Gangtok - Pelling',
      duration: '7 Days / 6 Nights',
      price: '₹27,999',
      rating: 4.6,
      reviewCount: 142,
      featured: false,
    },
    {
      id: 4,
      title: 'Rajasthan Heritage Tour',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'Jaipur - Jodhpur - Udaipur - Jaisalmer',
      duration: '10 Days / 9 Nights',
      price: '₹38,499',
      rating: 4.9,
      reviewCount: 267,
      featured: false,
    },
    {
      id: 5,
      title: 'Himachal Adventure',
      image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'Shimla - Manali - Dharamshala',
      duration: '9 Days / 8 Nights',
      price: '₹29,999',
      rating: 4.5,
      reviewCount: 173,
      featured: false,
    },
    {
      id: 6,
      title: 'Goa Beach Vacation',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&q=85&w=800&h=400&crop=center',
      destinations: 'North Goa - South Goa',
      duration: '5 Days / 4 Nights',
      price: '₹18,999',
      rating: 4.7,
      reviewCount: 198,
      featured: false,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover India with Our Holiday Packages</h1>
            <p className="text-xl text-white/90 mb-8">
              Handcrafted travel experiences with the comfort of Indian Railways
            </p>
            <Button 
              variant="accent" 
              size="lg" 
              className="font-medium"
            >
              <Package className="w-5 h-5 mr-2" /> 
              Explore Packages
            </Button>
          </div>
        </div>
        
        {/* Background image instead of particle effect */}
        <ParticleBackground 
          className="absolute inset-0 z-0" 
          imageSrc="/lovable-uploads/a9222fa6-6a69-47ad-a9d6-43a91658ef38.png"
        />
      </section>
      
      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Featured Holiday Packages</h2>
              <p className="text-irctc-medium-gray max-w-2xl">
                Curated holiday experiences with train travel, accommodations, and guided tours
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button variant="outline">
                View All Packages
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {holidayPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={itemVariants}>
                <Card interactive className="h-full overflow-hidden flex flex-col">
                  <div className="relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-60 object-cover"
                    />
                    {pkg.featured && (
                      <div className="absolute top-4 left-4 bg-irctc-orange text-white text-sm font-medium px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>
                    
                    <div className="flex items-center text-irctc-medium-gray mb-3">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{pkg.destinations}</span>
                    </div>
                    
                    <div className="flex items-center text-irctc-medium-gray mb-5">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-irctc-royal-blue">
                          {pkg.price}
                        </div>
                        <div className="text-xs text-irctc-medium-gray">per person</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★</div>
                        <div className="text-sm font-medium">
                          {pkg.rating} <span className="text-irctc-medium-gray">({pkg.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <Button variant="primary" className="w-full">View Details</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-irctc-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Holiday Packages?</h2>
            <p className="text-irctc-medium-gray max-w-3xl mx-auto">
              Experience the best of India with our carefully crafted packages that combine the comfort
              of rail travel with premium accommodations and expert guides
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-8 h-8 text-irctc-royal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Train Travel Included</h3>
                <p className="text-irctc-medium-gray">
                  All packages include confirmed train tickets in your choice of class, with the option to upgrade
                </p>
              </div>
            </Card>
            
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Local Guides</h3>
                <p className="text-irctc-medium-gray">
                  Knowledgeable guides who bring destinations to life with insights and stories you won't find elsewhere
                </p>
              </div>
            </Card>
            
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Bookmark className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Value for Money</h3>
                <p className="text-irctc-medium-gray">
                  Our packages offer competitive pricing with no hidden fees, and include accommodations, meals, and activities
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-irctc-royal-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Best of India?
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Choose from our curated holiday packages or let us create a custom itinerary just for you.
            Our travel experts are ready to help you plan the perfect vacation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px]"
            >
              Browse Packages
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10 min-w-[200px]"
            >
              Contact a Travel Expert
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HolidayPackages;
