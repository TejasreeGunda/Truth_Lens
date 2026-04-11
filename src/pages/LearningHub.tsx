import { useState } from "react";
import { GraduationCap, CheckCircle, XCircle, Trophy, ArrowRight, BookOpen, Brain, ShieldCheck, ShieldAlert } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const quizQuestions = [
  {
    id: 1,
    headline: "Scientists Confirm: Drinking Bleach Cures All Diseases",
    answer: "fake" as const,
    explanation: "No credible scientific study supports this dangerous claim. Always verify health claims through trusted medical sources.",
  },
  {
    id: 2,
    headline: "WHO Reports Global Decline in Malaria Deaths Over Past Decade",
    answer: "real" as const,
    explanation: "The WHO has documented a significant decline in malaria-related deaths due to improved prevention and treatment programs.",
  },
  {
    id: 3,
    headline: "BREAKING: Government Plans to Ban All Social Media by 2025",
    answer: "fake" as const,
    explanation: "Sensationalist language like 'BREAKING' and extreme claims without attribution are red flags for misinformation.",
  },
  {
    id: 4,
    headline: "NASA's James Webb Telescope Captures New Images of Distant Galaxies",
    answer: "real" as const,
    explanation: "NASA regularly publishes new findings from the JWST, and this matches verified reporting.",
  },
  {
    id: 5,
    headline: "SHOCKING: 5G Towers Proven to Spread COVID-19 Virus",
    answer: "fake" as const,
    explanation: "This is a debunked conspiracy theory. Viruses cannot travel on radio waves.",
  },
];

const tips = [
  { title: "Check the Source", desc: "Verify the publication and author credibility. Look for 'About Us' pages and editorial standards.", icon: BookOpen },
  { title: "Read Beyond Headlines", desc: "Sensationalist headlines are designed to provoke emotion. Always read the full article.", icon: Brain },
  { title: "Cross-Reference", desc: "Check if multiple reputable outlets report the same story. Single-source claims are suspicious.", icon: CheckCircle },
  { title: "Check the Date", desc: "Old news reshared out of context is a common misinformation tactic.", icon: ArrowRight },
];

export default function LearningHub() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<"fake" | "real" | null>(null);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[currentQ];

  const handleAnswer = (ans: "fake" | "real") => {
    if (answered) return;
    setAnswered(ans);
    if (ans === q.answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setAnswered(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Learning Hub</h1>
        <p className="text-muted-foreground text-sm mt-1">Test your skills and learn to spot misinformation</p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, i) => (
          <GlassCard key={tip.title} delay={i * 100}>
            <div className="flex gap-3">
              <div className="p-2 rounded-lg gradient-bg shrink-0 h-fit">
                <tip.icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{tip.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quiz */}
      <GlassCard glow="accent" delay={400}>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h3 className="text-sm font-semibold">Fake or Real? Quiz</h3>
          {!finished && (
            <span className="ml-auto text-xs text-muted-foreground">
              {currentQ + 1} / {quizQuestions.length}
            </span>
          )}
        </div>

        {finished ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 mx-auto text-warning mb-3" />
            <h2 className="text-2xl font-bold">{score}/{quizQuestions.length}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {score === quizQuestions.length ? "Perfect! You're a fact-checking expert!" : score >= 3 ? "Great job! Keep learning." : "Keep practicing to improve your skills."}
            </p>
            <button onClick={restart} className="mt-4 px-6 py-2.5 rounded-lg gradient-bg-accent text-foreground font-medium text-sm">
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-lg bg-secondary/50 mb-4">
              <p className="text-sm italic text-foreground">"{q.headline}"</p>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleAnswer("real")}
                disabled={!!answered}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all border ${
                  answered === "real"
                    ? q.answer === "real"
                      ? "bg-success/20 border-success/50 text-success"
                      : "bg-destructive/20 border-destructive/50 text-destructive"
                    : "bg-secondary border-border text-foreground hover:border-success/50"
                } disabled:cursor-default`}
              >
                <ShieldCheck className="w-4 h-4 inline mr-2" />
                Real
              </button>
              <button
                onClick={() => handleAnswer("fake")}
                disabled={!!answered}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all border ${
                  answered === "fake"
                    ? q.answer === "fake"
                      ? "bg-success/20 border-success/50 text-success"
                      : "bg-destructive/20 border-destructive/50 text-destructive"
                    : "bg-secondary border-border text-foreground hover:border-destructive/50"
                } disabled:cursor-default`}
              >
                <ShieldAlert className="w-4 h-4 inline mr-2" />
                Fake
              </button>
            </div>

            {answered && (
              <div className={`p-3 rounded-lg text-sm mb-4 ${answered === q.answer ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                <p className="font-medium mb-1 flex items-center gap-1">
                  {answered === q.answer ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {answered === q.answer ? "Correct!" : `Wrong — it's ${q.answer}.`}
                </p>
                <p className="text-xs opacity-80">{q.explanation}</p>
              </div>
            )}

            {answered && (
              <button onClick={nextQuestion} className="w-full py-2.5 rounded-lg gradient-bg text-primary-foreground font-medium text-sm">
                {currentQ < quizQuestions.length - 1 ? "Next Question" : "See Results"}
              </button>
            )}

            {/* Progress */}
            <div className="flex gap-1.5 mt-4">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= currentQ ? "gradient-bg" : "bg-secondary"}`} />
              ))}
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}
