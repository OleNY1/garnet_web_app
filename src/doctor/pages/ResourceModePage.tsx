import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { educationalCards, modeSummary, practicalCards, type ResourceMode } from "../data/resourceCards";
import { DoctorPageShell, doctorSerifFont } from "../components/DoctorShell";

function isResourceMode(value: string | undefined): value is ResourceMode {
  return value === "educational" || value === "practical";
}

export default function ResourceModePage() {
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Clinician");
      localStorage.setItem("userRole", "doctor");
    }

    if (!isResourceMode(mode)) {
      navigate("/doctor/dashboard", { replace: true });
    }
  }, [mode, navigate]);

  if (!isResourceMode(mode)) {
    return null;
  }

  const cards = mode === "educational" ? educationalCards : practicalCards;
  const summary = modeSummary[mode];
  const gridClassName =
    mode === "practical"
      ? "grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
      : "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3";

  return (
    <DoctorPageShell activeMode={mode}>
        <section className="relative mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => navigate("/doctor/dashboard")}
              className="rounded-full border border-[#c3d6d9] bg-white px-4 py-2 text-sm font-semibold text-[#00687b] transition-colors hover:bg-[#cfe7ea]"
            >
              Back
            </button>
          </div>

          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[#00687b]">
              Doctor resources
            </p>
            <h1 className="font-bold text-[2.1rem] leading-tight text-[#16323b] md:text-5xl" style={{ fontFamily: doctorSerifFont }}>
              {summary.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#5b6472]">{summary.description}</p>
          </div>

          <div className={gridClassName}>
            {cards.map((card, index) => {
              const Icon = card.icon;
              const isInteractive = Boolean(card.route);

              return (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.28 }}
                  onClick={() => {
                    if (card.route) navigate(card.route);
                  }}
                  aria-disabled={!isInteractive}
                  className={`group flex min-h-[280px] w-full flex-col items-center justify-center rounded-3xl border border-[#c3d6d9] bg-white p-6 text-center shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] transition-all sm:p-7 ${
                    isInteractive
                      ? "cursor-pointer hover:-translate-y-1 hover:border-[#9fbfc5] hover:shadow-[0_18px_44px_-18px_rgba(12,48,58,0.24),0_4px_12px_-4px_rgba(12,48,58,0.1)]"
                      : "cursor-default"
                  }`}
                >
                  <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-[1.75rem] ${
                    mode === "educational" ? "bg-[#cfe7ea] text-[#00687b]" : "bg-[#f4d8d2] text-[#9f4035]"
                  }`}>
                    <Icon className="h-12 w-12" strokeWidth={1.55} />
                  </div>
                  <h3 className="font-bold text-[1.45rem] leading-tight text-[#16323b] transition-colors group-hover:text-[#00687b]" style={{ fontFamily: doctorSerifFont }}>
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-[#3f4650]">{card.subtitle}</p>
                </motion.button>
              );
            })}
          </div>
        </section>
    </DoctorPageShell>
  );
}
