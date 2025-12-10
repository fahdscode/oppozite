import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { ShopifyProduct, formatShopifyPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ShopifyQuickViewModalProps {
  product: ShopifyProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShopifyQuickViewModal = ({ product, isOpen, onClose }: ShopifyQuickViewModalProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOptions({});
      setQuantity(1);
    } else if (product) {
      // Pre-select first available option for each
      const initialOptions: Record<string, string> = {};
      product.node.options.forEach(option => {
        initialOptions[option.name] = option.values[0];
      });
      setSelectedOptions(initialOptions);
    }
  }, [isOpen, product]);

  const getSelectedVariant = () => {
    if (!product) return null;
    
    return product.node.variants.edges.find(variant => {
      return variant.node.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value
      );
    })?.node;
  };

  const selectedVariant = getSelectedVariant();
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToBag = () => {
    if (!product || !selectedVariant) return;
    
    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });
    
    toast.success("Added to bag", {
      description: `${product.node.title} has been added to your bag.`,
    });
    onClose();
  };

  const handleViewDetails = () => {
    onClose();
  };

  if (!product) return null;

  const { node } = product;
  const mainImage = node.images.edges[0]?.node;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
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
                {mainImage ? (
                  <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    src={mainImage.url}
                    alt={mainImage.altText || node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-8 md:p-12 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-display text-4xl md:text-5xl mb-2">{node.title}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    {selectedVariant && (
                      <span className="text-2xl">
                        {formatShopifyPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                      </span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 flex-1"
                >
                  {/* Options Selection */}
                  {node.options.map((option) => (
                    <div key={option.name}>
                      <span className="text-sm tracking-widest uppercase mb-3 block">
                        {option.name}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                            className={`min-w-[3rem] px-4 py-3 border text-sm transition-all ${
                              selectedOptions[option.name] === value
                                ? "border-foreground bg-foreground text-background"
                                : "border-border hover:border-foreground"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

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
                    disabled={!isAvailable || !selectedVariant}
                    className={`w-full btn-primary ${
                      (!isAvailable || !selectedVariant) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {!isAvailable ? "Sold Out" : "Add to Bag"}
                  </button>
                  <Link
                    to={`/product/${node.handle}`}
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
