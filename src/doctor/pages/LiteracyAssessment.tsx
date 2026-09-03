import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  competency: string;
}

const questions: Question[] = [
  {
    id: "1",
    question: "Why might your kidney care team recommend genetic testing?",
    options: [
      "To look for inherited causes or risks that can help guide your care",
      "To replace all other kidney tests forever",
      "To guarantee that treatment will cure your condition",
      "To find your blood type",
    ],
    correctAnswer: "To look for inherited causes or risks that can help guide your care",
    competency: "Purpose of testing",
  },
  {
    id: "2",
    question: "If your genetic test result is negative, what does that usually mean?",
    options: [
      "It always rules out every possible genetic cause",
      "It can still have limits depending on the test and your condition",
      "It means your kidneys are normal",
      "It means no follow-up is needed",
    ],
    correctAnswer: "It can still have limits depending on the test and your condition",
    competency: "Limits of testing",
  },
  {
    id: "3",
    question: "What does a result called a \"variant of uncertain significance (VUS)\" mean?",
    options: [
      "It definitely causes disease",
      "It is definitely harmless",
      "There is not enough information yet to know if it is harmful",
      "Your sample was mixed up",
    ],
    correctAnswer: "There is not enough information yet to know if it is harmful",
    competency: "Result interpretation",
  },
  {
    id: "4",
    question: "Why does your family history matter for genetic testing?",
    options: [
      "It helps estimate inherited risk and helps choose the right test",
      "It usually does not affect testing decisions",
      "It only matters for children",
      "It replaces talking with a genetic counselor",
    ],
    correctAnswer: "It helps estimate inherited risk and helps choose the right test",
    competency: "Family risk assessment",
  },
  {
    id: "5",
    question: "Before testing, what should happen during informed consent?",
    options: [
      "You only sign a form",
      "You discuss benefits, limits, possible results, and next steps",
      "It is only needed in research studies",
      "It is not needed if your doctor recommends testing",
    ],
    correctAnswer: "You discuss benefits, limits, possible results, and next steps",
    competency: "Informed consent",
  },
  {
    id: "6",
    question: "If testing finds a disease-causing genetic change, what is a good next step?",
    options: [
      "Ignore it unless you feel worse",
      "Review treatment plans and discuss whether relatives should consider targeted testing",
      "Repeat the same test every month",
      "Assume all family members have kidney disease",
    ],
    correctAnswer: "Review treatment plans and discuss whether relatives should consider targeted testing",
    competency: "Care planning after results",
  },
  {
    id: "7",
    question: "How can a genetic counselor help you?",
    options: [
      "By performing procedures like kidney biopsy",
      "By explaining your risks, results, and options for you and your family",
      "By choosing your dialysis schedule",
      "By prescribing all kidney medicines",
    ],
    correctAnswer: "By explaining your risks, results, and options for you and your family",
    competency: "Counseling support",
  },
  {
    id: "8",
    question: "Before your test, which practical topic should be reviewed with you?",
    options: [
      "Your favorite social media app",
      "Sample type, result timing, and possible cost or insurance coverage",
      "Your favorite foods",
      "Your vacation plans",
    ],
    correctAnswer: "Sample type, result timing, and possible cost or insurance coverage",
    competency: "Testing logistics",
  },
  {
    id: "9",
    question: "Which statement about inherited kidney conditions is most accurate?",
    options: [
      "They cannot affect multiple people in the same family",
      "They can appear across generations, but symptoms may differ",
      "They are always obvious in childhood",
      "They can be diagnosed without family history or testing",
    ],
    correctAnswer: "They can appear across generations, but symptoms may differ",
    competency: "Inheritance patterns",
  },
  {
    id: "10",
    question: "What is the best way to think about genetic testing?",
    options: [
      "It is one useful tool that is combined with your symptoms and other medical tests",
      "It always gives complete certainty right away",
      "It is only useful for research, not personal care",
      "It removes the need for follow-up visits",
    ],
    correctAnswer: "It is one useful tool that is combined with your symptoms and other medical tests",
    competency: "Clinical context",
  },
];

export default function LiteracyAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and navigate to result
      const score = calculateScore(answers);
      const correctCount = questions.filter(
        (question) => answers[question.id] === question.correctAnswer
      ).length;
      const incorrectCompetencies = questions
        .filter((question) => answers[question.id] !== question.correctAnswer)
        .map((question) => question.competency);

      localStorage.setItem("literacyScore", score.toString());
      localStorage.setItem("literacyAnswers", JSON.stringify(answers));
      localStorage.setItem("literacyCorrectCount", String(correctCount));
      localStorage.setItem("literacyTotalQuestions", String(questions.length));
      localStorage.setItem(
        "literacyIncorrectCompetencies",
        JSON.stringify(incorrectCompetencies)
      );
      navigate("/doctor/literacy/result");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/doctor/dashboard");
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg text-gray-900">Patient Genetic Education Check</h2>
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-6 pb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-8">
        <p className="text-xs uppercase tracking-wide text-purple-700 mb-3">
          Competency: {questions[currentQuestion].competency}
        </p>
        <h1 className="text-2xl text-gray-900 mb-8">
          {questions[currentQuestion].question}
        </h1>

        {/* Answer Options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                currentAnswer === option
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-base text-gray-900">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
            canProceed
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span>
            {currentQuestion < questions.length - 1 ? "Next" : "View Readiness"}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function calculateScore(answers: Record<string, string>): number {
  let correct = 0;
  questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
}
