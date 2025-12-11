import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

import { StatementSection } from "@/components/home/StatementSection";
import { Lookbook } from "@/components/home/Lookbook";
import { VideoManifesto } from "@/components/home/VideoManifesto";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <Lookbook />
      <StatementSection />

      <VideoManifesto />
    </Layout>
  );
};

export default Index;
