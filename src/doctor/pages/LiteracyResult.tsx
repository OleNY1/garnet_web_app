import { useNavigate } from "react-router-dom";
import { Trophy, BookOpen, ArrowRight } from "lucide-react";

export default function LiteracyResult() {
  const navigate = useNavigate();
  const score = parseInt(localStorage.getItem("literacyScore") || "0");
  const correctCount = parseInt(localStorage.getItem("literacyCorrectCount") || "0");
  const totalQuestions = parseInt(localStorage.getItem("literacyTotalQuestions") || "0");
  const incorrectCompetencies = readStoredStringArray("literacyIncorrectCompetencies");

  const getLevel = (score: number) => {
    if (score >= 80) return "adequate";
    if (score >= 60) return "developing";
    return "needsSupport";
  };

  const level = getLevel(score);

  const levelConfig = {
    adequate: {
      title: "Adequately Educated",
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      message:
        "You show strong understanding of core genetic testing concepts and are likely ready for informed decision-making.",
      suggestions: [
        "Proceed with shared decision-making and consent review",
        "Confirm understanding of limitations and follow-up plan",
        "Offer family-focused counseling if a significant result is found",
      ],
    },
    developing: {
      title: "Partially Educated",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      message:
        "You have a solid foundation but may need reinforcement in selected areas before major testing decisions.",
      suggestions: [
        "Review misunderstood topics before ordering tests",
        "Use plain-language examples for result interpretation",
        "Reassess understanding after targeted education",
      ],
    },
    needsSupport: {
      title: "Needs More Education",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      message:
        "You are not yet adequately prepared for independent genetic testing decisions and would benefit from more structured education first.",
      suggestions: [
        "Start with fundamentals: purpose, limits, and possible outcomes",
        "Provide counseling support and revisit family history basics",
        "Retake this assessment after education",
      ],
    },
  };

  const config = levelConfig[level];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-6">
        <h1 className="text-2xl text-gray-900 mb-2">
          Patient Education Readiness
        </h1>
        <p className="text-gray-600">Check of your understanding of genetic testing</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Score Display */}
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className={`w-32 h-32 mx-auto rounded-full ${config.bgColor} flex items-center justify-center mb-6`}>
            <div className="text-center">
              <div className={`text-4xl ${config.textColor}`}>
                {score}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Score</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Correct: {correctCount} / {totalQuestions || "?"}
          </p>

          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className={`w-6 h-6 ${config.textColor}`} />
            <h2 className={`text-2xl ${config.textColor}`}>
              {config.title}
            </h2>
          </div>

          <p className="text-gray-700">{config.message}</p>
        </div>

        {/* Level Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg text-gray-900 mb-4">Readiness Levels</h3>
          <div className="space-y-3">
            <div
              className={`p-4 rounded-xl border-2 ${
                level === "needsSupport" ? config.borderColor + " " + config.bgColor : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Needs More Education (0-59%)</span>
                {level === "needsSupport" && (
                  <span className={`text-sm ${config.textColor}`}>Your level</span>
                )}
              </div>
            </div>
            <div
              className={`p-4 rounded-xl border-2 ${
                level === "developing" ? config.borderColor + " " + config.bgColor : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Partially Educated (60-79%)</span>
                {level === "developing" && (
                  <span className={`text-sm ${config.textColor}`}>Your level</span>
                )}
              </div>
            </div>
            <div
              className={`p-4 rounded-xl border-2 ${
                level === "adequate" ? config.borderColor + " " + config.bgColor : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Adequately Educated (80-100%)</span>
                {level === "adequate" && (
                  <span className={`text-sm ${config.textColor}`}>Your level</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Targeted Review Areas */}
        {incorrectCompetencies.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-gray-900 mb-3">Topics to Reinforce</h3>
            <ul className="space-y-2">
              {incorrectCompetencies.map((topic) => (
                <li key={topic} className="text-sm text-gray-700">
                  • {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="text-lg mb-2">Personalized Recommendations</h3>
              <p className="text-sm text-purple-100">
                Based on your results, here's what we suggest:
              </p>
            </div>
          </div>
          <ul className="space-y-2">
            {config.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                <span className="text-sm text-purple-50">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={() => navigate("/doctor/education")}
            className="w-full py-4 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Open Resources</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/doctor/literacy")}
            className="w-full py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900">Retake Patient Check</span>
          </button>

          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="w-full py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900">Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function readStoredStringArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const unique = new Set(parsed.filter((item): item is string => typeof item === "string"));
    return Array.from(unique);
  } catch {
    return [];
  }
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
