
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Search, 
  Ticket, 
  Train, 
  MapPin, 
  Calendar,
  Clock,
  Users,
  ClipboardCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CopyCheck,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock PNR Status Data
const mockPnrData = {
  pnrNumber: "8547215698",
  trainInfo: {
    trainName: "Rajdhani Express",
    trainNumber: "12301",
    fromStation: "New Delhi",
    fromCode: "NDLS",
    toStation: "Howrah Jn",
    toCode: "HWH",
    departureDate: "15 Jul 2023",
    departureTime: "16:10",
    arrivalDate: "16 Jul 2023",
    arrivalTime: "10:05",
    distance: "1,451 KM",
    duration: "17h 55m"
  },
  passengerInfo: [
    {
      passengerNo: 1,
      currentStatus: "Confirmed (B4, 24)",
      bookingStatus: "Confirmed",
      coachPosition: 8,
      seatType: "AC 3 Tier (3A)"
    },
    {
      passengerNo: 2,
      currentStatus: "Confirmed (B4, 25)",
      bookingStatus: "Confirmed",
      coachPosition: 8,
      seatType: "AC 3 Tier (3A)"
    },
    {
      passengerNo: 3,
      currentStatus: "RAC 15",
      bookingStatus: "RAC 65",
      coachPosition: 9,
      seatType: "AC 3 Tier (3A)"
    }
  ],
  bookingInfo: {
    bookingDate: "10 Jul 2023",
    bookingStatus: "Confirmed/RAC",
    class: "AC 3 Tier (3A)",
    chartStatus: "Chart Prepared",
    totalFare: "₹3,245"
  }
};

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [showPnrResult, setShowPnrResult] = useState(false);
  const [showPassengers, setShowPassengers] = useState(true);
  const [showBookingDetails, setShowBookingDetails] = useState(true);
  const { toast } = useToast();

  const handleSearch = () => {
    if (pnrNumber.length !== 10 || !/^\d+$/.test(pnrNumber)) {
      toast({
        title: "Invalid PNR Number",
        description: "Please enter a valid 10-digit PNR number",
        variant: "destructive"
      });
      return;
    }
    setShowPnrResult(true);
  };

  const handleCopyPnr = () => {
    navigator.clipboard.writeText(mockPnrData.pnrNumber);
    toast({
      title: "PNR Copied",
      description: "PNR number copied to clipboard",
    });
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
          <h1 className="text-3xl md:text-4xl font-bold text-irctc-dark-gray">PNR Status</h1>
          <p className="text-irctc-medium-gray mt-3 max-w-2xl mx-auto">
            Check the status of your train ticket using your 10-digit PNR number
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
              <Card.Content className="p-6 md:p-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pnr-number">Enter 10-digit PNR Number</Label>
                    <div className="relative mt-1">
                      <Input
                        id="pnr-number"
                        placeholder="e.g., 1234567890"
                        value={pnrNumber}
                        onChange={(e) => setPnrNumber(e.target.value)}
                        className="pl-10"
                        maxLength={10}
                      />
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-irctc-royal-blue hover:bg-irctc-royal-blue/90"
                    onClick={handleSearch}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Check PNR Status
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </motion.div>

          <AnimatePresence>
            {showPnrResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 space-y-6"
              >
                {/* PNR Summary Card */}
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <div className="bg-irctc-royal-blue p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <Ticket className="text-white mr-2 h-5 w-5" />
                      <span className="text-white font-medium">PNR: {mockPnrData.pnrNumber}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="h-8 text-white hover:bg-white/20" 
                      onClick={handleCopyPnr}
                    >
                      <CopyCheck className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Card.Content className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-lg font-semibold text-irctc-dark-gray">
                          {mockPnrData.trainInfo.trainName}
                        </div>
                        <div className="text-irctc-medium-gray">
                          {mockPnrData.trainInfo.trainNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                          mockPnrData.bookingInfo.chartStatus === "Chart Prepared" 
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        )}>
                          <ClipboardCheck className="mr-1 h-4 w-4" />
                          {mockPnrData.bookingInfo.chartStatus}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-irctc-medium-gray">From</div>
                          <div className="font-medium">{mockPnrData.trainInfo.fromStation} ({mockPnrData.trainInfo.fromCode})</div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-irctc-medium-gray" />
                            <span>{mockPnrData.trainInfo.departureDate}</span>
                            <Clock className="h-4 w-4 mx-1 text-irctc-medium-gray" />
                            <span>{mockPnrData.trainInfo.departureTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-irctc-medium-gray">To</div>
                          <div className="font-medium">{mockPnrData.trainInfo.toStation} ({mockPnrData.trainInfo.toCode})</div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-irctc-medium-gray" />
                            <span>{mockPnrData.trainInfo.arrivalDate}</span>
                            <Clock className="h-4 w-4 mx-1 text-irctc-medium-gray" />
                            <span>{mockPnrData.trainInfo.arrivalTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Train className="h-5 w-5 text-irctc-royal-blue mr-2" />
                        <div>
                          <div className="text-sm text-irctc-medium-gray">Distance</div>
                          <div className="font-medium">{mockPnrData.trainInfo.distance}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-irctc-royal-blue mr-2" />
                        <div>
                          <div className="text-sm text-irctc-medium-gray">Duration</div>
                          <div className="font-medium">{mockPnrData.trainInfo.duration}</div>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                {/* Passenger Information */}
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <div 
                    className="bg-irctc-light-gray p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => setShowPassengers(!showPassengers)}
                  >
                    <div className="flex items-center">
                      <Users className="text-irctc-royal-blue mr-2 h-5 w-5" />
                      <span className="font-medium">Passenger Information</span>
                    </div>
                    <motion.div 
                      animate={{ rotate: showPassengers ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-irctc-dark-gray" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {showPassengers && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card.Content className="p-6">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="py-3 px-4 text-left text-sm font-medium text-irctc-dark-gray">Passenger</th>
                                  <th className="py-3 px-4 text-left text-sm font-medium text-irctc-dark-gray">Booking Status</th>
                                  <th className="py-3 px-4 text-left text-sm font-medium text-irctc-dark-gray">Current Status</th>
                                  <th className="py-3 px-4 text-left text-sm font-medium text-irctc-dark-gray">Coach Position</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {mockPnrData.passengerInfo.map((passenger) => (
                                  <motion.tr 
                                    key={passenger.passengerNo}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: passenger.passengerNo * 0.1 }}
                                    className="hover:bg-gray-50"
                                  >
                                    <td className="py-3 px-4 text-sm">Passenger {passenger.passengerNo}</td>
                                    <td className="py-3 px-4 text-sm">{passenger.bookingStatus}</td>
                                    <td className="py-3 px-4 text-sm">
                                      <span className={cn(
                                        "px-2 py-1 rounded text-xs font-medium",
                                        passenger.currentStatus.includes("Confirmed") 
                                          ? "bg-green-100 text-green-800"
                                          : passenger.currentStatus.includes("RAC")
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-red-100 text-red-800"
                                      )}>
                                        {passenger.currentStatus}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                      {passenger.coachPosition}
                                      <span className="text-xs text-irctc-medium-gray ml-2">
                                        ({passenger.seatType})
                                      </span>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <Alert className="mt-4 border-amber-200 bg-amber-50">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <AlertTitle className="text-amber-800">Seat Allocation</AlertTitle>
                            <AlertDescription className="text-amber-700">
                              Final seat allocation will be shown after chart preparation, approximately 4 hours before departure.
                            </AlertDescription>
                          </Alert>
                        </Card.Content>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>

                {/* Booking Details */}
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <div 
                    className="bg-irctc-light-gray p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => setShowBookingDetails(!showBookingDetails)}
                  >
                    <div className="flex items-center">
                      <ClipboardCheck className="text-irctc-royal-blue mr-2 h-5 w-5" />
                      <span className="font-medium">Booking Details</span>
                    </div>
                    <motion.div 
                      animate={{ rotate: showBookingDetails ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-irctc-dark-gray" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {showBookingDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card.Content className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm text-irctc-medium-gray">Booking Date</div>
                                  <div className="font-medium">{mockPnrData.bookingInfo.bookingDate}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-irctc-medium-gray">Booking Status</div>
                                  <div className="font-medium">{mockPnrData.bookingInfo.bookingStatus}</div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm text-irctc-medium-gray">Class</div>
                                  <div className="font-medium">{mockPnrData.bookingInfo.class}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-irctc-medium-gray">Total Fare</div>
                                  <div className="font-medium">{mockPnrData.bookingInfo.totalFare}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="font-medium mb-3">Travel Tips</h4>
                            <ul className="space-y-2 text-sm text-irctc-medium-gray">
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex items-start"
                              >
                                <div className="mr-2 mt-0.5 h-4 w-4 bg-irctc-light-blue rounded-full flex items-center justify-center text-white text-xs">1</div>
                                <span>Arrive at the station at least 30 minutes before departure.</span>
                              </motion.li>
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="flex items-start"
                              >
                                <div className="mr-2 mt-0.5 h-4 w-4 bg-irctc-light-blue rounded-full flex items-center justify-center text-white text-xs">2</div>
                                <span>Keep this PNR number handy for any inquiries.</span>
                              </motion.li>
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="flex items-start"
                              >
                                <div className="mr-2 mt-0.5 h-4 w-4 bg-irctc-light-blue rounded-full flex items-center justify-center text-white text-xs">3</div>
                                <span>Carry a valid ID proof during your journey for verification.</span>
                              </motion.li>
                            </ul>
                          </div>
                        </Card.Content>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full border-irctc-royal-blue text-irctc-royal-blue hover:bg-irctc-royal-blue/5"
                      onClick={() => window.location.href = '/track-train'}
                    >
                      <Train className="mr-2 h-4 w-4" />
                      Track This Train
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full border-irctc-orange text-irctc-orange hover:bg-irctc-orange/5"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-500/5"
                      onClick={() => window.location.href = '/cancel-ticket'}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel Ticket
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default PNRStatus;
