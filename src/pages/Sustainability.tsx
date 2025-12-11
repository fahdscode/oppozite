import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Sustainability = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Sustainability
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl prose prose-lg text-foreground/80">
                    <h3>Our Commitment</h3>
                    <p>
                        At Oppozite, we believe that style shouldn't come at the expense of our planet. We are committed to making responsible choices in every step of our production process.
                    </p>

                    <h3>Materials</h3>
                    <p>
                        We strive to use high-quality, durable materials that are designed to last. We are actively transitioning towards more sustainable fabrics, including organic cotton and recycled blends.
                    </p>

                    <h3>Production</h3>
                    <p>
                        We work with local manufacturers in Egypt to ensure fair labor practices and reduce our carbon footprint associated with transportation. Supporting local craftsmanship is at the core of our brand.
                    </p>

                    <h3>Packaging</h3>
                    <p>
                        Our packaging is designed to be minimal and recyclable, reducing waste wherever possible.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Sustainability;
