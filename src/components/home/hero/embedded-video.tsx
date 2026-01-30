"use client";
import React, { useRef, useState, useEffect } from "react";
import { IoPlay, IoPause, IoVolumeHigh, IoVolumeMute, IoExpand } from "react-icons/io5";

const EmbeddedVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full group">
      {/* Video Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-[#FFD700]/30">
        {/* Video Content */}
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/cryptomadness-video.mp4"
            playsInline
            loop
            muted
            autoPlay
            onClick={togglePlay}
          />

          {/* Play overlay when paused */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer transition-all"
              onClick={togglePlay}
            >
              <div className="w-14 h-14 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg shadow-[#FFD700]/30 hover:scale-110 transition-transform">
                <IoPlay className="w-6 h-6 text-black ml-1" />
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/50">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFC107] transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Minimal Control bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1">
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <IoPause className="w-3.5 h-3.5 text-white" />
              ) : (
                <IoPlay className="w-3.5 h-3.5 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              {isMuted ? (
                <IoVolumeMute className="w-3.5 h-3.5 text-white/60" />
              ) : (
                <IoVolumeHigh className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center transition-colors"
          >
            <IoExpand className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedVideo;
