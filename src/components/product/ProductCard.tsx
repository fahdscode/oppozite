import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export const ProductCard = ({ product, onQuickView, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`product-card-image absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && product.hoverImage ? "opacity-0" : "opacity-100"
          }`}
        />
        
        {/* Hover Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name}
            className={`product-card-image absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Overlay */}
        <div className="product-card-overlay" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-foreground text-background px-3 py-1 text-xs tracking-widest uppercase">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-background text-foreground px-3 py-1 text-xs tracking-widest uppercase border border-foreground">
              Sale
            </span>
          )}
          {product.isSoldOut && (
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
      <Link to={`/product/${product.id}`} className="block mt-4 space-y-1 group/link">
        <h3 className="text-sm font-medium tracking-wide group-hover/link:underline">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
