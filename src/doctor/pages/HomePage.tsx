import {
  ArrowRight,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import logoImage from "../../assets/26855d41a9beac7f3e8a4cf381d8b18542c83f02.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroVideoUrl =
  "https://res.cloudinary.com/djrdwgtep/video/upload/f_mp4,q_auto/v1774985263/Screen_Recording_2026-03-31_at_2.22.27_PM_c6k1kz.mp4";

const branchCards = [
  {
    eyebrow: "For patients and families",
    title: "I am a patient",
    description:
      "Learn what genetic testing can mean for kidney disease, family members, privacy, and next steps.",
    cta: "Enter patient side",
    icon: HeartHandshake,
    accent: "teal",
    route: "/doctor/education",
  },
  {
    eyebrow: "For clinicians",
    title: "I am a doctor",
    description:
      "Access nephrology education, clinical workflows, counseling resources, and ordering tools.",
    cta: "Enter clinician side",
    icon: Stethoscope,
    accent: "coral",
    route: "/doctor/dashboard",
  },
];

export default function HomePage() {
  const goTo = (path: string) => {
    window.location.assign(path);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#181b24]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="sticky top-0 z-30 border-b border-[#d7d9e6] bg-[#faf8ff]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1140px] items-center justify-between px-4 sm:px-6">
          <button onClick={() => goTo("/")} className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-[#d7d9e6] bg-white">
              <ImageWithFallback
                src={logoImage}
                alt="Nephrogenetics"
                className="h-full w-full object-cover scale-110"
              />
            </div>
            <span className="text-xl text-[#181b24] sm:text-2xl" style={{ fontFamily: "'Lora Variable', serif" }}>
              Nephrogenetics
            </span>
          </button>

          <button
            onClick={() => goTo("/doctor/login")}
            className="rounded-full bg-[#004e5d] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00687b] sm:px-6 sm:text-base"
          >
            Sign In
          </button>
        </div>
      </header>

      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#181b24]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoUrl}
        />
        <div className="absolute inset-0 bg-[#181b24]/52" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#181b24aa_0%,transparent_42%,#181b2466_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1140px] flex-col items-start justify-center px-6 py-16 text-left">
          <div className="mb-6 h-1 w-20 bg-[#ff8a7a]" />
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "'Lora Variable', serif" }}>
            Genetic Testing In Nephrology
          </h1>
        </div>
      </section>

      <section id="platform" className="relative overflow-hidden bg-[#faf8ff] px-4 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[#fff5f3]" />
        <div className="relative mx-auto max-w-[1140px]">
          <div className="mb-12 text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#00687b]">
              Choose your path
            </p>
            <h2 className="text-4xl font-bold leading-tight text-[#16323b] md:text-6xl" style={{ fontFamily: "'Lora Variable', serif" }}>
              Choose where to begin
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5b6472] md:text-xl">
              Select the experience that fits you. Each side uses different language, tools, and resources.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {branchCards.map((card) => (
              <button
                key={card.title}
                onClick={() => goTo(card.route)}
                className="group flex min-h-[360px] flex-col rounded-[30px] border border-[#c3d6d9] bg-white p-8 text-left shadow-[0_16px_38px_rgba(12,48,58,0.08)] transition-all hover:-translate-y-1 hover:border-[#9fbfc5] hover:shadow-[0_22px_46px_rgba(12,48,58,0.12)] sm:p-10"
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${
                    card.accent === "teal" ? "bg-[#cfe7ea] text-[#00687b]" : "bg-[#f4d8d2] text-[#9f4035]"
                  }`}
                >
                  <card.icon className="h-8 w-8" strokeWidth={1.8} />
                </div>
                <p
                  className={`mb-3 text-sm font-bold uppercase tracking-[0.14em] ${
                    card.accent === "teal" ? "text-[#00687b]" : "text-[#9f4035]"
                  }`}
                >
                  {card.eyebrow}
                </p>
                <h3 className="text-4xl font-bold leading-tight text-[#16323b]" style={{ fontFamily: "'Lora Variable', serif" }}>
                  {card.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#3f4650]">{card.description}</p>
                <span className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#9fbfc5] px-6 text-base font-bold text-[#00687b] transition-colors group-hover:border-[#00687b] group-hover:bg-[#cfe7ea]">
                  {card.cta}
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#e8f6f8] px-4 py-5 text-[#3f484b] sm:px-6 sm:py-6">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#00687b]/20 bg-white">
              <ImageWithFallback
                src={logoImage}
                alt="Nephrogenetics"
                className="h-full w-full object-cover scale-110"
              />
            </div>
            <span className="text-xl text-[#181b24]" style={{ fontFamily: "'Lora Variable', serif" }}>
              Nephrogenetics
            </span>
          </div>
          <p className="text-sm text-[#3f484b]">© 2026 Nephrogenetics. Empowering kidney care through genetics.</p>
        </div>
      </footer>
    </div>
  );
}
