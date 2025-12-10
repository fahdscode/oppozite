import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopifyProduct, formatShopifyPrice } from "@/lib/shopify";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  onQuickView: (product: ShopifyProduct) => void;
  index?: number;
}

export const ShopifyProductCard = ({ product, onQuickView, index = 0 }: ShopifyProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { node } = product;
  
  const mainImage = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;
  const price = node.priceRange.minVariantPrice;
  const isAvailable = node.variants.edges.some(v => v.node.availableForSale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {mainImage ? (
          <>
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className={`product-card-image absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered && hoverImage ? "opacity-0" : "opacity-100"
              }`}
            />
            
            {hoverImage && (
              <img
                src={hoverImage.url}
                alt={hoverImage.altText || node.title}
                className={`product-card-image absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}

        {/* Overlay */}
        <div className="product-card-overlay" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!isAvailable && (
            <span className="bg-muted text-foreground px-3 py-1 text-xs tracking-widest uppercase">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="quick-view-btn"
        >
          Quick View
        </button>
      </div>

      {/* Details */}
      <Link to={`/product/${node.handle}`} className="block mt-4 space-y-1 group/link">
        <h3 className="text-sm font-medium tracking-wide group-hover/link:underline">
          {node.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatShopifyPrice(price.amount, price.currencyCode)}</span>
        </div>
      </Link>
    </motion.div>
  );
};
