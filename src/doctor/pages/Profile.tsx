import { useNavigate } from "react-router-dom";
import { User, FileText, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { DoctorDecorativeArt, DoctorFooter, DoctorHeader, doctorSerifFont } from "../components/DoctorShell";

const COMPLETED_MODULES_KEY = "educationCompletedModules";
const TOTAL_ASSESSMENTS = 2;
const TOTAL_CLINICIAN_MODULES = 7;
const TOTAL_PATIENT_MODULES = 1;

function readCompletedModuleCount() {
  try {
    const raw = localStorage.getItem(COMPLETED_MODULES_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return 0;
    return new Set(parsed.filter((id): id is string => typeof id === "string")).size;
  } catch {
    return 0;
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";
  const userRole = localStorage.getItem("userRole") || "patient";
  const completedAssessments =
    Number(localStorage.getItem("assessmentAnswers") !== null) +
    Number(localStorage.getItem("literacyScore") !== null);
  const totalModules =
    userRole === "doctor" || userRole === "clinician" ? TOTAL_CLINICIAN_MODULES : TOTAL_PATIENT_MODULES;
  const completedModules = Math.min(readCompletedModuleCount(), totalModules);
  const totalTrackableItems = TOTAL_ASSESSMENTS + totalModules;
  const completedTrackableItems = completedAssessments + completedModules;
  const overallProgress =
    totalTrackableItems > 0
      ? Math.round((completedTrackableItems / totalTrackableItems) * 100)
      : 0;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    {
      icon: User,
      label: "Personal Information",
      description: "Update your profile details",
      action: () => alert("Personal information settings would open here"),
    },
    {
      icon: FileText,
      label: "My Reports",
      description: "Access your assessment reports",
      action: () => alert("Your saved reports would be displayed here"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      action: () => alert("Help center would open here"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6fafa] pb-16 text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DoctorHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-wash" />
        <DoctorDecorativeArt />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => navigate("/doctor/dashboard")}
              className="rounded-full border border-[#c3d6d9] bg-white px-4 py-2 text-sm font-semibold text-[#00687b] transition-colors hover:bg-[#cfe7ea]"
            >
              Back
            </button>
          </div>

          <section className="rounded-3xl border border-[#c3d6d9] bg-white p-6 shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#cfe7ea] text-[#00687b]">
                <span className="text-2xl font-bold">{userName[0]}</span>
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold text-[#16323b]" style={{ fontFamily: doctorSerifFont }}>
                  {userName}
                </h1>
                <p className="capitalize text-[#5b6472]">{userRole}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#f6fafa] p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-[#16323b]">{`${completedAssessments}/${TOTAL_ASSESSMENTS}`}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5b6472]">Assessments</div>
              </div>
              <div className="rounded-2xl bg-[#f6fafa] p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-[#16323b]">{`${completedModules}/${totalModules}`}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5b6472]">Modules</div>
              </div>
              <div className="rounded-2xl bg-[#f6fafa] p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-[#16323b]">{`${overallProgress}%`}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5b6472]">Progress</div>
              </div>
            </div>
          </section>

          <div className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="flex w-full items-center gap-4 rounded-3xl border border-[#c3d6d9] bg-white p-5 text-left shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#9fbfc5]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#f6fafa] text-[#00687b]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-base font-bold text-[#16323b]">{item.label}</h3>
                  <p className="text-sm text-[#5b6472]">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 flex-shrink-0 text-[#5b6472]" />
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-3xl border border-[#f4d8d2] bg-white p-5 text-[#9f4035] transition-colors hover:bg-[#fff5f3]"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-semibold">Log Out</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#5b6472]">Version 1.0.0</p>
            <p className="mt-2 text-xs text-[#5b6472]">
              © 2026 GARNET. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      <DoctorFooter />
    </div>
  );
}
