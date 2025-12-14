import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX / innerWidth - 0.5;
      const y = clientY / innerHeight - 0.5;
      mouseX.set(x * 50); // increased range
      mouseY.set(y * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-foreground text-background">
      {/* Background Pattern */}
      <motion.div
        style={{ x: useTransform(springX, (val) => val * -1), y: useTransform(springY, (val) => val * -1) }}
        className="absolute inset-0 opacity-[0.03]"
      >
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
      </motion.div>

      {/* Left Model */}
      <motion.img
        src="/hero-model-left.png"
        alt="Model"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[35vh] lg:w-[65vh] max-h-[85vh] object-contain object-bottom -z-0 hidden md:block grayscale"
      />

      {/* Right Model */}
      <motion.img
        src="/hero-model-right.png"
        alt="Model"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-[35vh] lg:w-[65vh] max-h-[85vh] object-contain object-bottom -z-0 hidden md:block grayscale"
      />

      <motion.div style={{ y: y1 }} className="container relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-background/60 mb-8"
          >
            New Season Drop
          </motion.p>

          {/* Main Title */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-center mb-8"
            >
              <img
                src="/oppozite-logo.png"
                alt="OPPOZITE"
                className="w-[80vw] md:w-[20vw] max-w-2xl object-contain mb-4"
              />
              <span className="font-display italic text-[8vw] md:text-[6vw] text-background/80 leading-[0.9] tracking-tight">
                WEAR THE VIBE
              </span>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-12 font-light"
          >
            Stand out from the crowd. Premium streetwear
            designed for those who dare to be different.
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

          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ y: y2, opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-2"
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
