import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        FAQs
                    </motion.h1>
                    <p className="text-center mt-4 text-background/60 max-w-xl mx-auto">
                        Frequently Asked Questions
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                            <AccordionContent>
                                Orders within Cairo typically arrive within 2-3 business days. For other governorates, please allow 3-5 business days.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What is your return policy?</AccordionTrigger>
                            <AccordionContent>
                                We accept returns within 14 days of purchase, provided the items are unworn, unwashed, and in their original packaging with all tags attached, in accordance with Egyptian Consumer Protection laws.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How do I find my size?</AccordionTrigger>
                            <AccordionContent>
                                Please refer to our <a href="/size-guide" className="underline hover:no-underline">Size Guide</a> to find the best fit for you.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                            <AccordionContent>
                                Currently, we only ship within Egypt. We are working on expanding our shipping capabilities soon.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                            <AccordionContent>
                                If you need to make changes, please contact our customer service immediately. Once an order has been dispatched, we cannot modify it.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </Layout>
    );
};

export default FAQ;
