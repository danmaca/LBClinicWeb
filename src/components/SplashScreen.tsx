import React, { useState, useEffect } from "react";
import { MainLogoImage } from "./MainLogoImage";

interface SplashScreenProps {
  onFinished: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [phase, setPhase] = useState<"hold" | "transition" | "done">("hold");

  useEffect(() => {
    // After 1 second, start the transition
    const holdTimer = setTimeout(() => {
      setPhase("transition");
    }, 1000);

    // After 1s hold + 3s transition = 4s total, mark as done
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onFinished();
    }, 5000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinished]);

  if (phase === "done") return null;

  const isTransitioning = phase === "transition";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {/* Dark overlay that fades out */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: isTransitioning ? 0 : 0.9,
          transition: isTransitioning ? "opacity 5s ease-in-out" : "none",
        }}
      />

      {/* Centered logo that fades out */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: isTransitioning ? "opacity 5s ease-in-out" : "none",
        }}
      >
        <div className="text-white" style={{ transform: "scale(2.5)" }}>
          <MainLogoImage className="h-[4.5rem] w-auto max-w-[510px]" />
        </div>
      </div>
    </div>
  );
};
