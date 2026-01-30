"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "../lib/hooks/useWindowSize";

export const WelcomeAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <ReactConfetti
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={200}
        gravity={0.3}
      />
      <div className="text-6xl font-bold text-white animate-fade-in">
        Welcome to PIPZEN
      </div>
    </div>
  );
};
