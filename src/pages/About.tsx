import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/about/hero-bg.png"
            alt="Oppozite Aesthetics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-9xl mb-6"
          >
            OUR STORY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Redefining streetwear through the lens of modern luxury.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl mb-8">THE VISION</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Oppozite was born from a simple belief: fashion should empower you to be
                  unapologetically yourself. We exist at the intersection of bold expression
                  and refined minimalism.
                </p>
                <p>
                  We create for the bold, the expressive, the ones who don't wait
                  for trends—they make them. Our designs blend streetwear edge with
                  contemporary sophistication, crafted for those who see fashion as
                  a form of self-expression.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] bg-muted overflow-hidden"
            >
              <img
                src="/about/vision.png"
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video md:aspect-square bg-white overflow-hidden order-2 md:order-1"
            >
              <img
                src="/about/studio.png"
                alt="Design Process"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="font-display text-4xl mb-8">THE CRAFT</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Quality without compromise. Every piece is designed in-house and
                  crafted with intention. We believe in slow fashion—pieces made to
                  last, styles that transcend seasons, and a wardrobe that evolves
                  with you.
                </p>
                <p>
                  From the initial sketch to the final stitch, our process is governed
                  by an obsession with detail. We source premium fabrics that feel
                  as good as they look, ensuring that "Oppozite" isn't just a label,
                  but a promise of excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
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
                <span className="font-display text-5xl md:text-6xl block mb-2">{stat.number}</span>
                <p className="text-sm text-gray-400 tracking-widest uppercase">
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
