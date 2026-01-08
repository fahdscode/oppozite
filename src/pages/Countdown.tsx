import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();

            // Create date object for 4 PM Egypt time today
            const target = new Date(now);
            target.toLocaleString("en-US", { timeZone: "Africa/Cairo" });

            // We need to handle timezone correctly. 
            // The simplest robust way without external libs is to get the current time in Cairo, 
            // parse it, set the hours to 16 (4 PM), and then compare.

            // Get current time string in Cairo
            const cairoTimeString = new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });
            const cairoDate = new Date(cairoTimeString);

            const targetDate = new Date(cairoDate);
            targetDate.setHours(16, 0, 0, 0);

            // If it's already past 4 PM in Cairo, set target to tomorrow
            if (cairoDate > targetDate) {
                targetDate.setDate(targetDate.getDate() + 1);
            }

            // Calculate difference
            // Note: We need to be careful with mismatched timezones between 'now' (local) and 'targetDate' (which we constructed as local representation of Cairo time).
            // Actually, constructing 'targetDate' this way creates a local date with Cairo's HH:MM.
            // So we should compare it with 'cairoDate' which is also a local representation of Cairo time.

            const diff = targetDate.getTime() - cairoDate.getTime();

            if (diff > 0) {
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft({
                    hours: hours.toString().padStart(2, "0"),
                    minutes: minutes.toString().padStart(2, "0"),
                    seconds: seconds.toString().padStart(2, "0"),
                });
            } else {
                setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="min-h-screen bg-foreground text-background flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 100px,
                        hsl(var(--background)) 100px,
                        hsl(var(--background)) 101px
                    )`
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center"
            >
                <img
                    src="/oppozite-logo.png"
                    alt="OPPOZITE"
                    className="w-48 md:w-64 mx-auto mb-12 opacity-90"
                />

                <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-background/60 mb-8 font-light">
                    Website Releases In
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-12 font-display text-background">
                    <div className="flex flex-col items-center">
                        <span className="text-6xl md:text-9xl leading-none font-bold tracking-tighter">
                            {timeLeft.hours}
                        </span>
                        <span className="text-xs tracking-widest uppercase opacity-40 mt-4">Hours</span>
                    </div>
                    <span className="text-4xl md:text-6xl -mt-8 opacity-20">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-6xl md:text-9xl leading-none font-bold tracking-tighter">
                            {timeLeft.minutes}
                        </span>
                        <span className="text-xs tracking-widest uppercase opacity-40 mt-4">Minutes</span>
                    </div>
                    <span className="text-4xl md:text-6xl -mt-8 opacity-20">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-6xl md:text-9xl leading-none font-bold tracking-tighter text-gray-500">
                            {timeLeft.seconds}
                        </span>
                        <span className="text-xs tracking-widest uppercase opacity-40 mt-4">Seconds</span>
                    </div>
                </div>

                <div className="mt-20">
                    <p className="text-sm text-background/40 tracking-widest">
                        CAIRO TIME (UTC+2)
                    </p>
                </div>
            </motion.div>


        </section>
    );
};

export default Countdown;
