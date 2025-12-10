import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, Ruler } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ImageGallery } from "@/components/product/ImageGallery";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { Product } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display uppercase mb-4">Product Not Found</h1>
          <Link to="/shop" className="underline hover:no-underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productImages = [product.image];
  if (product.hoverImage) {
    productImages.push(product.hoverImage);
  }
  // Add more placeholder images for gallery
  productImages.push(product.image, product.hoverImage || product.image);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough related products in same category, add from other categories
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter((p) => p.id !== product.id && !relatedProducts.includes(p))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...otherProducts);
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, quantity);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
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
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
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
            <ImageGallery images={productImages} productName={product.name} />
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
              {product.isNew && (
                <span className="px-3 py-1 bg-foreground text-background text-xs font-medium uppercase tracking-wider">
                  New
                </span>
              )}
              {product.originalPrice && (
                <span className="px-3 py-1 bg-foreground text-background text-xs font-medium uppercase tracking-wider">
                  Sale
                </span>
              )}
              {product.isSoldOut && (
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  Sold Out
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-wider mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium uppercase tracking-wider">
                  Select Size
                </span>
                <motion.button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.isSoldOut}
                    className={`min-w-[48px] h-12 px-4 border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    } ${product.isSoldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={!product.isSoldOut ? { scale: 1.05 } : {}}
                    whileTap={!product.isSoldOut ? { scale: 0.95 } : {}}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please select a size
                </p>
              )}
            </div>

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
              disabled={!selectedSize || product.isSoldOut}
              className={`w-full py-4 font-medium uppercase tracking-wider transition-all ${
                product.isSoldOut
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : selectedSize
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
              whileHover={selectedSize && !product.isSoldOut ? { scale: 1.02 } : {}}
              whileTap={selectedSize && !product.isSoldOut ? { scale: 0.98 } : {}}
            >
              {product.isSoldOut
                ? "Sold Out"
                : selectedSize
                ? "Add to Bag"
                : "Select a Size"}
            </motion.button>

            {/* Product Description */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Elevate your wardrobe with the {product.name}. Crafted with premium
                materials and designed with a modern silhouette, this piece is perfect
                for those who appreciate contemporary fashion with an edge. Features a
                relaxed fit that's both comfortable and stylish.
              </p>
            </div>

            {/* Product Details */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                Details
              </h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Premium quality materials</li>
                <li>• Relaxed, modern fit</li>
                <li>• Machine washable</li>
                <li>• Imported</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} onQuickView={setQuickViewProduct} />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />

      {/* Quick View Modal for Related Products */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </motion.div>
  );
};

export default ProductDetail;
