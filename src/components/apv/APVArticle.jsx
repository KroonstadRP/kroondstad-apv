import { motion } from "framer-motion";
import SanctionBadge from "./SanctionBadge";

export default function APVArticle({ article }) {
  return (
    <motion.div
      id={`article-${article.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        {/* Article number accent */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-6xl md:text-7xl font-black text-foreground/[0.02] select-none pointer-events-none">
          {article.id}
        </div>

        <div className="relative space-y-4">
          {/* Title */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-1 h-8 rounded-full bg-gradient-to-b from-primary to-primary/30 mt-0.5" />
            <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight">
              {article.title}
            </h3>
          </div>

          {/* Content */}
          <div className="pl-4 space-y-3">
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() && (
                <p key={i} className="text-sm md:text-[15px] leading-relaxed text-muted-foreground/80">
                  {paragraph.startsWith('•') ? paragraph : paragraph}
                </p>
              )
            ))}

            {/* List intro */}
            {article.listIntro && (
              <p className="text-sm md:text-[15px] text-muted-foreground/80 mt-3">
                {article.listIntro}
              </p>
            )}

            {/* List items */}
            {article.list && (
              <ul className="space-y-2 mt-2">
                {article.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-muted-foreground/70">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Extra content */}
            {article.extra && (
              <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border/30">
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {article.extra}
                </p>
              </div>
            )}
          </div>

          {/* Sanction badge */}
          {article.sanctie && (
            <div className="pl-4 pt-2">
              <SanctionBadge sanctie={article.sanctie} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
