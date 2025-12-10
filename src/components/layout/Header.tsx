import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SearchOverlay } from "@/components/search/SearchOverlay";

const navLinks = [
  { name: "Shop All", path: "/shop" },
  { name: "New Arrivals", path: "/new" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems, openCart } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link text-xs tracking-widest uppercase ${
                    location.pathname === link.path ? "text-foreground" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 -translate-x-1/2 font-display text-3xl md:text-4xl tracking-wider"
            >
              VYBE
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 btn-ghost flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 btn-ghost hidden md:flex items-center justify-center">
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={openCart}
                className="p-2 btn-ghost flex items-center justify-center relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/20 z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-2xl">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-4 font-display text-4xl tracking-wide hover:translate-x-2 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-8 border-t border-border">
                <div className="flex gap-4">
                  <button className="flex-1 btn-outline text-center">
                    Sign In
                  </button>
                  <button className="flex-1 btn-primary text-center">
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
