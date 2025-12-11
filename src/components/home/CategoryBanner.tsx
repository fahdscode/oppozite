import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShopifyCollections } from "@/hooks/useShopifyCollections";

export const CategoryBanner = () => {
  const { data: collections, isLoading } = useShopifyCollections(3);

  if (isLoading || !collections || collections.length === 0) {
    return null; // or a loading skeleton if preferred, but simpler to hide until ready for a refined look
  }

  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Explore
          </span>
          <h2 className="font-display text-5xl md:text-7xl">SHOP BY CATEGORY</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {collections.slice(0, 3).map((edge, index) => {
            const category = edge.node;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  to={`/shop?collection=${category.handle}`}
                  className="group block relative aspect-[3/4] overflow-hidden"
                >
                  {category.image ? (
                    <img
                      src={category.image.url}
                      alt={category.image.altText || category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl md:text-5xl text-background tracking-wider">
                      {category.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

