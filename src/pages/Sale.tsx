import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";
import { useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { ShopifyQuickViewModal } from "@/components/ui/ShopifyQuickViewModal";

const Sale = () => {
    // Query for items that are on sale
    const { data: products, isLoading, error } = useShopifyProducts(20, "tag:sale OR tag:clearance");
    const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);

    return (
        <Layout>
            <section className="py-16 md:py-24 bg-red-600 text-white">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Sale
                    </motion.h1>
                    <p className="text-center mt-4 text-white/80 max-w-xl mx-auto">
                        Limited time offers on select styles. Don't miss out.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
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
                        <div className="text-center py-20">
                            <p className="text-xl font-medium mb-2">No active sales right now.</p>
                            <p className="text-muted-foreground">Sign up for our newsletter to get notified of the next drop.</p>
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

export default Sale;
