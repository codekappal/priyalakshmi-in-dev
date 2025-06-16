// Client-side utility for category colors
export function getCategoryColors(category: string) {
  const categoryColors: Record<
    string,
    {
      gradient: string;
      iconColor: string;
      borderColor: string;
    }
  > = {
    "Talent Strategy": {
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    "Employee Experience": {
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    "Business Strategy": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
    },
    "HR Analytics": {
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    Technology: {
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/20",
    },
    Leadership: {
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/20",
    },
    Default: {
      gradient: "from-slate-500/20 to-gray-500/20",
      iconColor: "text-slate-400",
      borderColor: "border-slate-500/20",
    },
  };

  return categoryColors[category] || categoryColors["Default"];
}
