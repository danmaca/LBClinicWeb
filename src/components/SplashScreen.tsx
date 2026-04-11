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
        className="absolute inset-0 bg-white"
        style={{
          opacity: isTransitioning ? 0 : 0.9,
          transition: isTransitioning ? "opacity 5s ease-in-out" : "none",
        }}
      />

      {/* Logo positioned to match Hero section logo */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center pt-55"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: isTransitioning ? "opacity 5s ease-in-out" : "none",
        }}
      >
        <img src="/images/logo_LbClinicDental_pod.svg" className="h-[11.25rem] w-auto text-black" />
      </div>
    </div>
  );
};
