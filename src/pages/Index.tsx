import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryBanner } from "@/components/home/CategoryBanner";
import { StatementSection } from "@/components/home/StatementSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <StatementSection />
      <CategoryBanner />
    </Layout>
  );
};

export default Index;
