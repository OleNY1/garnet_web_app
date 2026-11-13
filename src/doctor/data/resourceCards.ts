import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  BookText,
  ClipboardCheck,
  ClipboardList,
  Dna,
  FileSearch,
  Film,
  FlaskConical,
  GraduationCap,
  GitBranch,
  ShieldCheck,
  Wallet,
  UserRoundPlus,
  Video,
} from "lucide-react";

export type ResourceMode = "educational" | "practical";

export type ResourceCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  route?: string;
};

export const educationalCards: ResourceCard[] = [
  {
    id: "why-genetic-testing-in-nephrology",
    title: "Why Genetic Testing in Nephrology?",
    subtitle: "Diagnosis, management, and family care",
    icon: Dna,
    route: "/doctor/dashboard/resource/why-genetic-testing-in-nephrology",
  },
  {
    id: "common-genetic-kidney-diseases",
    title: "Common Genetic Kidney Diseases",
    subtitle: "Short overviews of most common rare diseases",
    icon: BookText,
    route: "/doctor/dashboard/resource/common-genetic-kidney-diseases",
  },
  {
    id: "protections-against-genetic-discrimination",
    title: "Protections Against Genetic Discrimination",
    subtitle: "GINA, health insurance, employment, and privacy",
    icon: ShieldCheck,
    route: "/doctor/dashboard/resource/protections-against-genetic-discrimination",
  },
  {
    id: "doctors-legal-responsibilities",
    title: "The Doctor's Legal Responsibilities",
    subtitle: "Family communication, cascade testing, and equitable access",
    icon: AlertTriangle,
    route: "/doctor/dashboard/resource/doctors-legal-responsibilities",
  },
  {
    id: "case-studies",
    title: "Patients' Stories (Short Videos)",
    subtitle: "Hear the patient's voices",
    icon: Film,
    route: "/doctor/dashboard/resource/case-studies",
  },
  {
    id: "genetic-testing-counseling-videos",
    title: "Kidney Genetics Explained by Experts (Short Videos)",
    subtitle: "Webinars, playlists, and explainers",
    icon: Video,
    route: "/doctor/dashboard/resource/genetic-testing-counseling-videos",
  },
  {
    id: "quizzes",
    title: "Quizzes",
    subtitle: "Literacy checkpoints",
    icon: ClipboardCheck,
    route: "/doctor/dashboard/resource/quizzes",
  },
  {
    id: "external-training",
    title: "External Training for Nephrologists",
    subtitle: "Guidelines, webinars, CME",
    icon: GraduationCap,
    route: "/doctor/dashboard/resource/external-training",
  },
  {
    id: "renal-patient-organizations",
    title: "Patient Organizations",
    subtitle: "Patient support and referral resources",
    icon: BookOpen,
    route: "/doctor/dashboard/resource/renal-patient-organizations",
  },
  {
    id: "genetic-counselors",
    title: "Genetic Counselors: Who, When, and Why?",
    subtitle: "When to refer and how counseling supports care",
    icon: UserRoundPlus,
    route: "/doctor/dashboard/resource/genetic-counselors",
  },
  {
    id: "cost-and-coverage",
    title: "Cost and Coverage",
    subtitle: "Insurance, prior authorization, and financial assistance",
    icon: Wallet,
    route: "/doctor/dashboard/resource/cost-and-coverage",
  },
  {
    id: "types-of-genetic-tests",
    title: "Types of Genetic Tests",
    subtitle: "Targeted testing, panels, exomes, and genomes",
    icon: Dna,
    route: "/doctor/dashboard/resource/types-of-genetic-tests",
  },
  {
    id: "family-history-collection",
    title: "How to Collect Family History",
    subtitle: "A three-generation history and pedigree",
    icon: GitBranch,
    route: "/doctor/dashboard/resource/family-history-collection",
  },
  {
    id: "components-of-informed-consent",
    title: "The Components of Informed Consent",
    subtitle: "Goals, limitations, privacy, and family implications",
    icon: ClipboardCheck,
    route: "/doctor/dashboard/resource/components-of-informed-consent",
  },
  {
    id: "peer-reviewed-papers",
    title: "Peer-Reviewed Papers",
    subtitle: "Evidence and literature",
    icon: FileSearch,
    route: "/doctor/dashboard/resource/peer-reviewed-papers",
  },
];

export const educationalGroups = [
  {
    id: "foundations",
    title: "Foundations: Understanding Kidney Genetics",
    subtitle: "Kidney diseases, genetic tests, and expert videos",
    icon: Dna,
    cardIds: ["why-genetic-testing-in-nephrology", "common-genetic-kidney-diseases", "types-of-genetic-tests", "genetic-testing-counseling-videos"],
  },
  {
    id: "clinical-practice",
    title: "Clinical Practice: Applying Genetics in Patient Care",
    subtitle: "Counseling, family history, informed consent, and coverage",
    icon: ClipboardList,
    cardIds: ["genetic-counselors", "family-history-collection", "components-of-informed-consent", "cost-and-coverage"],
  },
  {
    id: "ethics",
    title: "Ethics, Legal, and Professional Responsibilities",
    subtitle: "Genetic discrimination, professional duties, and patient stories",
    icon: ShieldCheck,
    cardIds: ["protections-against-genetic-discrimination", "doctors-legal-responsibilities", "case-studies"],
  },
  {
    id: "continuing-education",
    title: "Resources and Continuing Education",
    subtitle: "Papers, training, patient organizations, and quizzes",
    icon: GraduationCap,
    cardIds: ["peer-reviewed-papers", "external-training", "renal-patient-organizations", "quizzes"],
  },
];

export function getEducationalGroupForResource(pathname: string) {
  const card = educationalCards.find((item) => item.route === pathname);
  return card && educationalGroups.find((group) => group.cardIds.includes(card.id));
}

export const practicalCards: ResourceCard[] = [
  {
    id: "identify-patient",
    title: "Assess Risk for Genetic Condition",
    subtitle: "Clinical screening questionnaire",
    icon: ClipboardList,
    route: "/doctor/dashboard/resource/genetic-testing-risks",
  },
  {
    id: "refer-genetic-counselor",
    title: "Refer to Genetic Counselor",
    subtitle: "Specialist counseling support",
    icon: UserRoundPlus,
    route: "/doctor/counselors",
  },
  {
    id: "order-testing-directly",
    title: "How to Order Genetic Testing for Your Patient?",
    subtitle: "Clinician-led ordering toolkit",
    icon: FlaskConical,
    route: "/doctor/dashboard/resource/order-testing-directly",
  },
];

export const modeSummary: Record<ResourceMode, { title: string; description: string }> = {
  educational: {
    title: "Educational Materials",
    description: "Guidelines, videos, training, and literature",
  },
  practical: {
    title: "Practical Tools",
    description: "Clinical screening, counseling referral, and direct test ordering",
  },
};
