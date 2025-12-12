import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

import { StatementSection } from "@/components/home/StatementSection";
import { Lookbook } from "@/components/home/Lookbook";
import { VideoManifesto } from "@/components/home/VideoManifesto";
import { SEO } from "@/components/ui/SEO";

const Index = () => {
  // SEO
  const seoTitle = "Oppozite Wears | Premium Streetwear";
  const seoDescription = "Oppozite Wears redefines streetwear with premium materials and avant-garde designs. Shop our latest collection.";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Layout>
          <SEO
            title={seoTitle}
            description={seoDescription}
          />
          <Hero />
          <Marquee />
          <FeaturedProducts />
          <Lookbook />
          <StatementSection />

          <VideoManifesto />
        </Layout>
      </motion.div>
    </>
  );
};

export default Index;
