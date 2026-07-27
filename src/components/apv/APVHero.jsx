import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function APVHero() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out the banner over the first 200px of scroll
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      setScrollOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 lg:left-72 xl:left-80">
      {/* Banner image */}
      <div
        className="relative w-full h-48 md:h-56 overflow-hidden"
        style={{ opacity: scrollOpacity, transition: "opacity 0.1s linear" }}
      >
        <img
          src="https://media.base44.com/images/public/69da87110207331e6fa9d00a/8c2f87bac_EF7CD34B-CB7F-442C-B06A-2C38BF86F158.png"
          alt="Kroonstad Roleplay"
          className="w-full h-full object-cover object-center"
        />
        {/* Bottom fade to blend into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Side darken for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* APV title below image */}
      <div
        className="text-center py-4 bg-background"
        style={{ opacity: scrollOpacity, transform: `translateY(${-20 * (1 - scrollOpacity)}px)`, transition: "opacity 0.1s linear, transform 0.1s linear" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg"
        >
          <span className="bg-gradient-to-b from-white via-yellow-100 to-primary bg-clip-text text-transparent">
            APV
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-white/50 mt-1"
        >
          Algemene Plaatselijke Verordening
        </motion.p>
      </div>
    </div>
  );
}
