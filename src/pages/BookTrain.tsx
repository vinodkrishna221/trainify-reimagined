
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, CalendarDays, Users, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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

const bookingSchema = z.object({
  fromStation: z.string().min(1, { message: "From station is required" }),
  toStation: z.string().min(1, { message: "To station is required" }),
  journeyDate: z.date({
    required_error: "Journey date is required",
  }),
  travelClass: z.string().min(1, { message: "Travel class is required" }),
  quota: z.string().min(1, { message: "Quota is required" }),
  passengers: z.string().min(1, { message: "Number of passengers is required" }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const BookTrain = () => {
  const [fromSuggestions, setFromSuggestions] = useState<boolean>(false);
  const [toSuggestions, setToSuggestions] = useState<boolean>(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fromStation: "",
      toStation: "",
      travelClass: "SL",
      quota: "GN",
      passengers: "1",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form submitted:", data);
    window.location.href = '/train-list';
  };

  const handleStationSelect = (field: 'fromStation' | 'toStation', station: string) => {
    form.setValue(field, station);
    if (field === 'fromStation') {
      setFromSuggestions(false);
    } else {
      setToSuggestions(false);
    }
  };

  const swapStations = () => {
    const fromValue = form.getValues('fromStation');
    const toValue = form.getValues('toStation');
    form.setValue('fromStation', toValue);
    form.setValue('toStation', fromValue);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-irctc-dark-gray">Book Your Train Ticket</h1>
          <p className="text-irctc-medium-gray mt-3 max-w-2xl mx-auto">
            Search for trains, check availability, and book your journey across India
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Card.Content className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-8">
                    {/* From Station */}
                    <div className="md:col-span-3 relative">
                      <FormField
                        control={form.control}
                        name="fromStation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Station</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="Enter city or station"
                                    {...field}
                                    className="pl-10"
                                    onFocus={() => setFromSuggestions(true)}
                                    onBlur={() => setTimeout(() => setFromSuggestions(false), 200)}
                                  />
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                </div>
                              </FormControl>
                              {fromSuggestions && (
                                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 animate-slide-down">
                                  <div className="p-2">
                                    <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                                    <div className="max-h-60 overflow-y-auto">
                                      {popularStations.map((station) => (
                                        <div
                                          key={station.code}
                                          className="px-2 py-2 hover:bg-irctc-light-gray rounded-md cursor-pointer transition-colors"
                                          onClick={() => handleStationSelect('fromStation', `${station.name} (${station.code})`)}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Swap Button */}
                    <div className="flex items-center justify-center md:col-span-1">
                      <div 
                        className="w-10 h-10 flex items-center justify-center bg-irctc-light-gray rounded-full cursor-pointer hover:bg-irctc-light-blue/10 transition-colors"
                        onClick={swapStations}
                      >
                        <div className="transform rotate-90 md:rotate-0">↔</div>
                      </div>
                    </div>

                    {/* To Station */}
                    <div className="md:col-span-3 relative">
                      <FormField
                        control={form.control}
                        name="toStation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To Station</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="Enter city or station"
                                    {...field}
                                    className="pl-10"
                                    onFocus={() => setToSuggestions(true)}
                                    onBlur={() => setTimeout(() => setToSuggestions(false), 200)}
                                  />
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                </div>
                              </FormControl>
                              {toSuggestions && (
                                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 animate-slide-down">
                                  <div className="p-2">
                                    <div className="text-xs font-medium text-irctc-medium-gray px-2 py-1">Popular Stations</div>
                                    <div className="max-h-60 overflow-y-auto">
                                      {popularStations.map((station) => (
                                        <div
                                          key={station.code}
                                          className="px-2 py-2 hover:bg-irctc-light-gray rounded-md cursor-pointer transition-colors"
                                          onClick={() => handleStationSelect('toStation', `${station.name} (${station.code})`)}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Date Picker */}
                    <div className="md:col-span-1">
                      <FormField
                        control={form.control}
                        name="journeyDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "pl-10 text-left font-normal h-10",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Class Selection */}
                    <FormField
                      control={form.control}
                      name="travelClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Travel Class</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1A">AC First Class (1A)</SelectItem>
                              <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                              <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                              <SelectItem value="SL">Sleeper (SL)</SelectItem>
                              <SelectItem value="CC">AC Chair Car (CC)</SelectItem>
                              <SelectItem value="2S">Second Sitting (2S)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Quota Selection */}
                    <FormField
                      control={form.control}
                      name="quota"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quota</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Quota" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="GN">General Quota (GN)</SelectItem>
                              <SelectItem value="LD">Ladies Quota (LD)</SelectItem>
                              <SelectItem value="TQ">Tatkal Quota (TQ)</SelectItem>
                              <SelectItem value="PT">Premium Tatkal (PT)</SelectItem>
                              <SelectItem value="SS">Senior Citizen (SS)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Passenger Count */}
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Passengers" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Passenger</SelectItem>
                              <SelectItem value="2">2 Passengers</SelectItem>
                              <SelectItem value="3">3 Passengers</SelectItem>
                              <SelectItem value="4">4 Passengers</SelectItem>
                              <SelectItem value="5">5 Passengers</SelectItem>
                              <SelectItem value="6">6 Passengers</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button 
                      type="submit" 
                      className="bg-irctc-royal-blue hover:bg-irctc-royal-blue/90 text-white py-6 px-10 rounded-lg flex items-center gap-2 text-base"
                    >
                      <Search className="h-5 w-5" />
                      Search Trains
                    </Button>
                  </div>
                </form>
              </Form>
            </Card.Content>
          </Card>

          {/* Travel Tips Section */}
          <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-irctc-dark-gray">Travel Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-irctc-light-blue/20 p-2 rounded-full">
                  <CalendarDays className="h-5 w-5 text-irctc-royal-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-irctc-dark-gray">Plan Ahead</h3>
                  <p className="text-sm text-gray-600 mt-1">Book tickets up to 120 days in advance for better availability.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-irctc-light-blue/20 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-irctc-royal-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-irctc-dark-gray">Tatkal Bookings</h3>
                  <p className="text-sm text-gray-600 mt-1">Tatkal booking opens at 10:00 AM for AC classes and 11:00 AM for non-AC.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-irctc-light-blue/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-irctc-royal-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-irctc-dark-gray">Group Travel</h3>
                  <p className="text-sm text-gray-600 mt-1">For groups of 20+ passengers, consider booking through Group Booking System.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookTrain;
