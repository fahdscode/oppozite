import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";
import { SEO } from "@/components/ui/SEO";

import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyProducts, useShopifyCollectionProducts } from "@/hooks/useShopifyProducts";

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const collectionHandle = searchParams.get("collection");


  // If collection handle exists, fetch specific collection products
  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    error: collectionError,
    fetchNextPage: fetchNextCollectionPage,
    hasNextPage: hasNextCollectionPage,
    isFetchingNextPage: isFetchingNextCollectionPage
  } = useShopifyCollectionProducts(collectionHandle);

  // Fallback to all products if no collection selected
  const {
    data: allProducts,
    isLoading: isAllLoading,
    error: allError,
    fetchNextPage: fetchNextAllPage,
    hasNextPage: hasNextAllPage,
    isFetchingNextPage: isFetchingNextAllPage
  } = useShopifyProducts(20, undefined);

  const isLoading = collectionHandle ? isCollectionLoading : isAllLoading;
  const error = collectionHandle ? collectionError : allError;

  // Determine pagination props
  const fetchNextPage = collectionHandle ? fetchNextCollectionPage : fetchNextAllPage;
  const hasNextPage = collectionHandle ? hasNextCollectionPage : hasNextAllPage;
  const isFetchingNextPage = collectionHandle ? isFetchingNextCollectionPage : isFetchingNextAllPage;

  // Flatten products from pages
  const products = collectionHandle
    ? collectionData?.pages.flatMap(page => page?.products || [])
    : allProducts?.pages.flatMap(page => page.products || []);

  // Determine page title
  const pageTitle = collectionHandle
    ? (collectionData?.pages[0]?.title || collectionHandle.replace(/-/g, ' ').toUpperCase())
    : "SHOP ALL";

  return (
    <Layout>
      <SEO
        title={`${pageTitle} | Oppozite Wears`}
        description={collectionHandle ? `Shop the ${pageTitle} collection at Oppozite Wears.` : "Browse our full collection of premium streetwear."}
      />
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
          {collectionHandle && (
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
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
              >
                {products.map((product, index) => (
                  <ShopifyProductCard
                    key={`${product.node.id}-${index}`}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasNextPage && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-8 py-3 bg-foreground text-background font-medium uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
                  >
                    {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
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


    </Layout>
  );
};

export default ShopPage;
