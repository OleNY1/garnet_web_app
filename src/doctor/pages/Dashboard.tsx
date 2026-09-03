import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import BottomNav from "../components/BottomNav";
import logoImage from "../../assets/26855d41a9beac7f3e8a4cf381d8b18542c83f02.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Dashboard() {
  const navigate = useNavigate();
  const gcMatcherRoute = "/doctor/counselors";
  const userName = localStorage.getItem("userName") || "Guest";
  const userRole = localStorage.getItem("userRole") || "patient";
  const dashboardCardsVideo = "/videos/dashboard-cards-background.mov";
  const dashboardCardsFrameTime = 0.8;
  const assessmentCardVideo = "/videos/patient-assessment.mp4";
  const counselorCardVideo = "/videos/career-guidance.mp4";
  const educationCardVideo = "/videos/education-student.mp4";
  const literacyCardVideo = "/videos/literacy-evaluation.mp4";

  const freezeVideoAtFrame = (
    event: SyntheticEvent<HTMLVideoElement>,
    frameTimeSeconds: number
  ) => {
    const video = event.currentTarget;
    const safeTarget =
      Number.isFinite(video.duration) && video.duration > 0
        ? Math.max(0, Math.min(frameTimeSeconds, video.duration - 0.05))
        : Math.max(0, frameTimeSeconds);
    video.currentTime = safeTarget;
    video.pause();
  };

  const openGcMatcherInNewTab = () => {
    const newTab = window.open(gcMatcherRoute, "_blank", "noopener,noreferrer");
    if (!newTab) {
      alert("Please allow pop-ups for this site to open GC Matchup in a new tab.");
    }
  };

  const mainCards = [
    {
      id: "assessment",
      title: "Patient Assessment",
      description: "Check if you qualify for genetic testing",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      videoSrc: assessmentCardVideo,
      frameTime: 1.15,
      videoPosition: "center center",
      route: "/doctor/assessment",
    },
    {
      id: "counselor",
      title: "GC Matchup",
      description: "Find the right genetic counselor",
      gradient: "from-teal-400 via-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-100/50",
      videoSrc: counselorCardVideo,
      frameTime: 0.95,
      videoPosition: "center center",
      route: gcMatcherRoute,
      opensInNewTab: true,
    },
    {
      id: "education",
      title: "Resources",
      description: userRole === "clinician" 
        ? "Learn about genetic testing protocols"
        : "Learn about genetic testing",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      bgGradient: "from-green-50 to-emerald-100/50",
      videoSrc: educationCardVideo,
      frameTime: 0.9,
      videoPosition: "center 58%",
      route: "/doctor/education",
    },
    {
      id: "literacy",
      title: "Literacy Assessment",
      description: "Test your understanding",
      gradient: "from-purple-400 via-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-100/50",
      videoSrc: literacyCardVideo,
      frameTime: 0.7,
      videoPosition: "center center",
      route: "/doctor/literacy",
    },
  ];

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 flex-1 pb-24 md:pb-0">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden rounded-full">
                <ImageWithFallback src={logoImage} alt="Nephrogenetics" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl text-gray-900 sm:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                  Hi {userName}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Cards Grid */}
        <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem]">
            <video
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              src={dashboardCardsVideo}
              onLoadedMetadata={(event) =>
                freezeVideoAtFrame(event, dashboardCardsFrameTime)
              }
              onSeeked={(event) => event.currentTarget.pause()}
            />
            <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px]" />

            <div className="relative grid grid-cols-1 gap-4 p-3 sm:gap-6 sm:p-4 lg:grid-cols-2">
              {mainCards.map((card, index) => (
                <motion.button
                  key={card.id}
                  onClick={() =>
                    card.opensInNewTab
                      ? openGcMatcherInNewTab()
                      : navigate(card.route)
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative overflow-hidden rounded-3xl text-left"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  {/* Card container with 3D effect */}
                  <div 
                    className="relative rounded-3xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-6 lg:min-h-[220px] lg:p-8"
                    style={{
                      transform: "translateZ(0)",
                    }}
                  >
                    {card.videoSrc ? (
                      <video
                        muted
                        playsInline
                        preload="metadata"
                        className="pointer-events-none absolute bottom-3 right-3 top-3 w-[52%] rounded-2xl object-contain object-center sm:bottom-4 sm:right-4 sm:top-4 sm:w-[50%] lg:w-[48%]"
                        src={card.videoSrc}
                        style={{ objectPosition: card.videoPosition }}
                        onLoadedMetadata={(event) =>
                          freezeVideoAtFrame(event, card.frameTime)
                        }
                        onSeeked={(event) => event.currentTarget.pause()}
                      />
                    ) : null}

                    {/* Gradient/veil overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} transition-opacity duration-300 rounded-3xl ${
                        card.videoSrc ? "opacity-35 group-hover:opacity-45" : "opacity-50 group-hover:opacity-70"
                      }`}
                    />
                    {card.videoSrc ? (
                      <div className="absolute inset-0 rounded-3xl bg-white/30 group-hover:bg-white/20 transition-colors duration-300" />
                    ) : null}
                
                    {/* Top shine effect */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                
                    {/* Content */}
                    <div className="relative z-10 max-w-full sm:max-w-[56%]">
                      <h3 className="mb-2 text-2xl text-gray-900 transition-colors group-hover:text-gray-800 sm:text-[2rem]">
                        {card.title}
                      </h3>
                      <p className="mb-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                        {card.description}
                      </p>
                      
                      {/* Arrow button */}
                      <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
                        <span className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                          Get Started
                        </span>
                        <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform`} style={{
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }} />
                      </div>
                    </div>

                    {/* Decorative corner gradient */}
                    <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  </div>

                  {/* 3D card shadow */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-300/50 to-gray-400/50 rounded-3xl -z-10 blur-sm opacity-30"
                    style={{
                      transform: "translateZ(-20px) translateY(8px)",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Footer */}
      <footer className="relative z-10 hidden bg-[#071735] px-6 py-10 text-white md:block md:py-12">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-full border border-white/30">
              <ImageWithFallback
                src={logoImage}
                alt="Nephrogenetics"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="text-3xl md:text-4xl font-medium">Nephrogenetics</span>
          </div>

          <p className="text-base md:text-lg text-white/55 text-center md:text-right">
            © 2026 Nephrogenetics. Empowering kidney care through genetics.
          </p>
        </div>
      </footer>
    </div>
  );
}
