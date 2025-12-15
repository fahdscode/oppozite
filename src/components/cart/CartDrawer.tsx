import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Loader2, ExternalLink } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { formatShopifyPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
    isLoading,
    createCheckout
  } = useCartStore();

  const itemCount = totalItems();
  const total = totalPrice();

  const handleCheckout = async () => {
    await createCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-display text-2xl">YOUR BAG</span>
                <span className="text-sm text-muted-foreground">({itemCount})</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium mb-2">Your bag is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add some items to get started
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <div className="w-24 h-32 bg-muted overflow-hidden flex-shrink-0">
                          {item.product.node.images.edges[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{item.product.node.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.selectedOptions.map(opt => opt.value).join(' / ')}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => {
                                  const limit = item.quantityAvailable ?? Infinity;
                                  if (item.quantity < limit) {
                                    updateQuantity(item.variantId, item.quantity + 1);
                                  }
                                }}
                                disabled={item.quantity >= (item.quantityAvailable ?? Infinity)}
                                className={`p-2 transition-colors ${item.quantity >= (item.quantityAvailable ?? Infinity)
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-muted"
                                  }`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-medium">
                              {formatShopifyPrice(
                                (parseFloat(item.price.amount) * item.quantity).toString(),
                                item.price.currencyCode
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-border space-y-4"
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-medium">
                    {formatShopifyPrice(total.toString(), items[0]?.price.currencyCode || 'USD')}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Checkout...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Checkout
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full btn-outline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
