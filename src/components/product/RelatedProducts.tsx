import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display uppercase tracking-wider text-center mb-12"
        >
          You May Also Like
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
