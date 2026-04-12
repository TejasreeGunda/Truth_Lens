import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Analytics from "./pages/Analytics";
import ChartsPage from "./pages/ChartsPage";
import LearningHub from "./pages/LearningHub";
import HistoryPage from "./pages/HistoryPage";
import AlertsPage from "./pages/AlertsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/analyzer" element={<AppLayout><Analyzer /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
          <Route path="/charts" element={<AppLayout><ChartsPage /></AppLayout>} />
          <Route path="/learn" element={<AppLayout><LearningHub /></AppLayout>} />
          <Route path="/history" element={<AppLayout><HistoryPage /></AppLayout>} />
          <Route path="/alerts" element={<AppLayout><AlertsPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
