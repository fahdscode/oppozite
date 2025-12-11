import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you shortly.");
    };

    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Contact
                    </motion.h1>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-display mb-6">Get in Touch</h3>
                            <p className="text-muted-foreground mb-8">
                                Have a question or just want to say hi? We'd love to hear from you.
                                Fill out the form and we'll be in touch as soon as possible.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-1">Email</h4>
                                    <a href="mailto:hello@oppozite.com" className="text-muted-foreground hover:text-foreground transition-colors">hello@oppozite.com</a>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Social</h4>
                                    <div className="flex gap-4 text-muted-foreground">
                                        <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
                                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-6 md:p-8 rounded-lg">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input id="name" placeholder="Your name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input id="email" type="email" placeholder="Your email" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <Input id="subject" placeholder="What is this regarding?" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" required />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
