
import React from 'react';
import { CreditCard, Award, Gift, ArrowRight, BarChart, Users, Medal } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';
import ParticleBackground from '@/components/common/ParticleBackground';

const LoyaltyProgram = () => {
  const tiers = [
    {
      name: 'Silver',
      points: '0-1000',
      color: 'bg-gray-200',
      textColor: 'text-gray-700',
      benefits: [
        'Earn 5 points per ₹100 spent',
        'Priority customer support',
        'Special birthday offers',
        'Exclusive newsletter',
      ],
    },
    {
      name: 'Gold',
      points: '1001-5000',
      color: 'bg-amber-100',
      textColor: 'text-amber-700',
      benefits: [
        'Earn 8 points per ₹100 spent',
        'Free cancellation (1 per quarter)',
        'Priority waitlist clearing',
        'Lounge access at major stations',
        '10% discount on meals',
      ],
      highlight: true,
    },
    {
      name: 'Platinum',
      points: '5001+',
      color: 'bg-slate-800',
      textColor: 'text-white',
      benefits: [
        'Earn 12 points per ₹100 spent',
        'Free cancellation (unlimited)',
        'Premium lounge access',
        'Guaranteed seat on waitlist',
        'Free meal upgrades',
        'Dedicated relationship manager',
      ],
    },
  ];

  const redeemOptions = [
    {
      title: 'Free Train Tickets',
      points: '2500 points',
      icon: <Ticket className="w-8 h-8 text-irctc-royal-blue" />,
    },
    {
      title: 'Upgrade to Higher Class',
      points: '1500 points',
      icon: <ArrowUpCircle className="w-8 h-8 text-irctc-light-blue" />,
    },
    {
      title: 'Hotel Discounts',
      points: '1000 points',
      icon: <Hotel className="w-8 h-8 text-green-600" />,
    },
    {
      title: 'Food & Beverage Vouchers',
      points: '800 points',
      icon: <Coffee className="w-8 h-8 text-amber-600" />,
    },
    {
      title: 'Airport Lounge Access',
      points: '2000 points',
      icon: <Plane className="w-8 h-8 text-purple-600" />,
    },
    {
      title: 'Travel Merchandise',
      points: '1200 points',
      icon: <ShoppingBag className="w-8 h-8 text-pink-600" />,
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <CreditCard className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IRCTC Rewards Program</h1>
            <p className="text-xl text-white/90 mb-8">
              Earn points on every journey and redeem them for exciting travel benefits
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent" size="lg" className="font-medium">
                Join Now
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        <ParticleBackground 
          className="absolute inset-0 z-0" 
          imageSrc="/lovable-uploads/4194f5fd-a313-4825-a13e-b059b89237cd.png"
        />
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Our loyalty program rewards you every time you travel with IRCTC, with points that can be redeemed for a variety of benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-irctc-royal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Earn Points</h3>
                <p className="text-irctc-medium-gray">
                  Earn points every time you book a ticket with IRCTC. The more you travel, the more you earn.
                </p>
              </div>
            </Card>
            
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Climb Tiers</h3>
                <p className="text-irctc-medium-gray">
                  Progress through Silver, Gold, and Platinum tiers as you accumulate points, unlocking enhanced benefits.
                </p>
              </div>
            </Card>
            
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Gift className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Redeem Rewards</h3>
                <p className="text-irctc-medium-gray">
                  Use your points for free tickets, upgrades, hotel discounts, and more exclusive benefits.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="py-16 bg-irctc-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Unlock exclusive benefits as you progress through our membership tiers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-8 border ${tier.highlight ? 'border-amber-400 shadow-lg' : 'border-gray-200'}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mb-6`}>
                    <Medal className={`w-8 h-8 ${tier.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-irctc-medium-gray mb-6">{tier.points} points</p>
                  
                  {tier.highlight && (
                    <div className="bg-amber-100 text-amber-800 text-sm font-medium px-4 py-1 rounded-full mb-6">
                      Most Popular
                    </div>
                  )}
                  
                  <ul className="space-y-3 text-left">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-irctc-royal-blue mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Redeem Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Redeem Your Points</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Turn your loyalty points into valuable travel experiences and perks
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {redeemOptions.map((option, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-irctc-light-gray p-4 rounded-lg mr-4">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                    <p className="text-irctc-medium-gray">{option.points}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="default" size="lg">
              View All Redemption Options
            </Button>
          </div>
        </div>
      </section>
      
      {/* Member Stories */}
      <section className="py-16 bg-irctc-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Member Success Stories</h2>
            <p className="text-irctc-medium-gray max-w-2xl mx-auto">
              Hear from our members about their experience with the IRCTC Rewards Program
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Vikram Mehta" 
                  className="w-24 h-24 rounded-full mb-6 md:mb-0 md:mr-6"
                />
                <div>
                  <div className="text-amber-400 flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="italic text-irctc-dark-gray mb-4">
                    "I've been a Platinum member for two years now. The free cancellations and guaranteed seat on waitlist have saved me countless times during business travel emergencies."
                  </p>
                  <div>
                    <h4 className="font-semibold">Vikram Mehta</h4>
                    <p className="text-sm text-irctc-medium-gray">Platinum Member, Business Traveler</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <img 
                  src="https://randomuser.me/api/portraits/women/54.jpg" 
                  alt="Sonia Gupta" 
                  className="w-24 h-24 rounded-full mb-6 md:mb-0 md:mr-6"
                />
                <div>
                  <div className="text-amber-400 flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="italic text-irctc-dark-gray mb-4">
                    "As a Gold member, I've redeemed points for hotel discounts and meal vouchers. The 10% discount on meals has been a great perk for my family vacations!"
                  </p>
                  <div>
                    <h4 className="font-semibold">Sonia Gupta</h4>
                    <p className="text-sm text-irctc-medium-gray">Gold Member, Family Traveler</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-irctc-royal-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Rewards Program Today
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Start earning points on your next journey and unlock a world of benefits and experiences.
            It's free to join and the rewards begin immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px]"
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10 min-w-[200px]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const Ticket = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 7v2a3 3 0 1 1 0 6v2h18v-2a3 3 0 1 1 0-6V7z" />
    <path d="M13 5v14" />
  </svg>
);

const ArrowUpCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 12-4-4-4 4" />
    <path d="M12 16V8" />
  </svg>
);

const Hotel = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
    <path d="M8 7h.01" />
    <path d="M16 7h.01" />
    <path d="M12 7h.01" />
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
    <path d="M8 11h.01" />
    <path d="M10 22v-6.5m4 0V22" />
  </svg>
);

const Coffee = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

const Plane = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default LoyaltyProgram;
