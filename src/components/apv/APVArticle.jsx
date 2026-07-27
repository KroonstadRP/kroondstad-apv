import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import SanctionBadge from "./SanctionBadge";

export default function APVArticle({ article }) {
  const [copied, setCopied] = useState(false);

  const copyArticleLink = async () => {
    const articleUrl = new URL(
      `#article-${article.id}`,
      window.location.href,
    ).toString();

    await navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      id={`article-${article.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group scroll-mt-6"
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
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight">
                {article.title}
              </h3>
              <button
                type="button"
                onClick={copyArticleLink}
                aria-label={`Kopieer link naar ${article.title}`}
                title={copied ? "Gekopieerd" : "Kopieer link naar dit artikel"}
                className="mt-0.5 flex flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-md p-1.5 text-muted-foreground/50 transition hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {copied ? (
                  <>
                    <Check aria-hidden="true" className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Gekopieerd</span>
                  </>
                ) : (
                  <Copy aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="pl-4 space-y-3">
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() && (
                <p key={i} className="text-[15px] md:text-base leading-7 text-muted-foreground">
                  {paragraph.startsWith('•') ? paragraph : paragraph}
                </p>
              )
            ))}

            {/* List intro */}
            {article.listIntro && (
              <p className="mt-4 text-[15px] font-medium leading-6 text-foreground/80 md:text-base">
                {article.listIntro}
              </p>
            )}

            {/* List items */}
            {article.list && (
              <ul className="mt-2 space-y-2.5">
                {article.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-6 text-muted-foreground md:text-base md:leading-7">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Extra content */}
            {article.extra && (
              <div className="mt-5 p-4 rounded-xl bg-secondary/60 border border-border/50">
                <p className="text-[15px] leading-6 text-muted-foreground md:text-base md:leading-7">
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
