import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types/product";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(results);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setFilteredProducts([]);
    onClose();
  };

  const handleProductClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[70] bg-background border-b border-border"
          >
            <div className="container mx-auto px-4">
              {/* Search Input */}
              <div className="flex items-center gap-4 h-20">
                <Search className="w-6 h-6 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-xl md:text-2xl font-light outline-none placeholder:text-muted-foreground"
                  maxLength={100}
                />
                <motion.button
                  onClick={handleClose}
                  className="p-2 hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {(query.trim() !== "" || filteredProducts.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="container mx-auto px-4 py-6 max-h-[60vh] overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-4">
                          {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for "{query}"
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {filteredProducts.map((product, index) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={`/product/${product.id}`}
                                onClick={handleProductClick}
                                className="group block"
                              >
                                <div className="aspect-[3/4] bg-secondary overflow-hidden mb-3">
                                  <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <h3 className="text-sm font-medium group-hover:underline">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  ${product.price}
                                </p>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : query.trim() !== "" ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-lg text-muted-foreground mb-2">
                          No results found for "{query}"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try searching for something else
                        </p>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Links when empty */}
            {query.trim() === "" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-border"
              >
                <div className="container mx-auto px-4 py-6">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Tops", "Bottoms", "Outerwear", "New Arrivals"].map((term) => (
                      <motion.button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-border text-sm hover:bg-foreground hover:text-background transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
