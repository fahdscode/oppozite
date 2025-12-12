import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, Ruler, Loader2 } from "lucide-react";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice, ShopifyProduct } from "@/lib/shopify";
import { ImageGallery } from "@/components/product/ImageGallery";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";

import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/ui/SEO";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id: handle } = useParams<{ id: string }>();
  const addItem = useCartStore(state => state.addItem);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);


  const { data: product, isLoading, error } = useShopifyProduct(handle || '');
  const { data: allProducts } = useShopifyProducts(8);

  // Initialize selected options when product loads
  useEffect(() => {
    if (product) {
      const initialOptions: Record<string, string> = {};
      product.options.forEach(option => {
        initialOptions[option.name] = option.values[0];
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display uppercase mb-4">Product Not Found</h1>
            <Link to="/shop" className="underline hover:no-underline">
              Return to Shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const productImages = product.images.edges.map(img => img.node.url);

  // Get related products (excluding current product)
  const flattenedProducts = allProducts?.pages.flatMap(page => page.products) || [];
  const relatedProducts = flattenedProducts.filter(p => p.node.id !== product.id).slice(0, 4);

  const getSelectedVariant = () => {
    return product.variants.edges.find(variant => {
      return variant.node.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value
      );
    })?.node;
  };

  const selectedVariant = getSelectedVariant();
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Added to bag", {
      description: `${product.title} has been added to your bag.`,
    });
  };

  return (
    <Layout>
      <SEO
        title={`${product.title} | Oppozite Wears`}
        description={product.description}
        image={product.images.edges[0]?.node.url}
        type="product"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-8"
      >
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ImageGallery
                images={productImages}
                productName={product.title}
                layoutId={`product-image-${handle}`}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {!isAvailable && (
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-wider mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                {selectedVariant && (
                  <span className="text-2xl font-medium">
                    {formatShopifyPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                  </span>
                )}
              </div>

              {/* Options Selection */}
              {product.options.map((option) => (
                <div key={option.name} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Select {option.name}
                    </span>
                    {option.name.toLowerCase() === 'size' && (
                      <motion.button
                        onClick={() => setShowSizeGuide(true)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <Ruler className="w-4 h-4" />
                        Size Guide
                      </motion.button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <motion.button
                        key={value}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                        className={`min-w-[48px] h-12 px-4 border-2 font-medium transition-all ${selectedOptions[option.name] === value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-sm font-medium uppercase tracking-wider mb-3 block">
                  Quantity
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!isAvailable || !selectedVariant}
                className={`w-full py-4 font-medium uppercase tracking-wider transition-all ${!isAvailable
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                whileHover={isAvailable ? { scale: 1.02 } : {}}
                whileTap={isAvailable ? { scale: 0.98 } : {}}
              >
                {!isAvailable ? "Sold Out" : "Add to Bag"}
              </motion.button>

              {/* Product Description */}
              {product.description && (
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 md:py-24 border-t border-border">
            <div className="container">
              <h2 className="font-display text-4xl md:text-5xl text-center mb-12">
                YOU MAY ALSO LIKE
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map((product, index) => (
                  <ShopifyProductCard
                    key={product.node.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Size Guide Modal */}
        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          category="General"
        />


      </motion.div>
    </Layout>
  );
};

export default ProductDetail;
