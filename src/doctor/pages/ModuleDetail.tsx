import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import BottomNav from "../components/BottomNav";
import whoShouldGetTestedInfographic from "../../assets/who-should-get-tested-infographic.svg";

interface WebinarVideo {
  id: string;
  title: string;
  url: string;
  duration?: string;
}

interface CmeInfo {
  detailsLabel: string;
  detailsUrl: string;
  posttestUrl: string;
  creditText: string;
}

interface WebinarModule {
  id: string;
  heading: string;
  title: string;
  titleUrl?: string;
  description: string[];
  image?: {
    src: string;
    alt: string;
    heading?: string;
    citationLabel?: string;
    citationUrl?: string;
  };
  videos: WebinarVideo[];
  cme?: CmeInfo;
}

interface WebinarSeries {
  title: string;
  subtitle: string;
  intro: string;
  modules: WebinarModule[];
  footerNote?: string;
}

const WATCHED_VIDEOS_KEY = "educationWatchedVideos";
const COMPLETED_MODULES_KEY = "educationCompletedModules";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
    __ytIframeApiPromise?: Promise<any>;
  }
}

function readIdSet(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((value): value is string => typeof value === "string"));
  } catch {
    return new Set<string>();
  }
}

function writeIdSet(key: string, values: Set<string>) {
  localStorage.setItem(key, JSON.stringify(Array.from(values)));
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (window.__ytIframeApiPromise) {
    return window.__ytIframeApiPromise;
  }

  window.__ytIframeApiPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };
  });

  return window.__ytIframeApiPromise;
}

const kdigoGeneticsPlaylistModules: WebinarModule[] = [
  {
    id: "1",
    heading: "Module 1",
    title: "Foundations of Genetics in CKD",
    description: [
      "Build core understanding of why genetics matters in kidney disease and how testing applies across common CKD presentations.",
    ],
    videos: [
      {
        id: "qw8dObzK8rQ",
        title:
          "Episode 1 - KDIGO Genetics in CKD Webinar Series: Critical Role of Genetics in Kidney Disease",
        url: "https://www.youtube.com/watch?v=qw8dObzK8rQ",
        duration: "1:05:10",
      },
      {
        id: "3BZoQL6oDL0",
        title:
          "Episode 2 - KDIGO Genetics in CKD Webinar Series: Genetic Testing Applications in Glomerular Disease",
        url: "https://www.youtube.com/watch?v=3BZoQL6oDL0",
        duration: "1:00:10",
      },
      {
        id: "SBhWx_3Q6So",
        title:
          "Episode 3 - KDIGO Genetics in CKD Webinar Series: Applications of Testing-Hereditary Kidney Disease",
        url: "https://www.youtube.com/watch?v=SBhWx_3Q6So",
        duration: "57:36",
      },
    ],
  },
  {
    id: "2",
    heading: "Module 2",
    title: "Implementation and Practical Challenges",
    description: [
      "Focus on how to implement testing workflows in real-world CKD practice, including barriers and operational challenges.",
    ],
    videos: [
      {
        id: "hvKSkTqfE90",
        title:
          "Episode 4 - KDIGO Genetics in CKD Webinar Series: Implementation of Genetic Testing for CKD",
        url: "https://www.youtube.com/watch?v=hvKSkTqfE90",
        duration: "1:18:57",
      },
      {
        id: "HFTeMFUpc8A",
        title:
          "Episode 5 - KDIGO Genetics in CKD Webinar Series: Controversies, Barriers & Practical Challenges",
        url: "https://www.youtube.com/watch?v=HFTeMFUpc8A",
        duration: "56:41",
      },
      {
        id: "UQO5cbAQWG8",
        title:
          "Episode 6 - KDIGO Genetics in CKD Webinar Series- Challenges to Implementing Optimal Genetic Testing",
        url: "https://www.youtube.com/watch?v=UQO5cbAQWG8",
        duration: "1:02:07",
      },
    ],
  },
  {
    id: "3",
    heading: "Module 3",
    title: "Result Interpretation and Patient Perspective",
    description: [
      "Learn to interpret testing results and integrate the patient perspective into shared decision-making and communication.",
    ],
    videos: [
      {
        id: "UP30AUj-PnE",
        title:
          "Episode 7 - KDIGO Genetics in CKD Webinar Series: Interpretation of Genetic Testing Results",
        url: "https://www.youtube.com/watch?v=UP30AUj-PnE",
        duration: "48:25",
      },
      {
        id: "s2lVrOx57i4",
        title:
          "Episode 8 - KDIGO Genetics in CKD Webinar Series: The Patient Voice in Genetic Testing",
        url: "https://www.youtube.com/watch?v=s2lVrOx57i4",
        duration: "55:42",
      },
    ],
  },
  {
    id: "4",
    heading: "Module 4",
    title: "Emerging Directions and Case-Based Care",
    description: [
      "Explore future-facing methods and apply learning through case-focused episodes on complex CKD genetics scenarios.",
    ],
    videos: [
      {
        id: "JI18vLSzILo",
        title:
          "Episode 9 - KDIGO Genetics in CKD Webinar Series: The Role of Polygenic Risk Scores in Nephrology",
        url: "https://www.youtube.com/watch?v=JI18vLSzILo",
        duration: "57:36",
      },
      {
        id: "85cxXgTBLW0",
        title:
          "Episode 10 - KDIGO Genetics in CKD Series - Case Studies: How to Care for Patients with C3G & ADPKD",
        url: "https://www.youtube.com/watch?v=85cxXgTBLW0",
        duration: "54:55",
      },
    ],
  },
];

const kdigoImplementationModules: WebinarModule[] = [
  {
    id: "1",
    heading: "Module 1",
    title: "Foundational Principles in the Role of Genetics for CKD Management",
    titleUrl: "https://www.youtube.com/watch?v=Two3Gb924gs",
    description: [
      "In Module 1 of KDIGO's four-part webinar series, Foundational Principles in the Role of Genetics for CKD Management, Professors Andrew Mallett, MD (Australia), Hila Rasouly, MD (United States), and Ali Gharavi, MD (United States) discuss key messages from KDIGO guidance on the prevalence of genetic causes of CKD and foundational principles in the role of genetics for CKD management. This webinar also offers an overview of genetic testing logistics.",
      "The webinar took place on November 12, 2024.",
    ],
    videos: [
      {
        id: "Two3Gb924gs",
        title:
          "Module 1 - Foundational Principles in the Role of Genetics for CKD Management",
        url: "https://www.youtube.com/watch?v=Two3Gb924gs",
      },
    ],
  },
  {
    id: "2",
    heading: "Module 2 (CME)",
    title:
      "Hiding in Plain Sight: The Utility of Genetic Testing in Common Forms of CKD",
    titleUrl: "https://www.youtube.com/watch?v=d_ap7EPap_Q",
    description: [
      "This is the second webinar in KDIGO's four-part webinar series on genetic testing for CKD. In this webinar, Professors Andrew Mallett, MD (Australia), Emilie Cornec-Le Gall, MD (France), Judy Savige, MD (Australia), and Katalin Susztak, MD (United States) discuss the utility of genetic testing in common forms of CKD.",
      "The webinar also examines the role of genetic testing when diagnosing cystic kidney disease, glomerular disease, and APOL1 kidney disease. The webinar took place on December 4, 2024.",
    ],
    cme: {
      detailsLabel: "Full CME details",
      detailsUrl:
        "https://kdigo.org/wp-content/uploads/2024/12/CME-Info_Module-2_Enduring_Final.pdf",
      posttestUrl: "https://www.surveymonkey.com/r/V83Q5Q7",
      creditText: "Earn 1.0 CME credit",
    },
    videos: [
      {
        id: "d_ap7EPap_Q",
        title:
          "Module 2 - Hiding in Plain Sight: The Utility of Genetic Testing in Common Forms of CKD",
        url: "https://www.youtube.com/watch?v=d_ap7EPap_Q",
      },
    ],
  },
  {
    id: "3",
    heading: "Module 3 (CME) - January 28, 2025",
    title: "Understanding Genetic Testing Results: Case-Based Illustrations",
    titleUrl: "https://www.youtube.com/watch?v=rAlkMRAN6-M",
    description: [
      "Module 3 of this series, Understanding Genetic Testing Results: Case-Based Illustrations, highlights the value of genetic testing in common CKD forms, focusing on clinical presentations of cystic, glomerular, and APOL1-related kidney diseases.",
      "Experts discuss classic versus atypical presentations, the spectrum of genetic variants across these conditions, and how genetic diagnoses influence prognostic and family planning decisions.",
      "Specific attention is given to APOL1's relevance for African ancestry populations, implications for treatment, and misclassification risks in hypertensive nephrosclerosis or diabetic nephropathy patients. The webinar took place on January 28, 2025.",
    ],
    cme: {
      detailsLabel: "Full CME info",
      detailsUrl:
        "https://kdigo.org/wp-content/uploads/2024/11/CME-Info_Feb.-4_Enduring_Final.pdf",
      posttestUrl: "https://www.surveymonkey.com/r/NHYF2L2",
      creditText: "Earn 1.0 CME Credit",
    },
    videos: [
      {
        id: "rAlkMRAN6-M",
        title: "Module 3 - Understanding Genetic Testing Results: Case-Based Illustrations",
        url: "https://www.youtube.com/watch?v=rAlkMRAN6-M",
      },
    ],
  },
  {
    id: "4",
    heading: "Module 4 (CME) - February 26, 2025",
    title:
      "Renal Genetics in 2025 and Beyond: What's Ahead for this Emerging and Dynamic Field?",
    titleUrl: "https://www.youtube.com/watch?v=gn0ZZvISupg",
    description: [
      "Renal Genetics in 2025 and Beyond: What's Ahead for this Emerging and Dynamic Field? is the last module in the KDIGO Webinar Series on Implementing Genetic Testing for CKD in the Real World Setting.",
      "Professors Andrew Mallett, MD (Australia), Nine V.A.M. Knoers, MD (The Netherlands), Matthew Sampson, MD (United States), and Ulla Schultheiss, MD (Germany) delve into the evolving landscape of genetic testing in nephrology. From advancements in testing methodologies to polygenic risk scores and precision therapies for genetic kidney diseases, this webinar offers a comprehensive exploration of the rapidly evolving field.",
      "Participants will earn 1.0 CME credit and gain insights into optimizing test evaluation, understanding clinical applications, and addressing the limitations of genetic testing.",
      "Module 4 offers a forward-looking, conversational session on the evolving field of renal genetics. With an eye to the future, speakers discuss emerging therapies, gaps in variant classification, underrepresentation of diverse ancestry groups, and the rapid pace of discoveries, such as new gene-disease associations and innovative treatments.",
      "This module also highlights the potential of polygenic risk scores, pharmacogenomics, and gene-targeted therapies to further transform CKD care in the coming years.",
    ],
    cme: {
      detailsLabel: "Full CME info",
      detailsUrl:
        "https://kdigo.org/wp-content/uploads/2025/01/CME-Info_Feb.-26_Live-Webinar_1.13.25.pdf",
      posttestUrl: "https://www.surveymonkey.com/r/NNNBKHY",
      creditText: "Earn 1.0 CME credit",
    },
    videos: [
      {
        id: "gn0ZZvISupg",
        title:
          "Module 4 - Renal Genetics in 2025 and Beyond: What's Ahead for this Emerging and Dynamic Field?",
        url: "https://www.youtube.com/watch?v=gn0ZZvISupg",
      },
    ],
  },
];

const seriesData: { [key: string]: WebinarSeries } = {
  "1": {
    title: "KDIGO Genetics in CKD Webinar series",
    subtitle: "4 modules | 10 episodes",
    intro:
      "This page uses videos from the provided KDIGO playlist and organizes them into four modules covering genetics foundations, implementation, interpretation, and future directions.",
    modules: kdigoGeneticsPlaylistModules,
  },
  "2": {
    title:
      "KDIGO Webinar Series on Implementing Genetic Testing for CKD in the Real World Setting",
    subtitle: "4 modules",
    intro:
      "The KDIGO webinar series on Implementing Genetic Testing for CKD in the Real World Setting provides a comprehensive program covering foundational principles, result interpretation, clinical utility, and future directions in renal genetics. Modules 2 - 4 will be CME-accredited.",
    modules: kdigoImplementationModules,
    footerNote:
      "This activity is jointly provided by Global Education Group and KDIGO. This webinar series was supported by an educational grant from Natera.",
  },
  "3": {
    title: "Demystifying Genetic Testing",
    subtitle: "1 video",
    intro:
      "Breaking down complex genetic testing concepts into understandable insights.",
    modules: [
      {
        id: "1",
        heading: "Video",
        title: "Demystifying Genetic Testing",
        titleUrl: "https://www.youtube.com/watch?v=S2hNXf7KYCY",
        description: [
          "Watch this session to understand core genetic testing concepts in a practical and easy-to-follow way.",
        ],
        videos: [
          {
            id: "S2hNXf7KYCY",
            title: "Demystifying Genetic Testing",
            url: "https://www.youtube.com/watch?v=S2hNXf7KYCY",
          },
        ],
      },
    ],
  },
  "4": {
    title: "The Art and Science of Genetic Counseling in Nephrology",
    subtitle: "1 video",
    intro:
      "Expert guidance on genetic counseling approaches in kidney disease.",
    modules: [
      {
        id: "1",
        heading: "Video",
        title: "The Art and Science of Genetic Counseling in Nephrology",
        titleUrl: "https://www.youtube.com/watch?v=Guaq2H941yA&t=9s",
        description: [
          "This session focuses on practical approaches to genetic counseling in nephrology.",
        ],
        videos: [
          {
            id: "Guaq2H941yA",
            title: "The Art and Science of Genetic Counseling in Nephrology",
            url: "https://www.youtube.com/watch?v=Guaq2H941yA&t=9s",
          },
        ],
      },
    ],
  },
  "5": {
    title: "Talking About Genetics with Individuals with Kidney Disease - The Basics",
    subtitle: "1 video",
    intro:
      "Essential communication strategies for discussing genetics with patients.",
    modules: [
      {
        id: "1",
        heading: "Video",
        title:
          "Talking About Genetics with Individuals with Kidney Disease - The Basics",
        titleUrl: "https://www.youtube.com/watch?v=uUiIxgkkrKY",
        description: [
          "This session covers practical communication approaches for discussing genetics with individuals living with kidney disease.",
        ],
        videos: [
          {
            id: "uUiIxgkkrKY",
            title:
              "Talking About Genetics with Individuals with Kidney Disease - The Basics",
            url: "https://www.youtube.com/watch?v=uUiIxgkkrKY",
          },
        ],
      },
    ],
  },
  "6": {
    title: "Introduction to Genetic Testing and Counseling in Nephrology",
    subtitle: "1 video",
    intro:
      "Foundation course covering genetic testing and counseling fundamentals.",
    modules: [
      {
        id: "1",
        heading: "Video",
        title: "Introduction to Genetic Testing and Counseling in Nephrology",
        titleUrl: "https://www.youtube.com/watch?v=GUSWrWY6e5o",
        description: [
          "This foundational session introduces key concepts in genetic testing and counseling for nephrology care.",
        ],
        videos: [
          {
            id: "GUSWrWY6e5o",
            title: "Introduction to Genetic Testing and Counseling in Nephrology",
            url: "https://www.youtube.com/watch?v=GUSWrWY6e5o",
          },
        ],
      },
    ],
  },
  "7": {
    title: "Common Genetic Kidney Diseases",
    subtitle: "Read module",
    intro:
      "A precision medicine overview of why genetic testing matters in nephrology and which patients may benefit.",
    modules: [
      {
        id: "1",
        heading: "Common Genetic Kidney Diseases",
        title: "Common Genetic Kidney Diseases",
        image: {
          src: whoShouldGetTestedInfographic,
          alt: "Who should get tested genetics red flags infographic",
          heading: "Common Genetic Kidney Diseases",
        },
        description: [
          "Genetic testing plays a critical role in nephrology because a significant proportion of chronic kidney disease (CKD) has an underlying genetic cause.",
          "Nephrology continues to lag behind several other specialties in implementing genetics-informed care, despite strong potential for clinical impact.",
          "Improved diagnostic accuracy: Clarifies the exact cause of CKD, especially when the presentation is unclear or atypical.",
          "Better risk stratification and prognosis: Helps estimate disease trajectory and identify patients at higher risk.",
          "Family counseling and cascade testing: Supports recurrence-risk discussions, relative screening, and earlier detection in at-risk family members.",
          "Transplant planning: Genetic findings can help with donor selection and reduce hereditary risk transmission concerns.",
          "Therapeutic decision-making: Certain genetic diagnoses can guide treatment choice and eligibility for targeted therapies when available.",
        ],
        videos: [],
      },
    ],
    footerNote:
      "Reference: Franceschini N, Feldman DL, Berg JS, et al. Kidney diseases: report from a National Kidney Foundation Working Group. AJKD. 2024;6(7):751-766.",
  },
  "8": {
    title: "Who should get tested ?",
    subtitle: "Read module",
    intro:
      "Use this quick reference to identify red flags that raise suspicion for a genetic etiology in kidney disease.",
    modules: [
      {
        id: "1",
        heading: "Who should get tested ?",
        title: "Who should get tested ?",
        image: {
          src: whoShouldGetTestedInfographic,
          alt: "Red flags indications for genetic testing in nephrology",
          heading: "Who should get tested ?",
          citationLabel:
            "Bogyo, Kelsie; Vena, Natalie; Milo Rasouly, Hila. The Art and Science of Genetic Counseling in Nephrology. Kidney360 6(7):p 1230-1244, July 2025. DOI: 10.34067/KID.0000000825",
          citationUrl:
            "https://journals.lww.com/kidney360/fulltext/2025/07000/the_art_and_science_of_genetic_counseling_in.25.aspx",
        },
        description: [
          "The five colors represent five categories of information that can indicate a genetic cause.",
          "The presence of any single category can be enough to raise suspicion for a genetic basis of kidney disease.",
        ],
        videos: [],
      },
    ],
  },
};

type ConditionId =
  | "adpkd"
  | "arpkd"
  | "alport"
  | "cakut"
  | "srns"
  | "tubulopathies"
  | "ciliopathies"
  | "fabry"
  | "mitochondrial";

interface ConditionDetail {
  id: ConditionId;
  title: string;
  lead: string;
  sections: Array<{
    heading: string;
    bullets: string[];
  }>;
  reference: string;
  nextLinks?: Array<{
    label: string;
    to: ConditionId;
  }>;
}

const conditionMenu: Array<{ label: string; to: ConditionId }> = [
  {
    label:
      "Autosomal Dominant Polycystic Kidney Disease (ADPKD) / Autosomal Recessive Polycystic Kidney Disease (ARPKD)",
    to: "adpkd",
  },
  { label: "Alport syndrome", to: "alport" },
  { label: "Congenital Anomalies of the Kidney and Urinary Tract (CAKUT)", to: "cakut" },
  { label: "Nephrotic syndrome (Steroid-Resistant Nephrotic Syndrome)", to: "srns" },
  { label: "Tubulopathies (Gitelman, Bartter)", to: "tubulopathies" },
  { label: "Ciliopathies", to: "ciliopathies" },
  { label: "Fabry disease", to: "fabry" },
  { label: "Mitochondrial kidney disorders", to: "mitochondrial" },
];

const conditionDetails: Record<ConditionId, ConditionDetail> = {
  adpkd: {
    id: "adpkd",
    title: "1. Autosomal Dominant Polycystic Kidney Disease (ADPKD)",
    lead: "Most common inherited cystic kidney disease in adults with high-impact implications for screening and treatment planning.",
    sections: [
      {
        heading: "Indications for testing",
        bullets: [
          "Early-onset or atypical cystic kidney disease",
          "Negative family history but imaging suggests ADPKD",
          "Living kidney donor evaluation",
          "Younger patients where imaging is ambiguous",
        ],
      },
      {
        heading: "Clinical importance",
        bullets: [
          "PKD1 variants often correlate with more rapid progression",
          "Enables cascade family testing",
          "Supports donor screening and counseling",
          "Improves prognostic accuracy",
        ],
      },
      {
        heading: "Genetic context",
        bullets: [
          "Common genes: PKD1 (majority), PKD2",
          "Less common: IFT140, GANAB, HNF1B, ALG8, ALG9, PKHD1",
          "Autosomal dominant inheritance (~50% transmission risk)",
        ],
      },
    ],
    reference:
      "GeneReviews: Autosomal Dominant Polycystic Kidney Disease (updated 2025).",
    nextLinks: [
      {
        label: "2. Autosomal Recessive Polycystic Kidney Disease (ARPKD).",
        to: "arpkd",
      },
    ],
  },
  arpkd: {
    id: "arpkd",
    title: "2. Autosomal Recessive Polycystic Kidney Disease (ARPKD)",
    lead: "Severe pediatric-onset cystic kidney disease where genetics is central for neonatal and recurrence-risk decisions.",
    sections: [
      {
        heading: "Genes",
        bullets: ["PKHD1 (primary)", "DZIP1L (less common)"],
      },
      {
        heading: "Testing indications",
        bullets: ["Neonatal enlarged echogenic kidneys", "Congenital hepatic fibrosis"],
      },
      {
        heading: "Importance",
        bullets: [
          "Guides diagnosis and neonatal care",
          "Enables cascade family testing",
          "Critical for prenatal planning",
          "Determines recurrence risk for future pregnancies",
        ],
      },
    ],
    reference: "GeneReviews: Autosomal Recessive Polycystic Kidney Disease (updated 2024).",
  },
  alport: {
    id: "alport",
    title: "Alport Syndrome: Clinical Overview and Genetics",
    lead: "A collagen IV disorder with kidney, hearing, and ocular involvement where inheritance pattern affects severity and counseling.",
    sections: [
      {
        heading: "Genes and inheritance",
        bullets: [
          "Most common: COL4A5 (X-linked)",
          "Also: COL4A3 and COL4A4 (autosomal dominant/recessive forms)",
          "Digenic presentations may occur",
        ],
      },
      {
        heading: "Why it matters",
        bullets: [
          "Early diagnosis enables counseling and kidney-protective interventions",
          "Supports family screening and donor evaluation",
          "Clarifies prognosis and progression patterns",
        ],
      },
      {
        heading: "Clinical features",
        bullets: [
          "Persistent microscopic hematuria ± proteinuria",
          "Sensorineural hearing loss (especially XLAS)",
          "Eye findings: lenticonus, retinal changes",
        ],
      },
    ],
    reference: "GeneReviews: Alport Syndrome (updated 2025).",
  },
  cakut: {
    id: "cakut",
    title: "CAKUT (Congenital Anomalies of the Kidney and Urinary Tract)",
    lead: "A broad developmental spectrum with heterogeneous genetics and variable severity across families.",
    sections: [
      {
        heading: "Genetic landscape",
        bullets: [
          "Common genes include PAX2, HNF1B, EYA1, GATA3, RET",
          "Other genes include WNT4, WNT9B, BMP4",
          "High heterogeneity and multifactorial contributions",
        ],
      },
      {
        heading: "Clinical features",
        bullets: [
          "Kidney anomalies: agenesis, dysplasia, hydronephrosis",
          "Urinary tract anomalies: VUR and obstructive patterns",
          "Symptoms include recurrent UTIs, poor growth, hypertension/CKD",
        ],
      },
      {
        heading: "Why it matters",
        bullets: [
          "Major cause of pediatric CKD",
          "Often detected prenatally",
          "Early diagnosis supports family screening and intervention",
        ],
      },
    ],
    reference: "Clin Pediatr review and CAKUT genetics literature.",
  },
  srns: {
    id: "srns",
    title: "Genes in Steroid-Resistant Nephrotic Syndrome (SRNS)",
    lead: "Monogenic causes should be considered in early-onset or familial FSGS/SRNS, especially before immunosuppression decisions.",
    sections: [
      {
        heading: "Primary genes",
        bullets: ["NPHS1", "NPHS2", "ACTN4", "INF2", "TRPC6"],
      },
      {
        heading: "APOL1-associated risk",
        bullets: [
          "High-risk APOL1 genotypes contribute to FSGS/SRNS risk",
          "Particularly relevant in populations of African descent",
        ],
      },
      {
        heading: "Additional rare genes",
        bullets: ["WT1", "CD2AP", "LMNA", "PLCE1", "COQ2"],
      },
    ],
    reference: "GeneReviews: Steroid-Resistant Nephrotic Syndrome overview.",
  },
  tubulopathies: {
    id: "tubulopathies",
    title: "Bartter & Gitelman Syndromes: Comparative Overview",
    lead: "Electrolyte-pattern phenotypes direct focused genetic testing and reduce unnecessary broad workups.",
    sections: [
      {
        heading: "Bartter syndrome",
        bullets: [
          "Genes: SLC12A1, KCNJ1, CLCNKB, BSND",
          "Typical phenotype: neonatal/infantile hypokalemic alkalosis",
        ],
      },
      {
        heading: "Gitelman syndrome",
        bullets: [
          "Gene: SLC12A3",
          "Typical phenotype: chronic hypokalemia, hypomagnesemia, low blood pressure",
        ],
      },
      {
        heading: "Clinical utility",
        bullets: [
          "Guides lifelong electrolyte-focused management",
          "Improves diagnostic precision and avoids unnecessary testing",
        ],
      },
    ],
    reference: "GeneReviews: Hypokalemic Periodic Paralysis / Bartter-Gitelman references.",
  },
  ciliopathies: {
    id: "ciliopathies",
    title: "Nephronophthisis-Related Ciliopathies (NPHP-RC)",
    lead: "Important inherited cause of pediatric CKD with multi-system features and often delayed recognition.",
    sections: [
      {
        heading: "Genes and inheritance",
        bullets: [
          "Common gene: NPHP1; others include NPHP3/4/5 and ciliopathy-associated genes",
          "Mostly autosomal recessive; oligogenic patterns can occur",
        ],
      },
      {
        heading: "Clinical clues",
        bullets: [
          "Kidney: tubulointerstitial disease, small/normal kidneys, corticomedullary cysts",
          "Extra-renal: retinal disease, cerebellar anomalies, liver fibrosis",
        ],
      },
      {
        heading: "Why it matters",
        bullets: [
          "Major cause of genetic CKD in youth",
          "Supports earlier diagnosis, family counseling, and screening",
        ],
      },
    ],
    reference: "GeneReviews: Nephronophthisis-Related Ciliopathies (updated 2023).",
  },
  fabry: {
    id: "fabry",
    title: "Fabry Disease: Key Features and Clinical Value",
    lead: "X-linked GLA-related disorder where kidney disease may be the first clue and early diagnosis changes management.",
    sections: [
      {
        heading: "Testing indications",
        bullets: [
          "Unexplained proteinuria with LVH",
          "Neuropathic pain and angiokeratomas",
          "Family history suggestive of X-linked inheritance",
        ],
      },
      {
        heading: "Clinical value",
        bullets: [
          "Enzyme replacement therapy (ERT) eligibility",
          "Facilitates family cascade screening",
          "Improves renal/cardiac/neurologic monitoring and risk planning",
        ],
      },
    ],
    reference: "GeneReviews: Fabry Disease (updated 2024).",
  },
  mitochondrial: {
    id: "mitochondrial",
    title: "Mitochondrial Nephropathy",
    lead: "Multisystem mitochondrial disorders can present with kidney-limited findings, so genetics is key for diagnosis and counseling.",
    sections: [
      {
        heading: "Genetic causes",
        bullets: [
          "mtDNA variants (e.g., MT-TL1/MELAS context)",
          "Nuclear genes such as COQ8B, PDSS2, ADCK4, TWNK",
          "Both mitochondrial and nuclear mechanisms are relevant",
        ],
      },
      {
        heading: "Kidney phenotypes",
        bullets: [
          "Proteinuria/FSGS",
          "Tubulopathy",
          "Progressive CKD",
        ],
      },
      {
        heading: "Why it matters",
        bullets: [
          "Often underrecognized cause of CKD",
          "Impacts family counseling and management decisions",
          "Variable expression due to heteroplasmy",
        ],
      },
    ],
    reference: "Clin Exp Nephrol 2025 and mitochondrial nephropathy reviews.",
  },
};

function parseYouTubeTimeToSeconds(value: string) {
  const raw = value.trim();
  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return null;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      const startParam = parsed.searchParams.get("t");
      const startSeconds = startParam
        ? parseYouTubeTimeToSeconds(startParam)
        : null;
      const embed = new URL(`https://www.youtube.com/embed/${id}`);
      if (startSeconds && startSeconds > 0) {
        embed.searchParams.set("start", String(startSeconds));
      }
      embed.searchParams.set("enablejsapi", "1");
      if (typeof window !== "undefined") {
        embed.searchParams.set("origin", window.location.origin);
      }
      return embed.toString();
    }

    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
      const videoId = parsed.searchParams.get("v");
      if (!videoId) return url;
      const startParam = parsed.searchParams.get("t") || parsed.searchParams.get("start");
      const startSeconds = startParam
        ? parseYouTubeTimeToSeconds(startParam)
        : null;
      const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
      if (startSeconds && startSeconds > 0) {
        embed.searchParams.set("start", String(startSeconds));
      }
      embed.searchParams.set("enablejsapi", "1");
      if (typeof window !== "undefined") {
        embed.searchParams.set("origin", window.location.origin);
      }
      return embed.toString();
    }
  } catch {
    return url;
  }

  return url;
}

export default function ModuleDetail() {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [watchedVideoIds, setWatchedVideoIds] = useState<Set<string>>(
    () => readIdSet(WATCHED_VIDEOS_KEY)
  );

  const series = moduleId ? seriesData[moduleId] : null;
  const allSeriesVideoIds = useMemo(
    () =>
      series
        ? Array.from(
            new Set(series.modules.flatMap((module) => module.videos.map((video) => video.id)))
          )
        : [],
    [series]
  );

  const completedVideoCount = allSeriesVideoIds.filter((id) => watchedVideoIds.has(id)).length;
  const isSeriesCompleted =
    allSeriesVideoIds.length === 0 || completedVideoCount === allSeriesVideoIds.length;

  useEffect(() => {
    if (!series) return;
    setWatchedVideoIds(readIdSet(WATCHED_VIDEOS_KEY));
  }, [series, moduleId]);

  useEffect(() => {
    if (!moduleId || !isSeriesCompleted) return;
    const completedModules = readIdSet(COMPLETED_MODULES_KEY);
    if (completedModules.has(moduleId)) return;
    completedModules.add(moduleId);
    writeIdSet(COMPLETED_MODULES_KEY, completedModules);
  }, [moduleId, isSeriesCompleted]);

  useEffect(() => {
    if (!series) return;

    let isCancelled = false;
    const players: any[] = [];

    loadYouTubeIframeApi().then((YT) => {
      if (isCancelled || !YT?.Player) return;

      const iframes = Array.from(
        document.querySelectorAll<HTMLIFrameElement>("iframe[data-yt-video-id]")
      );

      for (const iframe of iframes) {
        const videoId = iframe.dataset.ytVideoId;
        if (!videoId) continue;

        const player = new YT.Player(iframe, {
          events: {
            onStateChange: (event: any) => {
              if (event.data !== YT.PlayerState.ENDED) return;

              setWatchedVideoIds((previous) => {
                if (previous.has(videoId)) return previous;
                const next = new Set(previous);
                next.add(videoId);
                writeIdSet(WATCHED_VIDEOS_KEY, next);
                return next;
              });
            },
          },
        });

        players.push(player);
      }
    });

    return () => {
      isCancelled = true;
      for (const player of players) {
        try {
          player.destroy?.();
        } catch {
          // no-op
        }
      }
    };
  }, [series, moduleId]);

  if (!series) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-900 mb-2">Module not found</h2>
          <button
            onClick={() => navigate("/doctor/education")}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Resources
          </button>
        </div>
      </div>
    );
  }

  const selectedConditionId = searchParams.get("condition") as ConditionId | null;
  const selectedCondition =
    moduleId === "7" && selectedConditionId ? conditionDetails[selectedConditionId] : null;

  const openCondition = (conditionId: ConditionId) => {
    const next = new URLSearchParams(searchParams);
    next.set("condition", conditionId);
    setSearchParams(next);
  };

  const clearCondition = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("condition");
    setSearchParams(next);
  };

  if (moduleId === "7") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 relative">
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (selectedCondition ? clearCondition() : navigate("/doctor/education"))}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl text-gray-900">{series.title}</h1>
              <p className="text-sm text-gray-600">{series.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-5 md:p-7 space-y-6">
            {!selectedCondition && (
              <>
                <p className="text-sm text-gray-700 leading-7">{series.intro}</p>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg text-gray-900 mb-3">Condition Links</h2>
                  <ul className="space-y-3 text-sm">
                    {conditionMenu.map((item) => (
                      <li key={item.to}>
                        <button
                          onClick={() => openCondition(item.to)}
                          className="text-blue-700 underline text-left hover:text-blue-800"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {selectedCondition && (
              <div className="space-y-5">
                <h2 className="text-2xl text-gray-900">{selectedCondition.title}</h2>
                <p className="text-sm text-gray-700 leading-7">{selectedCondition.lead}</p>

                <div className="grid gap-4 md:grid-cols-3">
                  {selectedCondition.sections.map((section) => (
                    <div
                      key={section.heading}
                      className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4"
                    >
                      <h3 className="text-base text-gray-900 mb-2">{section.heading}</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {selectedCondition.nextLinks && selectedCondition.nextLinks.length > 0 && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-2">
                    {selectedCondition.nextLinks.map((nextLink) => (
                      <button
                        key={nextLink.to}
                        onClick={() => openCondition(nextLink.to)}
                        className="text-blue-700 underline text-left hover:text-blue-800"
                      >
                        {nextLink.label}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500">{selectedCondition.reference}</p>
              </div>
            )}

            {series.footerNote && <p className="text-sm text-gray-600">{series.footerNote}</p>}
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/doctor/education")}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl text-gray-900">{series.title}</h1>
            <p className="text-sm text-gray-600">{series.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-5 md:p-7 space-y-10">
          <p className="text-sm text-gray-700 leading-7">{series.intro}</p>
          {allSeriesVideoIds.length > 0 ? (
            <p className="text-sm text-gray-600">
              Watched videos: {completedVideoCount} of {allSeriesVideoIds.length}
            </p>
          ) : (
            <p className="text-sm text-gray-600">This module is reading-based (no video).</p>
          )}

          {series.modules.map((module) => (
            <div key={module.id} className="space-y-4">
              <h2 className="text-lg text-gray-900">{module.heading}</h2>
              {module.titleUrl ? (
                <a
                  href={module.titleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1594b8] hover:text-[#0f7f9f] text-lg leading-snug"
                >
                  {module.title}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <h3 className="text-[#1594b8] text-lg leading-snug">{module.title}</h3>
              )}

              <div className="space-y-3">
                {module.description.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-gray-700 leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>

              {module.image && (
                <div className="space-y-3">
                  {module.image.heading && (
                    <h4 className="text-base text-gray-900">{module.image.heading}</h4>
                  )}
                  <div className="rounded-xl border border-gray-200 bg-white p-2">
                    <img
                      src={module.image.src}
                      alt={module.image.alt}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  {module.image.citationUrl && module.image.citationLabel && (
                    <a
                      href={module.image.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-blue-700 hover:text-blue-800 underline break-words"
                    >
                      {module.image.citationLabel}
                    </a>
                  )}
                </div>
              )}

              {module.cme && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-800">CME Info:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>
                      <a
                        href={module.cme.detailsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1594b8] hover:text-[#0f7f9f]"
                      >
                        {module.cme.detailsLabel}
                      </a>
                    </li>
                    <li>
                      After watching the content video, complete the{" "}
                      <a
                        href={module.cme.posttestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1594b8] hover:text-[#0f7f9f]"
                      >
                        CME posttest & evaluation
                      </a>
                    </li>
                    <li>{module.cme.creditText}</li>
                  </ul>
                </div>
              )}

              <div className="space-y-6">
                {module.videos.map((video) => (
                  <div key={video.id} className="space-y-3">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#1594b8] hover:text-[#0f7f9f] text-base leading-snug"
                    >
                      {video.title}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {video.duration && (
                      <p className="text-xs text-gray-500">Duration: {video.duration}</p>
                    )}
                    <div className="relative bg-black aspect-video rounded-xl overflow-hidden">
                      <iframe
                        src={toEmbedUrl(video.url)}
                        title={video.title}
                        data-yt-video-id={video.id}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {series.footerNote && (
            <p className="text-sm text-gray-600">{series.footerNote}</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
