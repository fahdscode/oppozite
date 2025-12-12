import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import NewArrivals from "./pages/NewArrivals";
import Collections from "./pages/Collections";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import BestSellers from "./pages/BestSellers";
import Sale from "./pages/Sale";
import GiftCards from "./pages/GiftCards";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/new" element={<NewArrivals />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Footer Pages */}
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
