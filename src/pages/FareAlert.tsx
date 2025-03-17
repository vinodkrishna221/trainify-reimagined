
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { AlertCircle, BellRing } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAlerts } from '@/context/AlertContext';
import { useToast } from '@/hooks/use-toast';
import AlertCard from '@/components/fare-alert/AlertCard';
import CreateAlertForm from '@/components/fare-alert/CreateAlertForm';

const FareAlert = () => {
  const { fareAlerts, addFareAlert, removeFareAlert, toggleAlertStatus } = useAlerts();
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateAlert = (data: {
    fromStation: string;
    toStation: string;
    date: string;
    priceThreshold: number;
    email: string;
    active: boolean;
  }) => {
    addFareAlert(data);
    setShowCreateForm(false);
    toast({
      title: "Fare Alert Created",
      description: "You'll be notified when prices match your criteria.",
    });
  };

  const handleDeleteAlert = (id: string) => {
    removeFareAlert(id);
    toast({
      title: "Alert Removed",
      description: "The fare alert has been successfully removed.",
    });
  };

  const handleToggleAlert = (id: string) => {
    toggleAlertStatus(id);
    const alert = fareAlerts.find(a => a.id === id);
    toast({
      title: alert?.active ? "Alert Paused" : "Alert Activated",
      description: alert?.active 
        ? "You won't receive notifications for this alert." 
        : "You'll now receive notifications for this alert.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-irctc-dark-gray">Fare Alerts</h1>
          <p className="text-irctc-medium-gray mt-3 max-w-2xl mx-auto">
            Get notified when ticket prices drop below your threshold for your desired routes
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium">How Fare Alerts Work</AlertTitle>
            <AlertDescription className="text-blue-700">
              Set a maximum price you're willing to pay, and we'll notify you when fares drop below that amount. 
              You can create multiple alerts for different routes and dates.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-irctc-dark-gray">Your Fare Alerts</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-irctc-royal-blue text-white rounded-md flex items-center"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : 'New Alert'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showCreateForm && (
              <CreateAlertForm onSubmit={handleCreateAlert} />
            )}
          </AnimatePresence>

          <div className="space-y-4 mt-6">
            <AnimatePresence>
              {fareAlerts.length === 0 && !showCreateForm ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg"
                >
                  <BellRing className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">No Fare Alerts Yet</h3>
                  <p className="text-gray-500 mb-4">Create your first alert to start tracking prices</p>
                  <button
                    className="px-4 py-2 bg-irctc-royal-blue text-white rounded-md"
                    onClick={() => setShowCreateForm(true)}
                  >
                    Create First Alert
                  </button>
                </motion.div>
              ) : (
                fareAlerts.map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    onDelete={handleDeleteAlert}
                    onToggle={handleToggleAlert}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FareAlert;
