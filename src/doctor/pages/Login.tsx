import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import logoImage from "../../assets/26855d41a9beac7f3e8a4cf381d8b18542c83f02.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Ben");
  const [role, setRole] = useState<"patient" | "clinician">("patient");

  const completeLogin = () => {
    localStorage.setItem("userName", name || "Ben");
    localStorage.setItem("userRole", role);
    navigate("/doctor/dashboard");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    completeLogin();
  };

  return (
    <div className="min-h-screen bg-[#e9edf7] px-4 py-4 sm:flex sm:items-center sm:justify-center" style={{ fontFamily: "Georgia, serif" }}>
      <div className="mx-auto w-full max-w-[430px] rounded-[24px] border border-black/5 bg-white/90 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.09)] backdrop-blur-sm sm:p-7">
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border border-gray-100 bg-white">
            <ImageWithFallback src={logoImage} alt="Nephrogenetics Logo" className="h-full w-full object-cover scale-110" />
          </div>
          <h1 className="text-[36px] leading-[1.06] text-gray-900">Welcome back</h1>
          <p className="mt-1.5 text-base text-gray-500">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ben"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <fieldset>
            <legend className="mb-1.5 block text-sm text-gray-700">I am a</legend>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`rounded-xl border px-4 py-2.5 text-base transition-colors ${
                  role === "patient"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={role === "patient"}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole("clinician")}
                className={`rounded-xl border px-4 py-2.5 text-base transition-colors ${
                  role === "clinician"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={role === "clinician"}
              >
                Physician
              </button>
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button type="submit" className="mt-3 w-full rounded-[14px] bg-blue-600 py-3 text-xl text-white transition-colors hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={completeLogin}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-colors hover:bg-gray-50"
            >
              <GoogleIcon />
              <span className="text-base text-gray-700">Google</span>
            </button>
            <button
              type="button"
              onClick={completeLogin}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-colors hover:bg-gray-50"
            >
              <AppleIcon />
              <span className="text-base text-gray-700">Apple</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <button className="text-blue-600 hover:text-blue-700">Sign up</button>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.184L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" />
      <path fill="#FBBC05" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path d="M14.316 11.88c-.152.448-.336.861-.553 1.245-.299.53-.544.896-.733 1.1-.293.316-.607.478-.944.487-.242 0-.533-.069-.874-.208-.34-.139-.653-.208-.94-.208-.302 0-.626.069-.972.208-.347.139-.626.212-.839.22-.322.015-.645-.15-.968-.496-.206-.22-.462-.599-.768-1.137-.328-.574-.597-1.24-.808-2-.226-.82-.339-1.614-.339-2.382 0-.881.19-1.64.571-2.278.298-.498.696-.891 1.193-1.18.497-.289 1.034-.436 1.61-.443.316 0 .731.098 1.246.291.514.193.844.291 .989.291.109 0 .478-.115 1.107-.343.594-.213 1.095-.302 1.504-.267 1.111.09 1.945.528 2.501 1.317-1 .605-1.495 1.452-1.485 2.54.009.847.316 1.552.92 2.113.273.261.579.463.917.606-.074.214-.151.419-.233.616zM11.634 1.57c0 .664-.242 1.284-.726 1.86-.583.684-1.289 1.08-2.054 1.017-.01-.079-.015-.163-.015-.251 0-.637.277-1.32.769-1.877.246-.282.559-.517.94-.704.38-.185.738-.287 1.074-.315.01.09.012.18.012.27z" />
    </svg>
  );
}
