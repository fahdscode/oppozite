import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShopifyCollections } from "@/hooks/useShopifyCollections";

export const Lookbook = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: collections, isLoading } = useShopifyCollections(5);

    // Horizontal scroll parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    if (isLoading) {
        return (
            <section className="py-24 md:py-32 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </section>
        );
    }

    if (!collections || collections.length === 0) return null;

    return (
        <section ref={containerRef} className="py-24 md:py-32 overflow-hidden bg-background">
            <div className="container mb-8 md:mb-12 flex items-end justify-between">
                <div>
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Editorial
                    </span>
                    <h2 className="font-display text-5xl md:text-7xl">LOOKBOOK</h2>
                </div>
                <div className="hidden md:block">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">
                        Drag to Explore
                    </span>
                </div>
            </div>

            <motion.div
                className="cursor-grab active:cursor-grabbing pl-4 md:pl-[max(1rem,calc((100vw-1400px)/2))]"
            >
                <motion.div
                    className="flex gap-4 md:gap-8 w-max"
                    drag="x"
                    dragConstraints={{ left: -2000, right: 0 }}
                    style={{ x }}
                >
                    {collections.map((edge) => {
                        const collection = edge.node;
                        return (
                            <div
                                key={collection.id}
                                className="relative w-[70vw] md:w-[30vw] aspect-[3/4] group overflow-hidden"
                            >
                                {
                                    (collection.image?.url || collection.products.edges[0]?.node.images.edges[0]?.node.url) ? (
                                        <img
                                            src={collection.image?.url || collection.products.edges[0]?.node.images.edges[0]?.node.url}
                                            alt={collection.image?.altText || collection.products.edges[0]?.node.images.edges[0]?.node.altText || collection.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <span className="text-white font-display text-3xl tracking-wide">{collection.title}</span>
                                    <Link
                                        to={`/shop?collection=${collection.handle}`}
                                        className="text-white text-xs tracking-widest uppercase mt-2 flex items-center gap-2"
                                    >
                                        Shop Collection <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    {/* View All Card */}
                    <Link
                        to="/collections"
                        className="w-[30vw] md:w-[20vw] aspect-[3/4] bg-muted flex items-center justify-center group hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <span className="font-display text-4xl">VIEW ALL</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};
