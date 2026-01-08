import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const VideoManifesto = () => {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source
                        src="/VERT_vid.mp4"
                        type="video/mp4"
                    />
                    {/* Fallback for browsers that don't support video */}
                    <div className="w-full h-full bg-neutral-900" />
                </video>
            </div>

            <div className="container relative z-20 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 block text-white/80">
                        Define Your Era
                    </span>
                    <h2 className="font-display text-[10vw] leading-none mb-8 mix-blend-overlay opacity-90">
                        UNAPOLOGETIC
                    </h2>
                    <p className="max-w-xl mx-auto text-lg md:text-xl font-light text-white/90 mb-10 leading-relaxed">
                        Fashion is the armor to survive the reality of everyday life.
                        We don't just sell clothes; we provide the attitude.
                    </p>
                    <Link
                        to="/shop?collection=shop-all"
                        className="inline-block border border-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Join The Movement
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
