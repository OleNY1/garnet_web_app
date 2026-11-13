import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { educationalCards, educationalGroups, modeSummary, practicalCards, type ResourceCard, type ResourceMode } from "../data/resourceCards";
import { DoctorPageShell, doctorSerifFont } from "../components/DoctorShell";

function isResourceMode(value: string | undefined): value is ResourceMode {
  return value === "educational" || value === "practical";
}

export default function ResourceModePage() {
  const navigate = useNavigate();
  const { mode, groupId } = useParams();
  const group = educationalGroups.find((item) => item.id === groupId);

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Clinician");
      localStorage.setItem("userRole", "doctor");
    }

    if (!isResourceMode(mode)) {
      navigate("/doctor/dashboard", { replace: true });
    } else if (groupId && (mode !== "educational" || !group)) {
      navigate(`/doctor/dashboard/${mode}`, { replace: true });
    }
  }, [group, groupId, mode, navigate]);

  if (!isResourceMode(mode) || (groupId && (mode !== "educational" || !group))) {
    return null;
  }

  const summary = modeSummary[mode];
  const renderCard = (card: ResourceCard, index: number) => {
    const Icon = card.icon;
    return (
      <motion.button
        key={card.id}
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.28 }}
        onClick={() => { if (card.route) navigate(card.route); }}
        disabled={!card.route}
        className={`group flex w-full flex-col items-center justify-center rounded-3xl border border-line bg-surface p-6 text-center shadow-soft transition-all enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:hover:border-[#9fbfc5] dark:enabled:hover:border-line enabled:hover:shadow-lift ${mode === "educational" ? "min-h-56" : "min-h-[280px] sm:p-7"}`}
      >
        <div className={`mb-5 flex items-center justify-center rounded-[1.5rem] ${mode === "educational" ? "size-16 bg-brand-soft text-brand" : "size-24 bg-accent-soft text-accent"}`}>
          <Icon aria-hidden="true" className={mode === "educational" ? "size-8" : "size-12"} strokeWidth={1.55} />
        </div>
        <h2 className="text-xl font-bold leading-tight text-ink group-hover:text-brand" style={{ fontFamily: doctorSerifFont }}>{card.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-body">{card.subtitle}</p>
      </motion.button>
    );
  };

  return (
    <DoctorPageShell activeMode={mode}>
        <section className="relative mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => navigate(group ? "/doctor/dashboard/educational" : "/doctor/dashboard")}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
            >
              {group ? "Back to Educational Materials" : "Back"}
            </button>
          </div>

          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[0.9rem] font-bold uppercase tracking-[0.14em] text-brand">
              {group ? "Educational Materials" : "Doctor resources"}
            </p>
            <h1 className="font-bold text-[2.1rem] leading-tight text-ink md:text-5xl" style={{ fontFamily: doctorSerifFont }}>
              {group?.title ?? summary.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{group?.subtitle ?? summary.description}</p>
          </div>

          {group ? (
            <div key={group.id} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {group.cardIds.map((id, index) => {
                const card = educationalCards.find((item) => item.id === id);
                return card ? renderCard(card, index) : null;
              })}
            </div>
          ) : mode === "educational" ? (
            <div className="mx-auto grid max-w-[22rem] gap-5 sm:max-w-none sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {educationalGroups.map(({ id, title, subtitle, icon: Icon }) => (
                <Link
                  key={id}
                  to={`/doctor/dashboard/educational/${id}`}
                  className="group flex aspect-square min-w-0 flex-col items-center justify-center rounded-3xl border border-line bg-surface p-4 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-[#9fbfc5] dark:hover:border-line hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00687b] sm:p-5"
                >
                  <span className="mb-3 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.55} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold leading-tight text-ink group-hover:text-brand" style={{ fontFamily: doctorSerifFont }}>{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-body">{subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">{practicalCards.map(renderCard)}</div>
          )}
        </section>
    </DoctorPageShell>
  );
}
