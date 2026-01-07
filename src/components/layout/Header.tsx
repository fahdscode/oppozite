import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { fetchShopifyMenu, type ShopifyMenuItem } from "@/lib/shopify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { login, openAccount } from "@/lib/auth";

// Fallback menu
const defaultNavLinks = [
  { name: "Shop All", path: "/shop" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
];

interface MenuItem {
  name: string;
  path: string;
  items?: MenuItem[];
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultNavLinks);

  const location = useLocation();
  const { totalItems, openCart } = useCartStore();
  const itemCount = totalItems();

  const transformUrl = (url: string) => {
    let path = url;
    try {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch (e) {
      // already relative or invalid
    }

    // Transform collection URLs to /shop?collection=handle
    if (path.startsWith('/collections/')) {
      const handle = path.split('/collections/')[1]?.replace(/\/$/, "");
      if (handle) {
        path = `/shop?collection=${handle}`;
      }
    }
    return path;
  };

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menu = await fetchShopifyMenu("header-menu");
        if (menu && menu.items.length > 0) {
          const mapItems = (items: ShopifyMenuItem[]): MenuItem[] => {
            return items.map((item) => ({
              name: item.title,
              path: transformUrl(item.url),
              items: item.items && item.items.length > 0 ? mapItems(item.items) : undefined
            }));
          };

          setMenuItems(mapItems(menu.items));
        }
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    loadMenu();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2"
            >
              <img src="/logo.png" alt="Oppozite Wears" className="h-8 md:h-10 w-auto" />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 btn-ghost flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 btn-ghost flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={login}>
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openAccount}>
                      My Orders
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <button
                onClick={openCart}
                className="p-2 btn-ghost flex items-center justify-center relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center"
                >
                  {itemCount}
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
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-2xl font-medium text-black">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
              <nav className="flex-1 p-8">
                {menuItems.map((link, index) => (
                  <MobileMenuItem
                    key={link.path + index}
                    item={link}
                    index={index}
                    onClose={() => setIsMenuOpen(false)}
                  />
                ))}
              </nav>
              <div className="p-8 border-t border-border flex flex-col gap-3">
                <button onClick={login} className="w-full btn-primary text-center">
                  Sign In
                </button>
                <button onClick={openAccount} className="w-full btn-outline text-center text-black">
                  My Orders
                </button>

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

const MobileMenuItem = ({
  item,
  index,
  onClose,
  level = 0
}: {
  item: MenuItem;
  index: number;
  onClose: () => void;
  level?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  // Reduce size for deeper levels
  const textSizeClass = level === 0 ? "text-4xl" : level === 1 ? "text-2xl" : "text-lg";
  const paddingLeft = level * 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      {hasChildren ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full py-4 font-display ${textSizeClass} text-black tracking-wide hover:translate-x-2 transition-transform text-left`}
          >
            <span>{item.name}</span>
            <ChevronDown
              className={`w-6 h-6 text-black transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {item.items!.map((subItem, subIndex) => (
                  <MobileMenuItem
                    key={subItem.path + subIndex}
                    item={subItem}
                    index={subIndex}
                    onClose={onClose}
                    level={level + 1}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          to={item.path}
          onClick={onClose}
          className={`block py-4 font-display ${textSizeClass} text-black tracking-wide hover:translate-x-2 transition-transform`}
        >
          {item.name}
        </Link>
      )}
    </motion.div>
  );
};
