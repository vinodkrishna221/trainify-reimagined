
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import BookTrain from "./pages/BookTrain";
import TrainList from "./pages/TrainList";
import TrackTrain from "./pages/TrackTrain";
import TrainSchedule from "./pages/TrainSchedule";
import CancelTicket from "./pages/CancelTicket";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-train" element={<BookTrain />} />
          <Route path="/train-list" element={<TrainList />} />
          <Route path="/track-train" element={<TrackTrain />} />
          <Route path="/train-schedule" element={<TrainSchedule />} />
          <Route path="/cancel-ticket" element={<CancelTicket />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
