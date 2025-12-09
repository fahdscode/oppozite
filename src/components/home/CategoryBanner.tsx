import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Tops",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop",
    path: "/shop?category=tops",
  },
  {
    name: "Bottoms",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    path: "/shop?category=bottoms",
  },
  {
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
    path: "/shop?category=outerwear",
  },
];

export const CategoryBanner = () => {
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
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={category.path}
                className="group block relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl md:text-5xl text-background tracking-wider">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
