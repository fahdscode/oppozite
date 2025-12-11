import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const GiftCards = () => {
    return (
        <Layout>
            <section className="py-20 md:py-32 bg-foreground text-background">
                <div className="container text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-center mb-6"
                    >
                        <Gift className="w-16 h-16 md:w-24 md:h-24" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl uppercase mb-6"
                    >
                        Gift Cards
                    </motion.h1>
                    <p className="text-background/60 max-w-xl mx-auto text-lg mb-8">
                        Give the gift of choice. Digital gift cards are delivered by email and contain instructions to redeem them at checkout.
                    </p>
                    <button className="bg-background text-foreground px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-background/90 transition-colors">
                        Coming Soon
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default GiftCards;
