import { motion } from "framer-motion";
import APVArticle from "./APVArticle";

export default function APVSection({ section }) {
  const sectionNumber = section.id.split("-")[1];
  const sectionName = section.title.split(" – ")[1];

  return (
    <section id={section.id} className="scroll-mt-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-lg font-black text-primary">{sectionNumber}</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/60 mb-0.5">
              Artikel {sectionNumber}
            </p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              {sectionName}
            </h2>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-primary/30 via-border/50 to-transparent mt-4" />
      </motion.div>

      {/* Articles */}
      <div className="space-y-4">
        {section.articles.map((article) => (
          <APVArticle key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
