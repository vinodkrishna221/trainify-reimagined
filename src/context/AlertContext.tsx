
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FareAlert {
  id: string;
  fromStation: string;
  toStation: string;
  date: string;
  priceThreshold: number;
  email: string;
  active: boolean;
}

interface AlertContextType {
  fareAlerts: FareAlert[];
  addFareAlert: (alert: Omit<FareAlert, 'id'>) => void;
  removeFareAlert: (id: string) => void;
  toggleAlertStatus: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fareAlerts, setFareAlerts] = useState<FareAlert[]>([
    {
      id: '1',
      fromStation: 'New Delhi (NDLS)',
      toStation: 'Mumbai CST (CSTM)',
      date: '2023-12-15',
      priceThreshold: 1200,
      email: 'user@example.com',
      active: true
    },
    {
      id: '2',
      fromStation: 'Bengaluru (SBC)',
      toStation: 'Chennai Central (MAS)',
      date: '2023-12-20',
      priceThreshold: 800,
      email: 'user@example.com',
      active: true
    }
  ]);

  const addFareAlert = (alert: Omit<FareAlert, 'id'>) => {
    const newAlert = {
      ...alert,
      id: Date.now().toString()
    };
    setFareAlerts([...fareAlerts, newAlert]);
  };

  const removeFareAlert = (id: string) => {
    setFareAlerts(fareAlerts.filter(alert => alert.id !== id));
  };

  const toggleAlertStatus = (id: string) => {
    setFareAlerts(
      fareAlerts.map(alert => 
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <AlertContext.Provider value={{ fareAlerts, addFareAlert, removeFareAlert, toggleAlertStatus }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
