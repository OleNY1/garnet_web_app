import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Baby,
  Brain,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  Clock3,
  Dna,
  FileSearch,
  FlaskConical,
  GitBranch,
  Microscope,
  Network,
  Search,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  TriangleAlert,
  UserSearch,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
  points: number;
  critical?: boolean;
}

interface Infographic {
  source: "Red Flags Map" | "Test Selection Flow";
  title: string;
  steps: string[];
  note: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  infographic: Infographic;
}

type InfographicThemeName = "blue" | "green" | "teal" | "gold" | "violet";

interface InfographicTheme {
  header: string;
  panel: string;
  border: string;
  badge: string;
  iconBg: string;
}

interface InfographicVisual {
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
  theme: InfographicThemeName;
}

const questions: Question[] = [
  {
    id: "known_family_diagnosis",
    question:
      "Has anyone in your family already received a confirmed genetic diagnosis for kidney disease?",
    options: [
      { value: "yes", label: "Yes", points: 4, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Test Selection Flow",
      title: "Known family diagnosis often changes test strategy",
      steps: ["Known family diagnosis", "Targeted testing", "Family screening plan"],
      note: "When a known familial diagnosis exists, targeted testing is often considered first.",
    },
  },
  {
    id: "family_history_kidney_disease",
    question: "Do you have one or more blood relatives with kidney disease?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Family history is a major red flag",
      steps: ["Family history", "Inherited risk signal", "Consider genetic evaluation"],
      note: "Clustering of kidney disease in relatives increases concern for inherited causes.",
    },
  },
  {
    id: "relatives_affected_count",
    question: "How many blood relatives are known to have kidney disease?",
    options: [
      { value: "none", label: "None", points: 0 },
      { value: "one", label: "1 relative", points: 1 },
      { value: "two", label: "2 relatives", points: 2 },
      { value: "three_or_more", label: "3 or more relatives", points: 4, critical: true },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "More affected relatives means stronger inherited signal",
      steps: ["Count affected relatives", "Family clustering", "Higher testing priority"],
      note: "Multiple affected relatives across a family can increase suspicion of hereditary disease.",
    },
  },
  {
    id: "early_onset_age",
    question: "At what age did kidney problems first appear for you or your affected relatives?",
    options: [
      { value: "under_18", label: "Under 18", points: 4, critical: true },
      { value: "18_30", label: "18 to 30", points: 3, critical: true },
      { value: "31_50", label: "31 to 50", points: 2 },
      { value: "over_50", label: "Over 50", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Young age at onset is a key warning sign",
      steps: ["Young age", "Unusual clinical course", "Trigger genetic testing discussion"],
      note: "Earlier onset of kidney disease is often considered a stronger red flag.",
    },
  },
  {
    id: "rapid_progression",
    question: "Has kidney disease progressed quickly in you or close relatives?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Rapid progression appears in the red flag framework",
      steps: ["Rapid progression", "Higher concern", "Genetic causes considered"],
      note: "Fast decline in kidney function can support the need for genetic evaluation.",
    },
  },
  {
    id: "severe_presentation",
    question: "Have there been severe or unusual kidney disease presentations in your family?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Severe presentation can indicate inherited risk",
      steps: ["Severe presentation", "Red flag activated", "Testing pathway considered"],
      note: "Unusual severity is part of the image-based red flag indicators.",
    },
  },
  {
    id: "congenital_anomalies",
    question: "Were there kidney problems present at birth or congenital anomalies in your family?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Congenital anomalies are linked to extra-renal red flags",
      steps: ["Congenital anomalies", "Extra-renal involvement", "Increase genetics priority"],
      note: "Congenital findings are commonly used to flag possible genetic etiologies.",
    },
  },
  {
    id: "extra_renal_features",
    question:
      "Do you or relatives with kidney disease also have non-kidney features (for example hearing, vision, liver, or developmental findings)?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Extra-renal involvement can shift testing choices",
      steps: ["Kidney findings + other organs", "Syndromic concern", "Broader genetic approach"],
      note: "The red flag diagram highlights extra-renal clues as a key decision input.",
    },
  },
  {
    id: "syndromic_features",
    question: "Has a clinician ever said your condition may be part of a syndrome?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Syndromic clues point toward genetic pathways",
      steps: ["Syndromic features", "Specific phenotype category", "Select testing strategy"],
      note: "Syndromic presentation is shown as an important trigger for testing in the map.",
    },
  },
  {
    id: "intellectual_disability_features",
    question: "Has intellectual or developmental disability occurred in affected family members?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Developmental findings can reinforce inherited suspicion",
      steps: ["Developmental findings", "Extra-renal signal", "Add to risk profile"],
      note: "This feature appears under the extra-renal branch in the red flag diagram.",
    },
  },
  {
    id: "pkd_or_cystic_subtype",
    question: "Have you or your relatives been told they have polycystic or cystic kidney disease?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Kidney disease subtype helps direct genetic testing",
      steps: ["Kidney subtype identified", "Known genetic category", "Targeted/panel testing considered"],
      note: "PKD is explicitly represented as a subtype signal in the image.",
    },
  },
  {
    id: "fsgs_or_glomerular_subtype",
    question:
      "Have you or your relatives been diagnosed with FSGS or another glomerular disease type?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "FSGS and glomerular patterns can have genetic causes",
      steps: ["Kidney disease subtype", "Phenotype-guided concern", "Genetic test selection"],
      note: "Subtype-specific concern is central to both provided framework images.",
    },
  },
  {
    id: "unknown_etiology",
    question: "Has kidney disease remained unexplained despite prior medical workup?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Unknown etiology is a red flag for testing",
      steps: ["Unknown cause", "Need deeper evaluation", "Broader NGS/ES may be considered"],
      note: "Unknown etiology appears as a dedicated indicator in the second diagram.",
    },
  },
  {
    id: "electrolyte_pattern",
    question:
      "Have there been repeated or unusual electrolyte problems linked to kidney disease in your family?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Electrolyte patterns can indicate specific genetic conditions",
      steps: ["Electrolyte dysfunction pattern", "Specific condition concern", "Focused testing path"],
      note: "The red flags map directly links electrolyte patterns to genetic concern.",
    },
  },
  {
    id: "biopsy_clinical_signal",
    question:
      "Did biopsy findings or clinical criteria ever suggest an inherited kidney condition?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Biopsy and clinical criteria can trigger genetic workup",
      steps: ["Biopsy/clinical criteria", "Specific genetic concern", "Move to testing decision"],
      note: "The second image includes a branch for biopsy and clinical criteria signals.",
    },
  },
  {
    id: "clinician_specific_genetic_concern",
    question:
      "Has your care team told you there is concern for a specific inherited kidney condition?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Test Selection Flow",
      title: "Specific phenotype concern guides the test branch",
      steps: ["Phenotype concern", "Shared decision-making", "Targeted vs broad testing"],
      note: "The flowchart branches based on phenotype category and known causes.",
    },
  },
  {
    id: "autosomal_dominant_pattern",
    question:
      "Does kidney disease appear in multiple generations (for example parent and child)?",
    options: [
      { value: "yes", label: "Yes", points: 3, critical: true },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Autosomal dominant pattern is a family red flag",
      steps: ["Multiple generations affected", "Dominant inheritance suspicion", "Cascade testing relevance"],
      note: "Suspicion of dominant inheritance is explicitly listed in the red flag map.",
    },
  },
  {
    id: "autosomal_recessive_pattern",
    question: "Are siblings affected while parents are not clearly affected?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Autosomal recessive pattern can be subtle in families",
      steps: ["Sibling clustering", "Recessive inheritance suspicion", "Carrier/diagnostic testing discussion"],
      note: "Recessive inheritance suspicion is one of the mapped family history branches.",
    },
  },
  {
    id: "x_linked_pattern",
    question:
      "Is kidney disease seen mostly in male relatives, especially through the mother's side of the family?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "no", label: "No", points: 0 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Red Flags Map",
      title: "Possible X-linked pattern is a specific red flag",
      steps: ["Male-predominant pattern", "X-linked suspicion", "Consider targeted gene testing"],
      note: "Suspicion of X-linked inheritance appears in the family history branch.",
    },
  },
  {
    id: "prior_genetic_result",
    question: "Have you or an affected relative had genetic testing before, and what was the result?",
    options: [
      { value: "positive", label: "Positive (disease-causing variant found)", points: 4, critical: true },
      { value: "vus", label: "VUS (uncertain result)", points: 3, critical: true },
      { value: "negative", label: "Negative", points: 1 },
      { value: "not_done", label: "No prior genetic testing", points: 2 },
      { value: "unsure", label: "I am not sure", points: 1 },
    ],
    infographic: {
      source: "Test Selection Flow",
      title: "Result category determines next action",
      steps: ["Positive / VUS / Negative", "Apply care, follow-up, or reassess", "Reanalysis and family screening"],
      note: "The first flowchart highlights different follow-up paths after each result type.",
    },
  },
  {
    id: "shared_decision_readiness",
    question:
      "Would you be willing to review testing options in shared decision-making with your care team?",
    options: [
      { value: "yes", label: "Yes", points: 2 },
      { value: "maybe", label: "Maybe, I need more information", points: 1 },
      { value: "no", label: "No", points: 0 },
    ],
    infographic: {
      source: "Test Selection Flow",
      title: "Shared decision-making is central in test selection",
      steps: ["Clinical signals", "Shared decision-making", "Most appropriate testing choice"],
      note: "The first diagram shows shared decision-making as a key step in the pathway.",
    },
  },
];

const INFOGRAPHIC_THEMES: Record<InfographicThemeName, InfographicTheme> = {
  blue: {
    header: "from-sky-500 to-blue-600",
    panel: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-800",
    iconBg: "from-sky-200 to-blue-200",
  },
  green: {
    header: "from-emerald-500 to-green-600",
    panel: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    iconBg: "from-emerald-200 to-green-200",
  },
  teal: {
    header: "from-teal-500 to-cyan-600",
    panel: "from-teal-50 to-cyan-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-800",
    iconBg: "from-teal-200 to-cyan-200",
  },
  gold: {
    header: "from-amber-500 to-orange-500",
    panel: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    iconBg: "from-amber-200 to-orange-200",
  },
  violet: {
    header: "from-violet-500 to-purple-600",
    panel: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-800",
    iconBg: "from-violet-200 to-purple-200",
  },
};

const INFOGRAPHIC_VISUALS: Record<string, InfographicVisual> = {
  known_family_diagnosis: { icon: Dna, secondaryIcon: ClipboardList, theme: "blue" },
  family_history_kidney_disease: { icon: Users, secondaryIcon: ShieldCheck, theme: "green" },
  relatives_affected_count: { icon: Users, secondaryIcon: Network, theme: "teal" },
  early_onset_age: { icon: Clock3, secondaryIcon: Baby, theme: "gold" },
  rapid_progression: { icon: TrendingUp, secondaryIcon: Activity, theme: "blue" },
  severe_presentation: { icon: TriangleAlert, secondaryIcon: Stethoscope, theme: "gold" },
  congenital_anomalies: { icon: Baby, secondaryIcon: Stethoscope, theme: "teal" },
  extra_renal_features: { icon: Stethoscope, secondaryIcon: Dna, theme: "violet" },
  syndromic_features: { icon: Microscope, secondaryIcon: Dna, theme: "green" },
  intellectual_disability_features: { icon: Brain, secondaryIcon: Users, theme: "violet" },
  pkd_or_cystic_subtype: { icon: Search, secondaryIcon: Dna, theme: "blue" },
  fsgs_or_glomerular_subtype: { icon: Microscope, secondaryIcon: FileSearch, theme: "teal" },
  unknown_etiology: { icon: Search, secondaryIcon: CircleAlert, theme: "gold" },
  electrolyte_pattern: { icon: FlaskConical, secondaryIcon: Activity, theme: "teal" },
  biopsy_clinical_signal: { icon: Microscope, secondaryIcon: ClipboardList, theme: "blue" },
  clinician_specific_genetic_concern: { icon: UserSearch, secondaryIcon: Dna, theme: "green" },
  autosomal_dominant_pattern: { icon: GitBranch, secondaryIcon: Users, theme: "violet" },
  autosomal_recessive_pattern: { icon: GitBranch, secondaryIcon: Network, theme: "violet" },
  x_linked_pattern: { icon: GitBranch, secondaryIcon: CircleAlert, theme: "gold" },
  prior_genetic_result: { icon: FileSearch, secondaryIcon: Dna, theme: "blue" },
  shared_decision_readiness: { icon: Users, secondaryIcon: CircleCheck, theme: "green" },
};

const DEFAULT_VISUAL: InfographicVisual = {
  icon: ClipboardList,
  secondaryIcon: Dna,
  theme: "blue",
};

export default function PatientAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const activeQuestion = questions[currentQuestion];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const questionId = activeQuestion.id;
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk and navigate to result
      const risk = calculateRisk(answers);
      localStorage.setItem("assessmentAnswers", JSON.stringify(answers));
      localStorage.setItem("riskLevel", risk);
      navigate("/doctor/assessment/result");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/doctor/dashboard");
    }
  };

  const currentAnswer = answers[activeQuestion.id];
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
          <h2 className="text-lg text-gray-900">Patient Assessment</h2>
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-6 pb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-8">
        <QuestionInfographicCard
          question={activeQuestion}
          infographicIndex={currentQuestion + 1}
        />

        <h1 className="text-2xl text-gray-900 mb-8">{activeQuestion.question}</h1>

        {/* Answer Options */}
        <div className="space-y-3">
          {activeQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                currentAnswer === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-lg text-gray-900">{option.label}</span>
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
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span>{currentQuestion < questions.length - 1 ? "Next" : "See Results"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function QuestionInfographicCard({
  question,
  infographicIndex,
}: {
  question: Question;
  infographicIndex: number;
}) {
  const visual = INFOGRAPHIC_VISUALS[question.id] ?? DEFAULT_VISUAL;
  const theme = INFOGRAPHIC_THEMES[visual.theme];
  const PrimaryIcon = visual.icon;
  const SecondaryIcon = visual.secondaryIcon;

  return (
    <div className={`mb-6 overflow-hidden rounded-3xl border ${theme.border} bg-white shadow-md`}>
      <div className={`relative bg-gradient-to-r ${theme.header} px-4 py-3`}>
        <div className="flex items-center gap-3 pr-14">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <PrimaryIcon className="h-5 w-5 text-slate-700" />
          </div>
          <p className="text-sm leading-tight text-white">{question.infographic.title}</p>
        </div>
        <span className="absolute right-3 top-2 rounded-full bg-white/25 px-2 py-1 text-[10px] uppercase tracking-wide text-white">
          #{infographicIndex}
        </span>
      </div>

      <div className={`grid gap-4 bg-gradient-to-br ${theme.panel} p-4 md:grid-cols-[1.05fr_1fr]`}>
        <div className="space-y-3">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] ${theme.badge}`}>
            {question.infographic.source}
          </span>
          <p className="text-sm leading-relaxed text-slate-700">{question.infographic.note}</p>
        </div>

        {question.infographic.source === "Test Selection Flow" ? (
          <FlowInfographicGraphic
            steps={question.infographic.steps}
            theme={theme}
            PrimaryIcon={PrimaryIcon}
            SecondaryIcon={SecondaryIcon}
          />
        ) : (
          <MapInfographicGraphic
            steps={question.infographic.steps}
            theme={theme}
            PrimaryIcon={PrimaryIcon}
            SecondaryIcon={SecondaryIcon}
          />
        )}
      </div>
    </div>
  );
}

function FlowInfographicGraphic({
  steps,
  theme,
  PrimaryIcon,
  SecondaryIcon,
}: {
  steps: string[];
  theme: InfographicTheme;
  PrimaryIcon: LucideIcon;
  SecondaryIcon: LucideIcon;
}) {
  const [stepA = "Step 1", stepB = "Step 2", stepC = "Step 3"] = steps;

  return (
    <div className="relative rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
          <PrimaryIcon className="h-4 w-4 text-slate-700" />
          <span className="text-xs text-slate-700">{stepA}</span>
        </div>
        <div className="flex justify-center">
          <ArrowRight className="h-3.5 w-3.5 rotate-90 text-slate-500" />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="rounded-xl bg-white px-2 py-2 text-center text-[11px] text-slate-700 shadow-sm">
            {stepB}
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
          <div className={`rounded-xl bg-gradient-to-br ${theme.iconBg} px-2 py-2 text-center text-[11px] text-slate-700`}>
            {stepC}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
        <SecondaryIcon className="h-4 w-4 text-slate-700" />
      </div>
    </div>
  );
}

function MapInfographicGraphic({
  steps,
  theme,
  PrimaryIcon,
  SecondaryIcon,
}: {
  steps: string[];
  theme: InfographicTheme;
  PrimaryIcon: LucideIcon;
  SecondaryIcon: LucideIcon;
}) {
  const [left = "Signal", center = "Core", right = "Action"] = steps;

  return (
    <div className="relative min-h-[150px] rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm">
      <div className="absolute left-7 top-8 h-px w-[calc(100%-3.5rem)] bg-slate-300/80" />
      <div className="absolute left-1/2 top-8 h-[52px] w-px -translate-x-1/2 bg-slate-300/80" />

      <div className="absolute left-2 top-2 max-w-[34%] rounded-xl bg-white px-2 py-1.5 text-[11px] text-slate-700 shadow-sm">
        {left}
      </div>
      <div className={`absolute left-1/2 top-2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br ${theme.iconBg} shadow-sm`}>
        <PrimaryIcon className="h-4 w-4 text-slate-700" />
      </div>
      <div className="absolute right-2 top-2 max-w-[34%] rounded-xl bg-white px-2 py-1.5 text-[11px] text-slate-700 shadow-sm">
        {right}
      </div>

      <div className="absolute bottom-3 left-1/2 flex w-[82%] -translate-x-1/2 items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2">
        <span className="text-xs text-slate-700">{center}</span>
        <SecondaryIcon className="h-4 w-4 text-slate-700" />
      </div>
    </div>
  );
}

function calculateRisk(answers: Record<string, string>): string {
  let totalPoints = 0;
  let criticalSignals = 0;

  for (const question of questions) {
    const selectedValue = answers[question.id];
    if (!selectedValue) continue;

    const selectedOption = question.options.find(
      (option) => option.value === selectedValue
    );
    if (!selectedOption) continue;

    totalPoints += selectedOption.points;
    if (selectedOption.critical) {
      criticalSignals++;
    }
  }

  if (totalPoints >= 34 || criticalSignals >= 5) return "high";
  if (totalPoints >= 18 || criticalSignals >= 2) return "moderate";
  return "low";
}
