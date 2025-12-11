import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";
import { ShopifyQuickViewModal } from "@/components/ui/ShopifyQuickViewModal";
import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const collectionTitles: Record<string, string> = {
  "urban-edge": "URBAN EDGE",
  "minimalist": "MINIMALIST",
  "street-luxe": "STREET LUXE",
};

const collectionQueries: Record<string, string> = {
  "urban-edge": "tag:urban-edge OR tag:urban",
  "minimalist": "tag:minimalist OR tag:minimal",
  "street-luxe": "tag:street-luxe OR tag:streetwear",
};

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const collection = searchParams.get("collection");
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  
  const searchQuery = collection ? collectionQueries[collection] : undefined;
  const { data: products, isLoading, error } = useShopifyProducts(50, searchQuery);
  
  const pageTitle = collection ? collectionTitles[collection] || "SHOP" : "SHOP ALL";

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl text-center"
          >
            {pageTitle}
          </motion.h1>
          {collection && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-4 text-background/60 tracking-widest text-sm uppercase"
            >
              Collection
            </motion.p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load products</p>
            </div>
          ) : products && products.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            >
              {products.map((product, index) => (
                <ShopifyProductCard
                  key={product.node.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-lg">
              <p className="text-xl font-medium mb-2">No products found</p>
              <p className="text-muted-foreground">
                Tell me what products you'd like to add to your store!
              </p>
            </div>
          )}
        </div>
      </section>

      <ShopifyQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Layout>
  );
};

export default ShopPage;
