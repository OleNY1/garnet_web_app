import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { educationalCards, educationalGroups, modeSummary, practicalCards, type ResourceCard, type ResourceMode } from "../data/resourceCards";
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

  const summary = modeSummary[mode];
  const renderCard = (card: ResourceCard, index: number) => {
    const Icon = card.icon;
    const Heading = mode === "educational" ? "h3" : "h2";
    return (
      <motion.button
        key={card.id}
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.28 }}
        onClick={() => { if (card.route) navigate(card.route); }}
        disabled={!card.route}
        className={`group flex w-full flex-col items-center justify-center rounded-3xl border border-[#c3d6d9] bg-white p-6 text-center shadow-soft transition-all enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:hover:border-[#9fbfc5] enabled:hover:shadow-lift ${mode === "educational" ? "min-h-56" : "min-h-[280px] sm:p-7"}`}
      >
        <div className={`mb-5 flex items-center justify-center rounded-[1.5rem] ${mode === "educational" ? "size-16 bg-[#cfe7ea] text-[#00687b]" : "size-24 bg-[#f4d8d2] text-[#9f4035]"}`}>
          <Icon aria-hidden="true" className={mode === "educational" ? "size-8" : "size-12"} strokeWidth={1.55} />
        </div>
        <Heading className="text-xl font-bold leading-tight text-[#16323b] group-hover:text-[#00687b]" style={{ fontFamily: doctorSerifFont }}>{card.title}</Heading>
        <p className="mt-3 text-base leading-relaxed text-[#3f4650]">{card.subtitle}</p>
      </motion.button>
    );
  };

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

          {mode === "educational" ? (
            <div className="space-y-12">
              {educationalGroups.map(({ title, icon: Icon, cardIds }, index) => (
                <section key={title} aria-labelledby={`education-group-${index + 1}`} className="border-t border-[#b8cfd2] pt-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Icon aria-hidden="true" className="size-6 shrink-0 text-[#00687b]" />
                    <h2 id={`education-group-${index + 1}`} className="text-xl font-semibold text-[#16323b] sm:text-2xl" style={{ fontFamily: doctorSerifFont }}>{title}</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cardIds.map((id, cardIndex) => {
                      const card = educationalCards.find(item => item.id === id);
                      return card ? renderCard(card, cardIndex) : null;
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">{practicalCards.map(renderCard)}</div>
          )}
        </section>
    </DoctorPageShell>
  );
}
