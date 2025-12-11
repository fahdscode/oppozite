import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useShopifyCollections } from "@/hooks/useShopifyCollections";

const CollectionsPage = () => {
  const { data: collections, isLoading, error } = useShopifyCollections();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading collections...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-red-500">Error loading collections. Please try again later.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl"
          >
            COLLECTIONS
          </motion.h1>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="space-y-8 md:space-y-16">
            {collections?.map((edge, index) => {
              const collection = edge.node;
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <Link
                    to={`/shop?collection=${collection.handle}`}
                    className={`group grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }`}
                  >
                    <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                        {collection.image ? (
                          <img
                            src={collection.image.url}
                            alt={collection.image.altText || collection.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image Available
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                      <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                        Collection {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-5xl md:text-7xl mt-2 mb-4 group-hover:translate-x-4 transition-transform duration-300">
                        {collection.title}
                      </h2>
                      <p className="text-muted-foreground text-lg line-clamp-3">
                        {collection.description}
                      </p>
                      <span className="inline-block mt-6 text-sm tracking-widest uppercase border-b border-foreground pb-1">
                        Explore Collection
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;

