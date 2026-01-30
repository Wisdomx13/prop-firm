"use client";
import React, { useRef, useState } from "react";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_transparent_70%)]"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#B8860B] bg-clip-text text-transparent">
              See How It Works
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Watch how traders are succeeding with our platform
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glassmorphic border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 via-[#FFA500]/10 to-[#B8860B]/20 rounded-2xl blur-sm"></div>

          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#FFD700]/20 shadow-2xl shadow-[#FFD700]/10">
            {/* Video Element */}
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/cryptomadness-video.mp4"
                playsInline
                onEnded={handleVideoEnd}
                onClick={togglePlay}
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity duration-300 hover:bg-black/30"
                  onClick={togglePlay}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full blur-xl scale-150"></div>
                    <IoPlayCircle className="relative w-20 h-20 md:w-24 md:h-24 text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 text-white/80 hover:text-[#FFD700] transition-colors"
                >
                  {isPlaying ? (
                    <IoPauseCircle className="w-8 h-8" />
                  ) : (
                    <IoPlayCircle className="w-8 h-8" />
                  )}
                  <span className="text-sm font-medium">{isPlaying ? "Pause" : "Play"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
