import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Careers = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Careers
                    </motion.h1>

                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-2xl text-center">
                    <h3 className="text-2xl font-medium mb-4">Join the Team</h3>
                    <p className="text-muted-foreground mb-8">
                        We are always looking for creative and passionate individuals to join our movement.
                    </p>

                    <div className="p-8 border border-dashed border-border rounded-lg">
                        <p className="text-lg mb-2">No current openings</p>
                        <p className="text-sm text-muted-foreground">
                            Check back later or follow us on social media for updates.
                        </p>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm">
                            Think you'd be a great fit anyway? specific
                            <br />
                            Email your portfolio/CV to <a href="mailto:careers@oppozite.com" className="underline hover:text-foreground/80">careers@oppozite.com</a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Careers;
