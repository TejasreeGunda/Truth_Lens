import { useState } from "react";
import { Search, Link2, Loader2, ShieldCheck, ShieldAlert, AlertTriangle, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { Textarea } from "@/components/ui/textarea";

interface AnalysisResult {
  verdict: "real" | "fake" | "uncertain";
  confidence: number;
  explanation: string;
  suspiciousWords: string[];
  factors: { label: string; impact: "positive" | "negative" | "neutral"; score: number }[];
}

const mockAnalyze = (text: string): Promise<AnalysisResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const isFake = text.toLowerCase().includes("breaking") || text.toLowerCase().includes("shocking") || text.length < 50;
      resolve({
        verdict: isFake ? "fake" : text.length < 30 ? "uncertain" : "real",
        confidence: isFake ? 87 : 92,
        explanation: isFake
          ? "This article exhibits several hallmarks of misinformation: sensationalist language, lack of credible sources, and emotional manipulation tactics."
          : "This article appears credible with verifiable claims, balanced reporting, and attribution to known sources.",
        suspiciousWords: isFake ? ["BREAKING", "shocking", "you won't believe", "mainstream media"] : [],
        factors: [
          { label: "Source credibility", impact: isFake ? "negative" : "positive", score: isFake ? 25 : 85 },
          { label: "Language analysis", impact: isFake ? "negative" : "positive", score: isFake ? 18 : 90 },
          { label: "Fact consistency", impact: isFake ? "negative" : "positive", score: isFake ? 30 : 88 },
          { label: "Emotional tone", impact: isFake ? "negative" : "neutral", score: isFake ? 15 : 55 },
          { label: "Cross-reference", impact: "neutral", score: 50 },
        ],
      });
    }, 2000);
  });

const verdictConfig = {
  real: { icon: ShieldCheck, label: "Verified Real", color: "text-success", bg: "bg-success/15", border: "border-success/30" },
  fake: { icon: ShieldAlert, label: "Likely Fake", color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/30" },
  uncertain: { icon: AlertTriangle, label: "Uncertain", color: "text-warning", bg: "bg-warning/15", border: "border-warning/30" },
};

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"text" | "url">("text");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await mockAnalyze(input);
    setResult(res);
    setLoading(false);
  };

  const VerdictIcon = result ? verdictConfig[result.verdict].icon : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">News Analyzer</h1>
        <p className="text-muted-foreground text-sm mt-1">Paste text or a URL to analyze for misinformation</p>
      </div>

      <GlassCard glow="primary" delay={0}>
        {/* Mode tabs */}
        <div className="flex gap-2 mb-4">
          {(["text", "url"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m ? "gradient-bg text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "text" ? <Search className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              {m === "text" ? "Text" : "URL"}
            </button>
          ))}
        </div>

        {/* Input */}
        <Textarea
          placeholder={mode === "text" ? "Paste the news article or claim here..." : "Enter the news article URL..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] bg-secondary/50 border-border focus:border-primary resize-none"
        />

        <button
          onClick={analyze}
          disabled={loading || !input.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg gradient-bg text-primary-foreground font-semibold transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "Analyzing..." : "Analyze Now"}
        </button>
      </GlassCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 opacity-0 animate-fade-in">
          {/* Verdict */}
          <GlassCard className={`border ${verdictConfig[result.verdict].border}`} animate={false}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${verdictConfig[result.verdict].bg}`}>
                {VerdictIcon && <VerdictIcon className={`w-8 h-8 ${verdictConfig[result.verdict].color}`} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold ${verdictConfig[result.verdict].color}`}>{verdictConfig[result.verdict].label}</span>
                  <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${verdictConfig[result.verdict].bg} ${verdictConfig[result.verdict].color}`}>
                    {result.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{result.explanation}</p>
              </div>
            </div>
          </GlassCard>

          {/* Factors */}
          <GlassCard animate={false}>
            <h3 className="text-sm font-semibold mb-4">Analysis Factors</h3>
            <div className="space-y-3">
              {result.factors.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{f.label}</span>
                    <span className={f.impact === "positive" ? "text-success" : f.impact === "negative" ? "text-destructive" : "text-warning"}>
                      {f.score}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        f.impact === "positive" ? "gradient-bg" : f.impact === "negative" ? "gradient-bg-danger" : "bg-warning"
                      }`}
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Suspicious words */}
          {result.suspiciousWords.length > 0 && (
            <GlassCard animate={false}>
              <h3 className="text-sm font-semibold mb-3">Flagged Terms</h3>
              <div className="flex flex-wrap gap-2">
                {result.suspiciousWords.map((w) => (
                  <span key={w} className="px-3 py-1.5 rounded-full text-xs font-medium bg-destructive/15 text-destructive border border-destructive/30">
                    {w}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
}
