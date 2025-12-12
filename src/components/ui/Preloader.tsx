import { motion } from "framer-motion";

export const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            >
                <img src="/logo.png" alt="Oppozite Wears" className="w-32 md:w-48 h-auto" />
            </motion.div>
        </motion.div>
    );
};
