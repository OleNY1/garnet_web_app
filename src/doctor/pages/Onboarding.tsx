import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, UserCheck, BookOpen } from "lucide-react";
import logoImage from "../../assets/26855d41a9beac7f3e8a4cf381d8b18542c83f02.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Heart,
      title: "Understand your genetic health",
      description: "Take a simple assessment to see if genetic testing for kidney disease is right for you",
    },
    {
      icon: UserCheck,
      title: "Get matched with experts",
      description: "Connect with genetic counselors specialized in kidney disease",
    },
    {
      icon: BookOpen,
      title: "Make informed decisions",
      description: "Access educational resources to understand genetic testing and your results",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/doctor/login");
    }
  };

  const handleSkip = () => {
    navigate("/doctor/login");
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo at top */}
      <div className="p-6 flex items-center justify-between">
        <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
          <ImageWithFallback src={logoImage} alt="Nephrogenetics Logo" className="w-full h-full object-cover scale-110" />
        </div>
        <button
          onClick={handleSkip}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-8">
            {CurrentIcon && (
              <CurrentIcon className="w-12 h-12 text-blue-500" />
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl mb-4 text-gray-900">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="p-6">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors"
        >
          {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
}