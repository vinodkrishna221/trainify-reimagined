
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar, MapPin, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FareAlert } from '@/context/AlertContext';

interface AlertCardProps {
  alert: FareAlert;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onDelete, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg text-irctc-dark-gray">Price Alert</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-irctc-medium-gray">
                {alert.active ? 'Active' : 'Inactive'}
              </span>
              <Switch 
                checked={alert.active} 
                onCheckedChange={() => onToggle(alert.id)}
                aria-label={`Toggle alert ${alert.active ? 'off' : 'on'}`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-irctc-royal-blue mt-0.5 mr-2" />
                <div>
                  <div className="text-sm text-irctc-medium-gray">From</div>
                  <div className="font-medium">{alert.fromStation}</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-irctc-light-blue mt-0.5 mr-2" />
                <div>
                  <div className="text-sm text-irctc-medium-gray">To</div>
                  <div className="font-medium">{alert.toStation}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-irctc-royal-blue mt-0.5 mr-2" />
                <div>
                  <div className="text-sm text-irctc-medium-gray">Travel Date</div>
                  <div className="font-medium">{alert.date}</div>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-irctc-orange mt-0.5 mr-2" />
                <div>
                  <div className="text-sm text-irctc-medium-gray">Price Threshold</div>
                  <div className="font-medium">₹{alert.priceThreshold}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-irctc-medium-gray">
            Notifications will be sent to: <span className="font-medium">{alert.email}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(alert.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AlertCard;
