import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-foreground text-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            hsl(var(--background)) 100px,
            hsl(var(--background)) 101px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 100px,
            hsl(var(--background)) 100px,
            hsl(var(--background)) 101px
          )`
        }} />
      </div>

      <div className="container relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-background/60 mb-8"
          >
            Fall / Winter 2024
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight mb-8"
          >
            DEFINE
            <br />
            YOUR
            <br />
            <span className="italic">VYBE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-12 font-light"
          >
            Bold streetwear for those who dare to stand out. 
            Authentic. Unapologetic. You.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="group bg-background text-foreground px-10 py-5 text-sm tracking-widest uppercase font-medium flex items-center gap-3 hover:gap-5 transition-all"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/new"
              className="border border-background/50 text-background px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-background hover:text-foreground transition-all"
            >
              New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase text-background/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-8 bg-background/40"
        />
      </motion.div>
    </section>
  );
};
