import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

function getSeverity(sanctie) {
  if (!sanctie) return "low";
  const match = sanctie.match(/(\d+)\s*tot\s*(\d+)/);
  if (match) {
    const max = parseInt(match[2]);
    if (max >= 8) return "critical";
    if (max >= 6) return "high";
    if (max >= 4) return "medium";
    return "low";
  }
  return "medium";
}

const severityStyles = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function SanctionBadge({ sanctie }) {
  const severity = getSeverity(sanctie);

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
      severityStyles[severity]
    )}>
      <AlertTriangle className="w-3 h-3" />
      <span>Sanctie: {sanctie}</span>
    </div>
  );
}
