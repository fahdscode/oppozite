import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const StatementSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="container text-center"
      >
        <h2 className="font-display text-[8vw] md:text-[6vw] leading-[1.1] max-w-5xl mx-auto">
          WE DON'T FOLLOW
          <br />
          <span className="italic">TRENDS</span>
          <br />
          WE SET THEM
        </h2>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="absolute top-20 left-10 w-32 h-32 border border-border opacity-20"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 70]) }}
        className="absolute bottom-20 right-10 w-24 h-24 border border-border opacity-20"
      />
    </section>
  );
};
