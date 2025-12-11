import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Returns = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Returns
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl prose prose-lg text-foreground/80">
                    <h3>Our Policy</h3>
                    <p>
                        In compliance with the <strong>Egyptian Consumer Protection Agency (CPA)</strong> regulations, customers have the right to exchange or return a product within <strong>14 days</strong> of the purchase date, provided that the product is in its original condition.
                    </p>
                    <p>
                        If the product is defective or does not match the specifications, you have the right to return it within <strong>30 days</strong>.
                    </p>

                    <h3>Conditions for Return</h3>
                    <ul>
                        <li>The item must be unworn, unwashed, and in its original condition.</li>
                        <li>All original tags and packaging must be intact.</li>
                        <li>The original receipt or proof of purchase is required.</li>
                    </ul>

                    <h3>Non-Returnable Items</h3>
                    <p>
                        For hygiene reasons, we cannot accept returns on:
                    </p>
                    <ul>
                        <li>Underwear and swimwear</li>
                        <li>Socks</li>
                        <li>Face masks</li>
                    </ul>

                    <h3>How to Initiate a Return</h3>
                    <ol>
                        <li>Contact our customer service via the Contact Us page or email.</li>
                        <li>Provide your order number and the reason for the return.</li>
                        <li>Our courier will contact you to schedule a pickup.</li>
                    </ol>

                    <h3>Refunds</h3>
                    <p>
                        Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and a credit will strictly be applied to your original method of payment or provided as store credit, depending on your preference.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Returns;
