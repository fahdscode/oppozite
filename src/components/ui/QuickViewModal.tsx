import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [isOpen]);

  const handleAddToBag = () => {
    if (!product || !selectedSize) return;
    addItem(product, selectedSize, quantity);
    onClose();
  };

  const handleViewDetails = () => {
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/60 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-background z-50 overflow-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 md:p-12 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {product.isNew && (
                    <span className="inline-block px-3 py-1 bg-foreground text-background text-xs tracking-widest uppercase mb-4">
                      New
                    </span>
                  )}
                  <h2 className="font-display text-4xl md:text-5xl mb-2">{product.name}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 flex-1"
                >
                  {/* Size Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm tracking-widest uppercase">Size</span>
                      <button className="text-sm underline text-muted-foreground hover:text-foreground transition-colors">
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[3rem] px-4 py-3 border text-sm transition-all ${
                            selectedSize === size
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && (
                      <p className="text-xs text-muted-foreground mt-2">Please select a size</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <span className="text-sm tracking-widest uppercase mb-3 block">Quantity</span>
                    <div className="flex items-center border border-border w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-4 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-4 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-3"
                >
                  <button
                    onClick={handleAddToBag}
                    disabled={product.isSoldOut || !selectedSize}
                    className={`w-full btn-primary ${
                      (product.isSoldOut || !selectedSize) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {product.isSoldOut ? "Sold Out" : "Add to Bag"}
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={handleViewDetails}
                    className="w-full btn-outline block text-center"
                  >
                    View Full Details
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
