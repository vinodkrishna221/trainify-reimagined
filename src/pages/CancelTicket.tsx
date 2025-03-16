
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Ticket, Search, AlertTriangle, TicketX, X, Check } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from '@/components/ui/checkbox';

const mockTicket = {
  pnr: '4561234567',
  train: 'Rajdhani Express (12301)',
  from: 'New Delhi',
  to: 'Mumbai Central',
  date: '12 Jun 2023',
  departureTime: '16:10',
  passengers: [
    { id: 1, name: 'Rahul Sharma', age: 32, gender: 'Male', seat: 'B1-24', status: 'CNF', selected: false },
    { id: 2, name: 'Priya Sharma', age: 29, gender: 'Female', seat: 'B1-25', status: 'CNF', selected: false },
    { id: 3, name: 'Aryan Sharma', age: 8, gender: 'Male', seat: 'B1-26', status: 'CNF', selected: false }
  ],
  totalFare: 3450,
  estimatedRefund: 2760
};

const CancelTicket = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [searchTicked, setSearchTicked] = useState(false);
  const [activeTab, setActiveTab] = useState('pnr');
  const [ticket, setTicket] = useState(mockTicket);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cancellationComplete, setCancellationComplete] = useState(false);
  const [refundMethod, setRefundMethod] = useState('original');
  
  const handleSearchTicket = () => {
    setSearchTicked(true);
    // In a real app, this would fetch the ticket details based on PNR
    console.log('Searching for PNR:', pnrNumber);
  };
  
  const handlePassengerSelection = (passengerId: number) => {
    setTicket({
      ...ticket,
      passengers: ticket.passengers.map(passenger => 
        passenger.id === passengerId 
          ? { ...passenger, selected: !passenger.selected } 
          : passenger
      )
    });
  };
  
  const handleSelectAll = (checked: boolean) => {
    setTicket({
      ...ticket,
      passengers: ticket.passengers.map(passenger => ({ ...passenger, selected: checked }))
    });
  };
  
  const selectedPassengersCount = ticket.passengers.filter(p => p.selected).length;
  
  const handleCancellation = () => {
    setConfirmationOpen(false);
    setCancellationComplete(true);
    // In a real app, this would submit the cancellation request to the backend
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-irctc-dark-gray">Cancel Ticket</h1>
          <p className="text-irctc-medium-gray mt-2">
            Cancel your booked tickets and request a refund
          </p>
        </div>

        {/* Search Box */}
        <Card className="max-w-2xl mx-auto mb-10">
          <Card.Content className="p-6">
            <Tabs defaultValue="pnr" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="pnr" onClick={() => setActiveTab('pnr')}>Cancel by PNR</TabsTrigger>
                <TabsTrigger value="transaction" onClick={() => setActiveTab('transaction')}>Cancel by Transaction ID</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pnr">
                <div className="space-y-4">
                  <Label htmlFor="pnr-search">Enter PNR Number</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Input
                        id="pnr-search"
                        placeholder="e.g. 4561234567"
                        value={pnrNumber}
                        onChange={(e) => setPnrNumber(e.target.value)}
                        className="pl-10"
                      />
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <Button 
                      className="bg-irctc-royal-blue"
                      onClick={handleSearchTicket}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transaction">
                <div className="space-y-4">
                  <Label htmlFor="transaction-search">Enter Transaction ID</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Input
                        id="transaction-search"
                        placeholder="e.g. IRCTC1234567890"
                        className="pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <Button 
                      className="bg-irctc-royal-blue"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card.Content>
        </Card>

        {/* Ticket Details for Cancellation */}
        {searchTicked && !cancellationComplete && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <Card.Content className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <div className="text-sm text-irctc-medium-gray mb-1">PNR Number</div>
                    <div className="text-lg font-bold">{ticket.pnr}</div>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col items-end">
                    <div className="text-irctc-dark-gray font-medium">{ticket.train}</div>
                    <div className="text-sm text-irctc-medium-gray mt-1">
                      {ticket.date} • {ticket.departureTime}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                      <div className="flex items-center">
                        <Checkbox 
                          id="select-all" 
                          onCheckedChange={handleSelectAll}
                          checked={ticket.passengers.every(p => p.selected) && ticket.passengers.length > 0}
                        />
                        <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                          Select All Passengers
                        </label>
                      </div>
                    </div>
                    
                    <div className="text-sm text-irctc-medium-gray">
                      {selectedPassengersCount} of {ticket.passengers.length} passengers selected
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-irctc-medium-gray border-b border-gray-100">
                          <th className="py-2 px-3">Select</th>
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Age</th>
                          <th className="py-2 px-3">Gender</th>
                          <th className="py-2 px-3">Seat</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticket.passengers.map(passenger => (
                          <tr key={passenger.id} className="border-b border-gray-100">
                            <td className="py-3 px-3">
                              <Checkbox 
                                checked={passenger.selected}
                                onCheckedChange={() => handlePassengerSelection(passenger.id)}
                              />
                            </td>
                            <td className="py-3 px-3 font-medium">{passenger.name}</td>
                            <td className="py-3 px-3">{passenger.age}</td>
                            <td className="py-3 px-3">{passenger.gender}</td>
                            <td className="py-3 px-3">{passenger.seat}</td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {passenger.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="font-medium mb-4">Refund Details</h3>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-amber-800 text-sm">
                          Cancellation charges will apply as per Indian Railways rules. The refund amount is an estimate and may vary.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-irctc-medium-gray">Total Fare Paid</div>
                        <div className="font-medium">₹{ticket.totalFare}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-irctc-medium-gray">Cancellation Charges</div>
                        <div className="font-medium">₹{ticket.totalFare - ticket.estimatedRefund}</div>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-100">
                        <div className="text-sm font-medium">Estimated Refund</div>
                        <div className="font-bold text-green-600">₹{ticket.estimatedRefund}</div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Refund Method</Label>
                      <RadioGroup 
                        defaultValue="original" 
                        value={refundMethod}
                        onValueChange={setRefundMethod}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="original" id="original" />
                          <Label htmlFor="original">Original Payment Method</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank">Bank Account</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                        disabled={selectedPassengersCount === 0}
                      >
                        <TicketX className="h-4 w-4" />
                        Cancel Selected Tickets
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Ticket Cancellation</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel {selectedPassengersCount} ticket(s)? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="text-sm">Tickets to Cancel</div>
                            <div className="font-medium">{selectedPassengersCount}</div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm">Estimated Refund</div>
                            <div className="font-medium text-green-600">₹{ticket.estimatedRefund}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm">Refund Method</div>
                            <div className="font-medium">
                              {refundMethod === 'original' ? 'Original Payment Method' : 'Bank Account'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmationOpen(false)}>Cancel</Button>
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={handleCancellation}
                        >
                          Confirm Cancellation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}

        {/* Cancellation Success */}
        {cancellationComplete && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <Card.Content className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Cancellation Successful</h2>
                <p className="text-irctc-medium-gray mb-6">
                  Your selected tickets have been successfully cancelled. Refund has been initiated.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg text-left mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-irctc-medium-gray mb-1">PNR Number</div>
                      <div className="font-medium">{ticket.pnr}</div>
                    </div>
                    <div>
                      <div className="text-sm text-irctc-medium-gray mb-1">Train</div>
                      <div className="font-medium">{ticket.train}</div>
                    </div>
                    <div>
                      <div className="text-sm text-irctc-medium-gray mb-1">Refund Amount</div>
                      <div className="font-medium text-green-600">₹{ticket.estimatedRefund}</div>
                    </div>
                    <div>
                      <div className="text-sm text-irctc-medium-gray mb-1">Refund Status</div>
                      <div className="font-medium">Initiated</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-left mb-6">
                  <p className="text-blue-800 text-sm">
                    Refund will be processed within 3-7 working days to your {refundMethod === 'original' ? 'original payment method' : 'bank account'}.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Return to Home
                  </Button>
                  <Button className="bg-irctc-royal-blue" onClick={() => window.location.href = '/book-train'}>
                    Book Another Ticket
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CancelTicket;
