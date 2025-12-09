import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { Product } from "@/types/product";

const NewArrivalsPage = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newProducts = products.filter(p => p.isNew);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-background/60 mb-4 block"
          >
            Just Dropped
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl"
          >
            NEW ARRIVALS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-background/60 mt-4 max-w-md mx-auto"
          >
            The latest additions to our collection. Get them before they're gone.
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {newProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                index={index}
              />
            ))}
          </div>

          {newProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No new arrivals at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Layout>
  );
};

export default NewArrivalsPage;
