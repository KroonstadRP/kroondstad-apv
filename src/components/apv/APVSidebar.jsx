import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X, Shield, Users, BookOpen, Car, Skull } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  Users,
  Crosshair: Shield,
  Car,
  BookOpen,
  Gavel: Shield,
  Skull,
  BadgeCheck: Shield,
};

export default function APVSidebar({ sections, activeSection, onSectionClick }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleArticleClick = (articleId) => {
    onSectionClick(articleId);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <nav className="space-y-1 p-4">
      <div className="px-3 pb-4 mb-4 border-b border-border/50">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50">
          Inhoudsopgave
        </p>
      </div>
      {sections.map((section) => {
        const Icon = iconMap[section.icon] || Shield;
        const isExpanded = expandedSection === section.id;
        const sectionNumber = section.id.split("-")[1];

        return (
          <div key={section.id}>
            <button
              onClick={() => handleSectionToggle(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                "hover:bg-secondary/80",
                isExpanded && "bg-secondary"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors",
                isExpanded ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {sectionNumber}
              </div>
              <span className={cn(
                "text-sm font-medium flex-1 truncate transition-colors",
                isExpanded ? "text-foreground" : "text-muted-foreground"
              )}>
                {section.title.split(" – ")[1]}
              </span>
              <ChevronRight className={cn(
                "w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200",
                isExpanded && "rotate-90"
              )} />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 pl-4 border-l border-border/30 py-1 space-y-0.5">
                    {section.articles.map((article) => {
                      const shortTitle = article.title.split(" – ")[1];
                      return (
                        <button
                          key={article.id}
                          onClick={() => handleArticleClick(article.id)}
                          className={cn(
                            "w-full text-left px-3 py-1.5 rounded-md text-xs transition-all duration-200",
                            "hover:bg-secondary/80 hover:text-foreground",
                            activeSection === article.id
                              ? "text-primary font-medium bg-primary/5"
                              : "text-muted-foreground/70"
                          )}
                        >
                          <span className="text-muted-foreground/40 mr-1.5">{article.id}</span>
                          {shortTitle}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-card border border-border shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-40 w-72 bg-card border-r border-border overflow-y-auto"
          >
            <div className="pt-16">
              {sidebarContent}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 xl:w-80 bg-card/50 backdrop-blur-xl border-r border-border/50 overflow-y-auto">
        <div className="pt-8 pb-4 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center border border-primary/20">
              <img
                src="https://media.base44.com/images/public/69da87110207331e6fa9d00a/69fc3d7f1_9009BC2C-6F99-4F8C-93E0-D4E246445079.png"
                alt="Kroonstad Roleplay"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Kroonstad Roleplay</p>
              <p className="text-[10px] text-muted-foreground/50 tracking-wider uppercase">APV Reglement</p>
            </div>
          </div>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
