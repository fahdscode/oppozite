import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Terms = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl text-center uppercase"
                    >
                        Terms & Conditions
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl prose prose-lg text-foreground/80">
                    <p className="italic text-sm text-foreground/60 mb-8">Last Updated: October 2024</p>

                    <p>
                        Welcome to Oppozite. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully.
                    </p>

                    <h3>1. General</h3>
                    <p>
                        These terms apply to all users of the site and all purchases made on Oppozite. We reserve the right to update these terms at any time.
                    </p>

                    <h3>2. Pricing and Currency</h3>
                    <p>
                        All prices displayed on our store are in <strong>Egyptian Pounds (EGP)</strong> and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice.
                    </p>

                    <h3>3. Orders and Acceptance</h3>
                    <p>
                        We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies in errors in product or pricing information, or problems identified by our fraud avoidance department.
                    </p>

                    <h3>4. Shipping and Delivery</h3>
                    <p>
                        Delivery times are estimates and start from the date of shipping, rather than the date of order. We are not responsible for delays caused by customs, natural occurrences, or air/ground transportation strikes or delays.
                    </p>

                    <h3>5. Governing Law</h3>
                    <p>
                        These Terms and Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the <strong>Arab Republic of Egypt</strong>. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of <strong>Cairo, Egypt</strong>.
                    </p>

                    <h3>6. Contact Information</h3>
                    <p>
                        Questions about the Terms and Conditions should be sent to us at <a href="mailto:legal@oppozite.com">legal@oppozite.com</a>.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Terms;
