import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl text-center"
          >
            OUR STORY
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              VYBE was born from a simple belief: fashion should empower you to be 
              unapologetically yourself.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div>
                <h3 className="font-display text-3xl mb-4">THE VISION</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We create for the bold, the expressive, the ones who don't wait 
                  for trends—they make them. Our designs blend streetwear edge with 
                  contemporary sophistication, crafted for those who see fashion as 
                  a form of self-expression.
                </p>
              </div>
              <div>
                <h3 className="font-display text-3xl mb-4">THE MISSION</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quality without compromise. Every piece is designed in-house and 
                  crafted with intention. We believe in slow fashion—pieces made to 
                  last, styles that transcend seasons, and a wardrobe that evolves 
                  with you.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Community Members" },
              { number: "200+", label: "Unique Designs" },
              { number: "15", label: "Countries Shipped" },
              { number: "100%", label: "Authentic" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="font-display text-5xl md:text-6xl">{stat.number}</span>
                <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
