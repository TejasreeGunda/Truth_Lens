import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "accent" | "danger" | "none";
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({ children, className, glow = "none", animate = true, delay = 0, onClick }: GlassCardProps) {
  const glowClass = {
    primary: "glow",
    accent: "glow-accent",
    danger: "shadow-[0_0_30px_-5px_hsl(0_72%_55%/0.25)]",
    none: "",
  }[glow];

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass p-5 transition-all duration-300 hover:bg-card/70 hover:border-primary/20",
        glowClass,
        animate && "opacity-0 animate-fade-in",
        onClick && "cursor-pointer",
        className
      )}
      style={animate ? { animationDelay: `${delay}ms`, animationFillMode: "forwards" } : undefined}
    >
      {children}
    </div>
  );
}
