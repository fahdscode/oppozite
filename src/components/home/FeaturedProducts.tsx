import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { ShopifyProductCard } from "@/components/product/ShopifyProductCard";

import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyCollectionProducts } from "@/hooks/useShopifyProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedProducts = () => {

  // Fetch products from 'new-drops' collection
  const { data: collectionData, isLoading, error } = useShopifyCollectionProducts("new-drops", 8);
  const products = collectionData?.pages.flatMap(page => page?.products || []) || [];

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
              to="/shop?collection=new-drops"
              className="group flex items-center gap-2 text-sm tracking-widest uppercase mt-4 md:mt-0 hover:gap-4 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Products Carousel */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Failed to load products</p>
          </div>
        ) : products && products.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={product.node.id} className="pl-4 basis-1/2 md:basis-1/4">
                  <ShopifyProductCard
                    product={product}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 translate-x-0" />
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>
          </Carousel>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-2">No products found in New Drops collection</p>
            <p className="text-sm text-muted-foreground">
              Create a "New Drops" collection in Shopify to see products here!
            </p>
          </div>
        )}
      </div>


    </section>
  );
};
