import { useRef, useEffect, useState } from "react";

interface ScrollVideoProps {
  videoSrc: string;
  children?: React.ReactNode;
}

export default function ScrollVideo({ videoSrc, children }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded successfully!");
      setIsLoaded(true);
      // Auto-play the video
      video.play().catch(err => console.log("Autoplay prevented:", err));
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Video container */}
      <div className="absolute inset-0 h-screen w-full overflow-hidden bg-black">
        {/* Loading spinner with fade out */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-gray-900 transition-opacity duration-500 z-20 ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading experience...</p>
          </div>
        </div>
        
        {/* Video background - auto-playing in loop */}
        <video
          ref={videoRef}
          src={videoSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        />
        
        {/* Overlay content */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}