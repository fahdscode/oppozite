import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const collections = [
  {
    id: "1",
    name: "URBAN EDGE",
    description: "Bold silhouettes for city life",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1000&fit=crop",
    path: "/shop?collection=urban-edge",
  },
  {
    id: "2",
    name: "MINIMALIST",
    description: "Less is more",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    path: "/shop?collection=minimalist",
  },
  {
    id: "3",
    name: "STREET LUXE",
    description: "Where comfort meets couture",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
    path: "/shop?collection=street-luxe",
  },
];

const CollectionsPage = () => {
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
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  to={collection.path}
                  className={`group grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                      Collection {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-5xl md:text-7xl mt-2 mb-4 group-hover:translate-x-4 transition-transform duration-300">
                      {collection.name}
                    </h2>
                    <p className="text-muted-foreground text-lg">{collection.description}</p>
                    <span className="inline-block mt-6 text-sm tracking-widest uppercase border-b border-foreground pb-1">
                      Explore Collection
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;
