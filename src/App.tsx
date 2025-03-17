
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";

// Loading fallback component
import { Skeleton } from "@/components/ui/skeleton";

// Lazy loaded components
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const BookTrain = lazy(() => import("./pages/BookTrain"));
const TrainList = lazy(() => import("./pages/TrainList"));
const TrackTrain = lazy(() => import("./pages/TrackTrain"));
const TrainSchedule = lazy(() => import("./pages/TrainSchedule"));
const CancelTicket = lazy(() => import("./pages/CancelTicket"));
const PNRStatus = lazy(() => import("./pages/PNRStatus"));
const FareAlert = lazy(() => import("./pages/FareAlert"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Removed the 'suspense: false' property that was causing the error
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AlertProvider>
  </QueryClientProvider>
);

export default App;
