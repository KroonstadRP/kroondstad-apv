import { motion } from "framer-motion";

export default function APVHero({ meta }) {
  return (
    <header className="lg:ml-72 xl:ml-80">
      {/* Banner image */}
      <div className="relative aspect-[1024/409] w-full overflow-hidden bg-background">
        <img
          src="https://media.base44.com/images/public/69da87110207331e6fa9d00a/8c2f87bac_EF7CD34B-CB7F-442C-B06A-2C38BF86F158.png"
          alt="Kroonstad Roleplay"
          className="h-full w-full object-cover object-center brightness-110"
        />
        {/* Bottom fade to blend into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Side darken for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-transparent to-background/15" />
      </div>

      {/* APV title below image */}
      <div className="bg-background py-5 text-center">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-3 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-wider text-white/35"
        >
          <span>Versie {meta.version}</span>
          <span aria-hidden="true" className="text-primary/40">•</span>
          <span>
            Laatst bijgewerkt{" "}
            <time dateTime={meta.updatedAt}>{meta.updatedAtLabel}</time>
          </span>
        </motion.div>
      </div>
    </header>
  );
}
