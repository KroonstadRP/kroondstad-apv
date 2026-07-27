import { useEffect, useState } from "react";
import APVHero from "@/components/apv/APVHero";
import APVSection from "@/components/apv/APVSection";
import APVSidebar from "@/components/apv/APVSidebar";
import { apvData } from "@/components/apv/apvData";

export default function App() {
  const [activeArticle, setActiveArticle] = useState("1.1");

  useEffect(() => {
    const articles = apvData.flatMap((section) => section.articles);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveArticle(visible.target.id.replace("article-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.6] },
    );

    articles.forEach((article) => {
      const element = document.getElementById(`article-${article.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToArticle = (articleId) => {
    document
      .getElementById(`article-${articleId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <APVSidebar
        sections={apvData}
        activeSection={activeArticle}
        onSectionClick={scrollToArticle}
      />
      <APVHero />

      <main className="lg:ml-72 xl:ml-80">
        <div className="mx-auto max-w-4xl px-5 pb-24 pt-80 md:px-8 md:pt-96">
          <div className="space-y-20">
            {apvData.map((section) => (
              <APVSection key={section.id} section={section} />
            ))}
          </div>
          <footer className="mt-24 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground/50">
            Kroonstad Roleplay · Algemene Plaatselijke Verordening
          </footer>
        </div>
      </main>
    </div>
  );
}
