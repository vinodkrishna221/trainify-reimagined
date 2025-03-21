
import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, MessageCircle, Phone, Mail, FileText, CreditCard, Clock, Calendar, Train, Plane, Building } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';
import ParticleBackground from '@/components/common/ParticleBackground';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      {/* Hero Section with Particles */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 overflow-hidden">
        <ParticleBackground className="absolute inset-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help You?</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Find answers to frequently asked questions and learn how to make the most of IRCTC Express
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full py-4 px-5 pl-12 rounded-lg border-0 focus:ring-2 focus:ring-white/30"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            {searchQuery && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 text-left text-gray-800 py-2">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  How to book a train ticket
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  What is PNR status
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  How to cancel a ticket
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 min-w-[140px]">
              <Train className="mr-2 h-4 w-4" /> Train Bookings
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 min-w-[140px]">
              <Plane className="mr-2 h-4 w-4" /> Flight Bookings
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 min-w-[140px]">
              <Building className="mr-2 h-4 w-4" /> Hotel Bookings
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 min-w-[140px]">
              <CreditCard className="mr-2 h-4 w-4" /> Payments
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Help Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="trains" className="w-full">
            <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 mb-12">
              <TabsTrigger value="trains" className="text-center py-3">
                <Train className="h-5 w-5 mx-auto mb-1" />
                <span className="block">Trains</span>
              </TabsTrigger>
              <TabsTrigger value="flights" className="text-center py-3">
                <Plane className="h-5 w-5 mx-auto mb-1" />
                <span className="block">Flights</span>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="text-center py-3">
                <Building className="h-5 w-5 mx-auto mb-1" />
                <span className="block">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="text-center py-3">
                <HelpCircle className="h-5 w-5 mx-auto mb-1" />
                <span className="block">Account</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TabsContent value="trains" className="mt-0">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Train className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Train Booking Guide
                    </h2>
                    
                    <div className="space-y-8">
                      {/* How to Book a Train Ticket */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">How to Book a Train Ticket</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                          <li>
                            <strong>Search for trains:</strong> Enter your origin, destination, and travel date in the search bar on the homepage.
                          </li>
                          <li>
                            <strong>Select a train:</strong> Browse the list of available trains and choose one based on departure time, duration, and availability.
                          </li>
                          <li>
                            <strong>Choose travel class:</strong> Select your preferred class (e.g., Sleeper, AC 3-Tier, AC 2-Tier, etc.)
                          </li>
                          <li>
                            <strong>Enter passenger details:</strong> Provide the required information for all passengers traveling.
                          </li>
                          <li>
                            <strong>Select berth preference:</strong> Choose your preferred berth type (lower, middle, upper, side lower, side upper).
                          </li>
                          <li>
                            <strong>Review and confirm:</strong> Check all details before proceeding to payment.
                          </li>
                          <li>
                            <strong>Make payment:</strong> Pay using one of the available payment methods (credit/debit card, UPI, net banking, etc.)
                          </li>
                          <li>
                            <strong>Receive confirmation:</strong> Upon successful payment, you'll receive an e-ticket via email and SMS.
                          </li>
                        </ol>
                      </div>
                      
                      {/* Important Terminologies */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Important Terminologies</h3>
                        <dl className="space-y-4">
                          <div>
                            <dt className="font-medium">PNR (Passenger Name Record)</dt>
                            <dd className="ml-4 text-gray-600">A unique 10-digit number assigned to your booking that helps track your reservation status.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">CNF (Confirmed)</dt>
                            <dd className="ml-4 text-gray-600">Your ticket is confirmed with an assigned seat/berth.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">RAC (Reservation Against Cancellation)</dt>
                            <dd className="ml-4 text-gray-600">Passengers with RAC tickets are allocated shared seating arrangements and might get confirmed berths later.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">WL (Waiting List)</dt>
                            <dd className="ml-4 text-gray-600">Your ticket is on the waiting list, and confirmation depends on cancellations by other passengers.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Tatkal Booking</dt>
                            <dd className="ml-4 text-gray-600">Emergency ticket booking available one day before the journey date (opens at 10 AM for AC classes and 11 AM for non-AC).</dd>
                          </div>
                          <div>
                            <dt className="font-medium">GNWL (General Waiting List)</dt>
                            <dd className="ml-4 text-gray-600">The general waiting list when the general quota seats are full.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">RLWL (Remote Location Waiting List)</dt>
                            <dd className="ml-4 text-gray-600">Waiting list for tickets booked from remote locations, not the originating station.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">PQWL (Pooled Quota Waiting List)</dt>
                            <dd className="ml-4 text-gray-600">Waiting list for tickets booked in the pooled quota.</dd>
                          </div>
                        </dl>
                      </div>
                      
                      {/* Train Ticket Types */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Train Ticket Types</h3>
                        <ul className="space-y-2">
                          <li>
                            <strong>General Ticket:</strong> Regular tickets booked in advance (up to 120 days).
                          </li>
                          <li>
                            <strong>Tatkal Ticket:</strong> Last-minute booking facility available one day before the journey.
                          </li>
                          <li>
                            <strong>Premium Tatkal:</strong> Dynamic pricing for last-minute bookings with higher fares.
                          </li>
                          <li>
                            <strong>Senior Citizen Concession:</strong> Discounted tickets for elderly passengers (women aged 58+ and men aged 60+).
                          </li>
                          <li>
                            <strong>Ladies Quota:</strong> Reserved seats for female passengers traveling alone or with children under 12.
                          </li>
                          <li>
                            <strong>Foreign Tourist Quota:</strong> Special quota for international tourists.
                          </li>
                        </ul>
                      </div>
                      
                      {/* Travel Classes */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Travel Classes</h3>
                        <ul className="space-y-2">
                          <li>
                            <strong>1A (First AC):</strong> The most premium class with 2-4 berths per cabin, with locked doors for privacy.
                          </li>
                          <li>
                            <strong>2A (Second AC):</strong> Two-tier air-conditioned coaches with curtains for privacy.
                          </li>
                          <li>
                            <strong>3A (Third AC):</strong> Three-tier air-conditioned coaches with less space than 2A but more affordable.
                          </li>
                          <li>
                            <strong>SL (Sleeper Class):</strong> Non-air-conditioned coaches with three-tier berths.
                          </li>
                          <li>
                            <strong>CC (Chair Car):</strong> Air-conditioned seating coaches for daytime journeys.
                          </li>
                          <li>
                            <strong>EC (Executive Chair Car):</strong> Premium air-conditioned seating with more space and comfort.
                          </li>
                          <li>
                            <strong>2S (Second Sitting):</strong> Unreserved seating for short journeys.
                          </li>
                        </ul>
                      </div>
                      
                      {/* Cancellation and Refunds */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Cancellation and Refunds</h3>
                        <p className="mb-3">To cancel a ticket:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Login to your IRCTC Express account</li>
                          <li>Go to "My Bookings" or "Booked Tickets"</li>
                          <li>Select the ticket you wish to cancel</li>
                          <li>Click on "Cancel Ticket" and confirm</li>
                          <li>Refund will be processed based on cancellation rules</li>
                        </ol>
                        
                        <p className="mt-4 mb-3"><strong>Cancellation Charges:</strong></p>
                        <ul className="space-y-2">
                          <li>Cancellation more than 48 hours before departure: Minimal charge</li>
                          <li>Between 48 and 12 hours: 25% of fare</li>
                          <li>Between 12 and 4 hours: 50% of fare</li>
                          <li>Less than 4 hours: Minimal to no refund</li>
                          <li>Tatkal tickets have special cancellation rules with lower refund amounts</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="flights" className="mt-0">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Plane className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Flight Booking Guide
                    </h2>
                    
                    <div className="space-y-8">
                      {/* How to Book a Flight */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">How to Book a Flight</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                          <li>
                            <strong>Search for flights:</strong> Enter origin, destination, travel dates, and number of passengers.
                          </li>
                          <li>
                            <strong>Compare options:</strong> Review available flights by price, duration, airline, and departure time.
                          </li>
                          <li>
                            <strong>Select a flight:</strong> Choose your preferred outbound and return flights (if round-trip).
                          </li>
                          <li>
                            <strong>Choose fare type:</strong> Select from available fare options (economy, premium economy, business, etc.)
                          </li>
                          <li>
                            <strong>Add extras:</strong> Select optional add-ons like seat selection, meals, or extra baggage.
                          </li>
                          <li>
                            <strong>Enter passenger details:</strong> Provide required information for all travelers.
                          </li>
                          <li>
                            <strong>Review and confirm:</strong> Verify all details before proceeding to payment.
                          </li>
                          <li>
                            <strong>Make payment:</strong> Complete the booking by paying through available payment methods.
                          </li>
                          <li>
                            <strong>Receive confirmation:</strong> Your e-ticket will be emailed and available in your account.
                          </li>
                        </ol>
                      </div>
                      
                      {/* Flight Booking Terminologies */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Important Terminologies</h3>
                        <dl className="space-y-4">
                          <div>
                            <dt className="font-medium">PNR (Passenger Name Record)</dt>
                            <dd className="ml-4 text-gray-600">A unique reference number for your flight booking.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Web Check-in</dt>
                            <dd className="ml-4 text-gray-600">Online process to check in for your flight and get a boarding pass before reaching the airport.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Layover</dt>
                            <dd className="ml-4 text-gray-600">Time spent at a connecting airport between flights.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Direct vs. Non-stop</dt>
                            <dd className="ml-4 text-gray-600">Direct flights may make stops without changing aircraft, while non-stop flights go directly from origin to destination.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Baggage Allowance</dt>
                            <dd className="ml-4 text-gray-600">Weight and number of bags you can carry for free with your ticket.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Fare Classes</dt>
                            <dd className="ml-4 text-gray-600">Different ticket categories with varying rules, benefits, and prices.</dd>
                          </div>
                        </dl>
                      </div>
                      
                      {/* Flight Booking Tips */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Flight Booking Tips</h3>
                        <ul className="space-y-3">
                          <li>
                            <strong>Book in advance:</strong> Flights are typically cheaper when booked weeks or months ahead.
                          </li>
                          <li>
                            <strong>Be flexible with dates:</strong> Shifting your travel by a day or two can sometimes result in significant savings.
                          </li>
                          <li>
                            <strong>Compare fare types:</strong> Basic economy might seem cheaper but could have restrictions on baggage or seat selection.
                          </li>
                          <li>
                            <strong>Check baggage policies:</strong> Review baggage allowances to avoid paying extra at the airport.
                          </li>
                          <li>
                            <strong>Web check-in:</strong> Check in online 24-48 hours before departure to select seats and skip long airport queues.
                          </li>
                          <li>
                            <strong>Flight + Hotel combos:</strong> Consider booking your accommodation together with your flight for potential discounts.
                          </li>
                        </ul>
                      </div>
                      
                      {/* Cancellation and Changes */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Cancellation and Changes</h3>
                        <p className="mb-3">Most airlines have three types of fares with different change and cancellation policies:</p>
                        <ul className="space-y-2">
                          <li>
                            <strong>Flexible/Refundable:</strong> Full or partial refund available; changes allowed with minimal or no fee.
                          </li>
                          <li>
                            <strong>Semi-Flexible:</strong> Partial refund with cancellation charges; changes allowed with a fee.
                          </li>
                          <li>
                            <strong>Non-Refundable:</strong> No refund on cancellation; changes may be allowed with higher fees.
                          </li>
                        </ul>
                        
                        <p className="mt-4 mb-2">To cancel or change a flight booking:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Login to your IRCTC Express account</li>
                          <li>Navigate to "My Bookings" section</li>
                          <li>Find and select your flight booking</li>
                          <li>Choose "Cancel" or "Change" option</li>
                          <li>Follow the prompts to complete the process</li>
                          <li>Refunds (if applicable) will be processed to the original payment method</li>
                        </ol>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="hotels" className="mt-0">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Building className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Hotel Booking Guide
                    </h2>
                    
                    <div className="space-y-8">
                      {/* How to Book a Hotel */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">How to Book a Hotel</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                          <li>
                            <strong>Search for hotels:</strong> Enter your destination, check-in/out dates, and number of guests.
                          </li>
                          <li>
                            <strong>Filter results:</strong> Narrow down options by price range, star rating, amenities, or location.
                          </li>
                          <li>
                            <strong>Compare hotels:</strong> Review photos, amenities, room types, and guest reviews.
                          </li>
                          <li>
                            <strong>Select a room:</strong> Choose from available room types based on your requirements and budget.
                          </li>
                          <li>
                            <strong>Add extras:</strong> Select meal plans, airport transfers, or other additional services if desired.
                          </li>
                          <li>
                            <strong>Enter guest details:</strong> Provide names and contact information for all guests.
                          </li>
                          <li>
                            <strong>Review booking:</strong> Check all details including hotel policies, cancellation terms, and total price.
                          </li>
                          <li>
                            <strong>Complete payment:</strong> Pay either the full amount or a deposit (depending on the booking type).
                          </li>
                          <li>
                            <strong>Receive confirmation:</strong> A booking confirmation will be sent to your email and available in your account.
                          </li>
                        </ol>
                      </div>
                      
                      {/* Hotel Booking Terminologies */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Important Terminologies</h3>
                        <dl className="space-y-4">
                          <div>
                            <dt className="font-medium">Room Types</dt>
                            <dd className="ml-4 text-gray-600">Standard, Deluxe, Suite, Executive, etc., indicating different levels of size and amenities.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Check-in/Check-out Time</dt>
                            <dd className="ml-4 text-gray-600">Standard times when you can enter and must leave your room (typically 2-3 PM for check-in and 11 AM-12 PM for check-out).</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Meal Plans</dt>
                            <dd className="ml-4 text-gray-600">
                              <ul className="space-y-1 mt-1">
                                <li>• EP (European Plan): Room only, no meals included</li>
                                <li>• CP (Continental Plan): Includes breakfast</li>
                                <li>• MAP (Modified American Plan): Breakfast and dinner included</li>
                                <li>• AP (American Plan): All meals included</li>
                              </ul>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium">Free Cancellation</dt>
                            <dd className="ml-4 text-gray-600">Ability to cancel your booking without penalty before a specified date.</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Pay at Hotel</dt>
                            <dd className="ml-4 text-gray-600">Option to make payment directly at the hotel during check-in rather than at the time of booking.</dd>
                          </div>
                        </dl>
                      </div>
                      
                      {/* Hotel Booking Tips */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Hotel Booking Tips</h3>
                        <ul className="space-y-3">
                          <li>
                            <strong>Check the location:</strong> Use the map view to ensure the hotel is in a convenient location for your plans.
                          </li>
                          <li>
                            <strong>Read recent reviews:</strong> Focus on guest experiences from the past 3-6 months for the most relevant information.
                          </li>
                          <li>
                            <strong>Look for hidden fees:</strong> Check if the total price includes taxes, resort fees, or other additional charges.
                          </li>
                          <li>
                            <strong>Verify amenities:</strong> Confirm that important amenities like Wi-Fi, parking, or breakfast are included or their cost.
                          </li>
                          <li>
                            <strong>Check cancellation policy:</strong> Understand the deadline and terms for free cancellation.
                          </li>
                          <li>
                            <strong>Book with free cancellation:</strong> When possible, choose bookings with flexible cancellation options.
                          </li>
                          <li>
                            <strong>Consider loyalty programs:</strong> Hotel chain loyalty programs can provide benefits and future discounts.
                          </li>
                        </ul>
                      </div>
                      
                      {/* Cancellation and Changes */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Cancellation and Changes</h3>
                        <p className="mb-3">Hotel bookings typically fall into two main categories:</p>
                        <ul className="space-y-2">
                          <li>
                            <strong>Free Cancellation:</strong> Can be canceled without penalty until a specific date (usually 24-48 hours before check-in).
                          </li>
                          <li>
                            <strong>Non-Refundable:</strong> Offers a lower rate but cannot be canceled or changed without losing the payment.
                          </li>
                        </ul>
                        
                        <p className="mt-4 mb-2">To cancel or modify a hotel booking:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Login to your IRCTC Express account</li>
                          <li>Go to "My Bookings" section</li>
                          <li>Find and select the hotel reservation</li>
                          <li>Click on "Cancel" or "Modify" option</li>
                          <li>Follow the instructions to complete the process</li>
                          <li>If eligible, refunds will be processed according to the hotel's policy</li>
                        </ol>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="account" className="mt-0">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Account Management
                    </h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How do I create an account?</AccordionTrigger>
                        <AccordionContent>
                          <p>To create an account on IRCTC Express:</p>
                          <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li>Click on the "Sign Up" or "Register" button at the top right of the homepage</li>
                            <li>Fill in your personal details including name, email, and mobile number</li>
                            <li>Create a strong password</li>
                            <li>Verify your email address and phone number</li>
                            <li>Complete your profile with additional details like address and ID proof</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent>
                          <p>If you've forgotten your password:</p>
                          <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li>Click on "Login" at the top of the page</li>
                            <li>Select "Forgot Password" link</li>
                            <li>Enter your registered email address or mobile number</li>
                            <li>Follow the instructions sent to your email or phone to reset your password</li>
                            <li>Create a new password and confirm it</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                        <AccordionContent>
                          <p>To update your profile details:</p>
                          <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li>Login to your IRCTC Express account</li>
                            <li>Click on your profile icon or name at the top right</li>
                            <li>Select "My Profile" or "Account Settings"</li>
                            <li>Edit the information you wish to update</li>
                            <li>Save the changes</li>
                          </ol>
                          <p className="mt-2">Note: Some critical information like your name may require additional verification or supporting documents to change.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I access my booking history?</AccordionTrigger>
                        <AccordionContent>
                          <p>To view your past and upcoming bookings:</p>
                          <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li>Login to your IRCTC Express account</li>
                            <li>Navigate to "My Bookings" or "My Trips" section</li>
                            <li>You'll see tabs for upcoming and past bookings</li>
                            <li>Click on any booking to view details, make changes, or download e-tickets</li>
                          </ol>
                          <p className="mt-2">You can filter bookings by type (train, flight, hotel) and date range.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger>How do I access and use my dashboard?</AccordionTrigger>
                        <AccordionContent>
                          <p>Your dashboard provides a centralized view of your activity:</p>
                          <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li>Login to your IRCTC Express account</li>
                            <li>Click on "Dashboard" in the main navigation or user menu</li>
                            <li>The dashboard displays upcoming trips, recent bookings, saved travelers, payment methods, and account notifications</li>
                            <li>Use the quick links to manage bookings, check PNR status, or access frequent searches</li>
                            <li>View and redeem any reward points or offers available</li>
                          </ol>
                          <p className="mt-2">You can personalize your dashboard by clicking the "Customize" option to show or hide different sections.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                </TabsContent>
              </div>
              
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Contact Support
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                        <div>
                          <div className="font-medium">Customer Care</div>
                          <div className="text-irctc-royal-blue">1800-XXX-XXXX</div>
                          <div className="text-sm text-gray-500">24/7 Support</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                        <div>
                          <div className="font-medium">Email Support</div>
                          <div className="text-irctc-royal-blue">support@irctcexpress.com</div>
                          <div className="text-sm text-gray-500">Response within 24 hours</div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-2">
                        Chat With Us
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-irctc-royal-blue" />
                      Quick Resources
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center text-irctc-royal-blue hover:underline">
                          <BookOpen className="w-4 h-4 mr-2" />
                          User Manual
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-irctc-royal-blue hover:underline">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Payment Guidelines
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-irctc-royal-blue hover:underline">
                          <Clock className="w-4 h-4 mr-2" />
                          Cancellation Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-irctc-royal-blue hover:underline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Tatkal Booking Rules
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-irctc-royal-blue hover:underline">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-3">Popular Help Topics</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-irctc-royal-blue hover:underline">How to track PNR status?</a>
                      </li>
                      <li>
                        <a href="#" className="text-irctc-royal-blue hover:underline">Refund process and timeline</a>
                      </li>
                      <li>
                        <a href="#" className="text-irctc-royal-blue hover:underline">Tatkal booking time limits</a>
                      </li>
                      <li>
                        <a href="#" className="text-irctc-royal-blue hover:underline">How to add senior citizen discount?</a>
                      </li>
                      <li>
                        <a href="#" className="text-irctc-royal-blue hover:underline">Changing passenger names on ticket</a>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Feedback Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-3">Was This Helpful?</h2>
          <p className="text-irctc-medium-gray mb-6">
            Help us improve our support center with your feedback
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              Yes, I found what I needed
            </Button>
            <Button variant="outline">
              No, I need more help
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Help;
