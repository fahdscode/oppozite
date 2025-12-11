import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Privacy = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Privacy Policy
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl prose prose-lg text-foreground/80">
                    <p className="italic text-sm text-foreground/60 mb-8">Last Updated: October 2024</p>

                    <p>
                        At Oppozite, we are committed to protecting your personal data in accordance with the <strong>Egyptian Data Protection Law No. 151 of 2020</strong>. This Privacy Policy explains how we collect, use, and safeguard your information.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>We may collect personal data such as:</p>
                    <ul>
                        <li>Name, email address, phone number, and shipping address.</li>
                        <li>Order history and payment details (processed securely via third-party providers).</li>
                        <li>Device information and browsing behavior on our website.</li>
                    </ul>

                    <h3>2. How We Use Your Data</h3>
                    <p>We use your data for the following purposes:</p>
                    <ul>
                        <li>Processing and delivering your orders.</li>
                        <li>Communicating with you regarding your purchase or customer support.</li>
                        <li>Sending marketing communications (only if you have opted in).</li>
                        <li>Improving our website and services.</li>
                    </ul>

                    <h3>3. Data Sharing</h3>
                    <p>
                        We do not sell your personal data. We may share necessary information with trusted third parties solely for operational purposes, such as:
                    </p>
                    <ul>
                        <li>Shipping and logistics partners to deliver your order.</li>
                        <li>Payment gateways to process transactions.</li>
                    </ul>

                    <h3>4. Your Rights</h3>
                    <p>Under Egyptian law, you have the right to:</p>
                    <ul>
                        <li>Access the personal data we hold about you.</li>
                        <li>Request correction of inaccurate data.</li>
                        <li>Request deletion of your data ("Right to be Forgotten"), subject to legal retention requirements.</li>
                        <li>Withdraw consent for marketing communications at any time.</li>
                    </ul>

                    <h3>5. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at: <a href="mailto:privacy@oppozite.com">privacy@oppozite.com</a>
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Privacy;
