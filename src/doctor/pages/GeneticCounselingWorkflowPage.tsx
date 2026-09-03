import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ClipboardCheck,
  FileText,
  GitBranch,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { DoctorPageShell, doctorSerifFont } from "../components/DoctorShell";

type WorkflowOption = {
  id: string;
  title: string;
  description: string;
  icon: typeof Stethoscope;
  href?: string;
  route?: string;
};

const workflowOptions: WorkflowOption[] = [
  {
    id: "clinical-examination",
    title: "Clinical Examination",
    description: "Clinical red flags, kidney phenotype, extra-renal findings, and baseline evaluation steps.",
    icon: Stethoscope,
  },
  {
    id: "pedigree-analysis",
    title: "Pedigree Analysis",
    description: "Family structure, inheritance clues, and how pedigree review changes testing strategy.",
    icon: GitBranch,
    href: "https://www.genecascade.org/ped-cgi/pedigree.cgi",
  },
  {
    id: "how-to-choose-the-test",
    title: "How to Choose the Test",
    description: "Selecting the right genetic test based on phenotype, suspected diagnosis, and workflow fit.",
    icon: Microscope,
  },
  {
    id: "informed-consent",
    title: "Informed Consent",
    description: "Consent essentials, limitations, uncertain findings, family implications, and expectations.",
    icon: ShieldCheck,
  },
  {
    id: "results-disclosure-follow-up",
    title: "Results Disclosure and Follow Up",
    description: "Returning results, interpreting impact, counseling next steps, and follow-up planning.",
    icon: ClipboardCheck,
  },
  {
    id: "letter-of-medical-necessity-template",
    title: "Letter of Medical Necessity Template",
    description: "Direct-order toolkit with clinician-facing language and a draft letter preview for coverage support.",
    icon: FileText,
    route: "/doctor/dashboard/resource/order-testing-directly",
  },
];

export default function GeneticCounselingWorkflowPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const dashboardRoute = source === "practical" ? "/doctor/dashboard/practical" : "/doctor/dashboard/educational";
  const workflowSearch = source ? `?source=${source}` : "";

  useEffect(() => {
    const workflowTitles = workflowOptions.map((option) => option.title);

    const stripLegacyWorkflowActions = () => {
      const cards = Array.from(document.querySelectorAll("button, a, div")).filter((node) => {
        const text = node.textContent || "";
        return workflowTitles.some((title) => text.includes(title));
      });

      cards.forEach((card) => {
        const legacyActionNodes = Array.from(card.querySelectorAll("button, a, span, div")).filter((node) =>
          (node.textContent || "").includes("Open section"),
        );

        legacyActionNodes.forEach((node) => {
          const actionButton = node.closest("button, a");
          const actionContainer = actionButton?.parentElement ?? node.parentElement;

          if (actionButton && actionButton !== card) {
            actionButton.remove();
          } else if (node !== card) {
            node.remove();
          }

          if (!actionContainer || actionContainer === card) return;

          Array.from(actionContainer.querySelectorAll("button, a")).forEach((candidate) => {
            const candidateText = (candidate.textContent || "").trim();
            const hasOnlyIcon = candidateText.length === 0 && candidate.querySelector("svg");
            const looksLikeArrowControl =
              candidateText === ">" ||
              candidateText === "→" ||
              candidateText === "›" ||
              hasOnlyIcon;

            if (looksLikeArrowControl) {
              candidate.remove();
            }
          });

          const remainingText = (actionContainer.textContent || "").trim();
          if (!remainingText && !actionContainer.querySelector("button, a")) {
            actionContainer.remove();
          }
        });
      });
    };

    stripLegacyWorkflowActions();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(stripLegacyWorkflowActions);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const intervalId = window.setInterval(stripLegacyWorkflowActions, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
    };
  }, []);

  const openWorkflowOption = (option: WorkflowOption) => {
    if (option.href) {
      window.location.assign(option.href);
      return;
    }

    if (option.route) {
      navigate(`${option.route}${workflowSearch}`);
      return;
    }

    navigate(`/doctor/dashboard/resource/genetic-counseling-workflow/${option.id}${workflowSearch}`);
  };

  return (
    <DoctorPageShell activeMode={source === "practical" ? "practical" : "educational"}>
        <section className="relative mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => navigate(dashboardRoute)}
              className="rounded-full border border-[#c3d6d9] bg-white px-4 py-2 text-sm font-semibold text-[#00687b] transition-colors hover:bg-[#cfe7ea]"
            >
              Back
            </button>
          </div>

          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[#00687b]">
              Workflow
            </p>
            <h1 className="font-bold text-[2.1rem] leading-tight text-[#16323b] md:text-5xl" style={{ fontFamily: doctorSerifFont }}>
              Genetic Counseling Workflow
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#5b6472]">
              Clinical workflow and counseling steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:auto-rows-fr xl:grid-cols-3">
            {workflowOptions.map((option, index) => {
              const Icon = option.icon;

              const cardClasses =
                "group flex min-h-[360px] w-full flex-col items-center justify-center rounded-3xl border border-[#c3d6d9] bg-white p-6 text-center shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] transition-all hover:-translate-y-1 hover:border-[#9fbfc5] hover:shadow-[0_18px_44px_-18px_rgba(12,48,58,0.24),0_4px_12px_-4px_rgba(12,48,58,0.1)] sm:p-7";

              const cardContent = (
                <>
                  <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-[#cfe7ea] text-[#00687b]">
                    <Icon
                      className="h-12 w-12"
                      strokeWidth={1.55}
                    />
                  </div>
                  <h2
                    className="max-w-[16ch] text-[1.45rem] font-bold leading-tight text-[#16323b] transition-colors group-hover:text-[#00687b] md:text-[1.7rem]"
                    style={{ fontFamily: doctorSerifFont }}
                  >
                    {option.title}
                  </h2>
                  <p className="mt-3 text-[1rem] leading-relaxed text-[#3f4650]">
                    {option.description}
                  </p>
                </>
              );

              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.28 }}
                  className="h-full"
                >
                  {option.href ? (
                    <button
                      type="button"
                      onClick={() => openWorkflowOption(option)}
                      className={`${cardClasses} cursor-pointer`}
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <Link
                      to={
                        option.route
                          ? `${option.route}${workflowSearch}`
                          : `/doctor/dashboard/resource/genetic-counseling-workflow/${option.id}${workflowSearch}`
                      }
                      className={cardClasses}
                    >
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
    </DoctorPageShell>
  );
}
