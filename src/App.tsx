import { Suspense, lazy, useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";

// Loading fallback component
import { Skeleton } from "@/components/ui/skeleton";

// Create prefetching context
import React from "react";

const PrefetchContext = React.createContext<(componentPath: string) => void>(() => {});

// Lazy loaded components with explicit chunk names
const Index = lazy(() => import(/* webpackChunkName: "index" */ "./pages/Index"));
const Login = lazy(() => import(/* webpackChunkName: "login" */ "./pages/Login"));
const BookTrain = lazy(() => import(/* webpackChunkName: "book-train" */ "./pages/BookTrain"));
const TrainList = lazy(() => import(/* webpackChunkName: "train-list" */ "./pages/TrainList"));
const TrackTrain = lazy(() => import(/* webpackChunkName: "track-train" */ "./pages/TrackTrain"));
const TrainSchedule = lazy(() => import(/* webpackChunkName: "train-schedule" */ "./pages/TrainSchedule"));
const CancelTicket = lazy(() => import(/* webpackChunkName: "cancel-ticket" */ "./pages/CancelTicket"));
const PNRStatus = lazy(() => import(/* webpackChunkName: "pnr-status" */ "./pages/PNRStatus"));
const FareAlert = lazy(() => import(/* webpackChunkName: "fare-alert" */ "./pages/FareAlert"));
const HolidayPackages = lazy(() => import(/* webpackChunkName: "holiday-packages" */ "./pages/HolidayPackages"));
const Flights = lazy(() => import(/* webpackChunkName: "flights" */ "./pages/Flights"));
const Hotels = lazy(() => import(/* webpackChunkName: "hotels" */ "./pages/Hotels"));
const Help = lazy(() => import(/* webpackChunkName: "help" */ "./pages/Help"));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ "./pages/Dashboard"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));

// Component map for prefetching
const componentMap: Record<string, () => Promise<any>> = {
  "/": () => import(/* webpackChunkName: "index" */ "./pages/Index"),
  "/login": () => import(/* webpackChunkName: "login" */ "./pages/Login"),
  "/book-train": () => import(/* webpackChunkName: "book-train" */ "./pages/BookTrain"),
  "/train-list": () => import(/* webpackChunkName: "train-list" */ "./pages/TrainList"),
  "/track-train": () => import(/* webpackChunkName: "track-train" */ "./pages/TrackTrain"),
  "/train-schedule": () => import(/* webpackChunkName: "train-schedule" */ "./pages/TrainSchedule"),
  "/cancel-ticket": () => import(/* webpackChunkName: "cancel-ticket" */ "./pages/CancelTicket"),
  "/pnr-status": () => import(/* webpackChunkName: "pnr-status" */ "./pages/PNRStatus"),
  "/fare-alert": () => import(/* webpackChunkName: "fare-alert" */ "./pages/FareAlert"),
  "/holiday-packages": () => import(/* webpackChunkName: "holiday-packages" */ "./pages/HolidayPackages"),
  "/flights": () => import(/* webpackChunkName: "flights" */ "./pages/Flights"),
  "/hotels": () => import(/* webpackChunkName: "hotels" */ "./pages/Hotels"),
  "/help": () => import(/* webpackChunkName: "help" */ "./pages/Help"),
  "/dashboard": () => import(/* webpackChunkName: "dashboard" */ "./pages/Dashboard"),
};

// Prefetch provider component
const PrefetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefetchedRoutes, setPrefetchedRoutes] = useState<Set<string>>(new Set());

  const prefetchComponent = useCallback((route: string) => {
    if (prefetchedRoutes.has(route)) return;

    const importFn = componentMap[route];
    if (importFn) {
      // Prefetch the component
      console.log(`Prefetching component for route: ${route}`);
      importFn().then(() => {
        setPrefetchedRoutes(prev => new Set([...prev, route]));
      });
    }
  }, [prefetchedRoutes]);

  return (
    <PrefetchContext.Provider value={prefetchComponent}>
      {children}
    </PrefetchContext.Provider>
  );
};

// Custom Link component that prefetches on hover
export const usePrefetch = () => React.useContext(PrefetchContext);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-3/4 mx-auto rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </div>
      <Skeleton className="h-10 w-28 mx-auto rounded-lg" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AlertProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PrefetchProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book-train" element={<BookTrain />} />
                <Route path="/train-list" element={<TrainList />} />
                <Route path="/track-train" element={<TrackTrain />} />
                <Route path="/train-schedule" element={<TrainSchedule />} />
                <Route path="/cancel-ticket" element={<CancelTicket />} />
                <Route path="/pnr-status" element={<PNRStatus />} />
                <Route path="/fare-alert" element={<FareAlert />} />
                <Route path="/holiday-packages" element={<HolidayPackages />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/help" element={<Help />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PrefetchProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AlertProvider>
  </QueryClientProvider>
);

export default App;
