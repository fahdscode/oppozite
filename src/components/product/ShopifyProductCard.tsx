import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopifyProduct, formatShopifyPrice, optimizeShopifyImage } from "@/lib/shopify";
import { getColorValue } from "@/lib/colors";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ShopifyProductCard = ({ product, index = 0 }: ShopifyProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantImage, setSelectedVariantImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { node } = product;

  // Cycle images on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && !selectedVariantImage && node.images.edges.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % node.images.edges.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, selectedVariantImage, node.images.edges.length]);

  // Derive initial images
  // Priority: 1. Selected Variant Image, 2. Hover Cycling Image, 3. Default (first) Image
  const activeImageUrl = selectedVariantImage || (isHovered ? node.images.edges[currentImageIndex]?.node.url : node.images.edges[0]?.node.url);
  const activeImageAlt = selectedVariantImage ? node.title : (isHovered ? node.images.edges[currentImageIndex]?.node.altText : node.images.edges[0]?.node.altText);

  const price = node.priceRange.minVariantPrice;
  const compareAtPrice = node.variants?.edges?.[0]?.node?.compareAtPrice;
  const isAvailable = node.variants?.edges?.some(v => v?.node?.availableForSale) ?? false;
  const isSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const handleColorClick = (e: React.MouseEvent, color: string) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();

    // Find variant with this color
    const variant = node.variants?.edges?.find(edge =>
      edge?.node?.selectedOptions?.some(opt => opt.name === "Color" && opt.value === color)
    );

    if (variant?.node.image) {
      setSelectedVariantImage(variant.node.image.url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className="product-card group border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl p-3 bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden rounded-lg">
        {activeImageUrl ? (
          <Link to={`/product/${node.handle}`} className="block absolute inset-0">
            <motion.img
              layoutId={`product-image-${node.handle}`}
              key={activeImageUrl} // Key change triggers animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={optimizeShopifyImage(activeImageUrl, 600)}
              alt={activeImageAlt || node.title}
              className="product-card-image absolute inset-0 w-full h-full object-cover"
            />
          </Link>
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
          {isSale && isAvailable && (
            <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs tracking-widest uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Quick View Button */}

      </div>

      {/* Details */}
      <Link to={`/product/${node.handle}`} className="block mt-4 space-y-1 group/link">
        <h3 className="text-sm font-medium tracking-wide group-hover/link:underline">
          {node.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatShopifyPrice(price.amount, price.currencyCode)}</span>
          {isSale && compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatShopifyPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </Link>

      {/* Color Pills - Outside Link to prevent invalid nesting and event conflicts */}
      {node.options.find(opt => opt.name === "Color") && (
        <div className="flex gap-2 mt-3">
          {node.options.find(opt => opt.name === "Color")?.values.slice(0, 5).map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => handleColorClick(e, color)}
              className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-foreground"
              style={{
                backgroundColor: (() => {
                  try {
                    const variant = node.variants?.edges?.find(v =>
                      v?.node?.selectedOptions?.some(opt => opt.name === "Color" && opt.value === color)
                    );
                    return getColorValue(color, variant?.node?.colorCode?.value);
                  } catch (e) {
                    return getColorValue(color);
                  }
                })()
              }}
              title={color}
            />
          ))}
          {(node.options.find(opt => opt.name === "Color")?.values.length || 0) > 5 && (
            <span className="text-[10px] text-muted-foreground flex items-center">
              +{(node.options.find(opt => opt.name === "Color")?.values.length || 0) - 5}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
