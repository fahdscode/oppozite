import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Shipping = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Shipping
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl prose prose-lg">
                    <h3>Delivery Areas</h3>
                    <p>
                        We currently ship to all governorates in Egypt.
                    </p>

                    <h3>Delivery Times</h3>
                    <ul>
                        <li><strong>Cairo & Giza:</strong> 2-3 business days</li>
                        <li><strong>Alexandria:</strong> 3-4 business days</li>
                        <li><strong>Delta & Canal Cities:</strong> 3-4 business days</li>
                        <li><strong>Upper Egypt:</strong> 4-6 business days</li>
                    </ul>

                    <h3>Shipping Costs</h3>
                    <p>
                        Shipping costs are calculated at checkout based on your location.
                        Free shipping is available for orders over 2000 EGP.
                    </p>

                    <h3>Order Tracking</h3>
                    <p>
                        Once your order is shipped, you will receive a confirmation email (or SMS) with a tracking number or a link to track your order status.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Shipping;
