import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, ChevronDown } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userName = localStorage.getItem("userName") || "Guest";
  const firstName = userName.split(" ")[0] || "Guest";
  const userInitial = firstName.charAt(0).toUpperCase();

  const navItems = [
    { icon: Home, label: "Home", path: "/doctor/dashboard" },
    { icon: User, label: "Profile", path: "/doctor/profile" },
  ];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-6 py-3 shadow-[0_-8px_24px_rgba(2,8,23,0.08)] backdrop-blur md:hidden safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {location.pathname !== "/doctor/dashboard" && (
        <div ref={menuRef} className="fixed right-8 top-7 z-[80] hidden md:block">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/80 px-3 py-2 text-gray-700 shadow-[0_6px_18px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-colors hover:bg-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm text-white shadow-inner">
              {userInitial}
            </span>
            <span className="text-sm font-medium">{firstName}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="mt-2 w-44 rounded-2xl border border-gray-200/80 bg-white/90 p-2 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(item.path);
                    }}
                    className={`mb-1 inline-flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors last:mb-0 ${
                      isActive
                        ? "bg-blue-50/90 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100/80"
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-inherit" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
