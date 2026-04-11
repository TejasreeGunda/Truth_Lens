interface ConfidenceMeterProps {
  score: number; // 0-100
  label: string;
  size?: "sm" | "lg";
}

export default function ConfidenceMeter({ score, label, size = "lg" }: ConfidenceMeterProps) {
  const radius = size === "lg" ? 70 : 40;
  const stroke = size === "lg" ? 8 : 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const dim = (radius + stroke) * 2;

  const color = score >= 70 ? "hsl(160, 84%, 50%)" : score >= 40 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 55%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={dim} height={dim} className="transform -rotate-90">
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} fill="none" stroke="hsl(225, 15%, 18%)" strokeWidth={stroke} />
        <circle
          cx={radius + stroke} cy={radius + stroke} r={radius} fill="none"
          stroke={color} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`font-bold ${size === "lg" ? "text-4xl" : "text-xl"}`} style={{ color }}>{score}%</span>
        <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
      </div>
    </div>
  );
}
