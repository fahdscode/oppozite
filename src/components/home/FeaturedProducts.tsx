import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";
import { ShopifyQuickViewModal } from "@/components/ui/ShopifyQuickViewModal";
import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

export const FeaturedProducts = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  const { data: products, isLoading, error } = useShopifyProducts(4);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Featured
            </span>
            <h2 className="font-display text-5xl md:text-7xl">NEW DROPS</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/shop"
              className="group flex items-center gap-2 text-sm tracking-widest uppercase mt-4 md:mt-0 hover:gap-4 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Failed to load products</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, index) => (
              <ShopifyProductCard
                key={product.node.id}
                product={product}
                onQuickView={setQuickViewProduct}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              Tell me what products you'd like to add to your store!
            </p>
          </div>
        )}
      </div>

      <ShopifyQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
