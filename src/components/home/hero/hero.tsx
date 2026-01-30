"use client";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import EmbeddedVideo from "./embedded-video";
import { useTheme } from "@/context/ThemeContext";

interface HeroProps {
  hero: {
    badge?: string;
    title1: string;
    title2: string;
    description: string;
    buttons: {
      label: string;
      link: string;
      icon?: string;
    }[];
  };
}

// 3D Letter Cube Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LetterCube = ({ letter, delay = 0, isGold = false }: { letter: string; delay?: number; isGold?: boolean }) => {
  const baseColor = isGold ? '#FFD700' : '#FFFFFF';
  const glowColor = isGold ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.5)';

  return (
    <div
      className="letter-cube-wrapper inline-block mx-[2px]"
      style={{
        perspective: '400px',
        animationDelay: `${delay}s`
      }}
    >
      <div
        className="letter-cube relative"
        style={{
          width: '42px',
          height: '50px',
          transformStyle: 'preserve-3d',
          animation: `cubeFloat 3s ease-in-out infinite, cubeRotateSmall 8s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {/* Front Face - Letter */}
        <div
          className="absolute w-full h-full flex items-center justify-center"
          style={{
            transform: 'translateZ(21px)',
            background: `linear-gradient(180deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)`,
            border: `2px solid ${isGold ? 'rgba(255,215,0,1)' : 'rgba(255,255,255,0.6)'}`,
            boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px rgba(255,215,0,0.1)`,
          }}
        >
          <span
            className="text-xl font-black"
            style={{
              color: baseColor,
              textShadow: `0 2px 4px rgba(0,0,0,0.9), 0 0 15px ${glowColor}`,
              fontWeight: 900,
            }}
          >
            {letter}
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: 'translateZ(-21px) rotateY(180deg)',
            background: 'linear-gradient(180deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)',
            border: `2px solid ${isGold ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.2)'}`,
          }}
        />

        {/* Top Face */}
        <div
          className="absolute w-full"
          style={{
            height: '42px',
            transform: 'rotateX(90deg) translateZ(25px)',
            background: `linear-gradient(180deg, ${isGold ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.2)'} 0%, rgba(15,15,20,0.9) 100%)`,
            border: `2px solid ${isGold ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.25)'}`,
          }}
        />

        {/* Bottom Face */}
        <div
          className="absolute w-full"
          style={{
            height: '42px',
            transform: 'rotateX(-90deg) translateZ(25px)',
            background: 'linear-gradient(180deg, rgba(5,5,8,0.98) 0%, rgba(15,15,20,0.9) 100%)',
            border: `2px solid ${isGold ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.15)'}`,
            boxShadow: `0 8px 20px rgba(0,0,0,0.6)`,
          }}
        />

        {/* Left Face */}
        <div
          className="absolute h-full"
          style={{
            width: '42px',
            transform: 'rotateY(-90deg) translateZ(21px)',
            background: 'linear-gradient(90deg, rgba(12,12,16,0.95) 0%, rgba(20,20,25,0.9) 100%)',
            border: `2px solid ${isGold ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.2)'}`,
          }}
        />

        {/* Right Face */}
        <div
          className="absolute h-full"
          style={{
            width: '42px',
            transform: 'rotateY(90deg) translateZ(21px)',
            background: 'linear-gradient(90deg, rgba(20,20,25,0.9) 0%, rgba(12,12,16,0.95) 100%)',
            border: `2px solid ${isGold ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.2)'}`,
          }}
        />
      </div>
    </div>
  );
};

const Hero = ({ hero }: HeroProps) => {
  const { description, buttons } = hero;
  const { isDark } = useTheme();

  return (
    <section className={`relative min-h-screen md:h-screen flex items-center overflow-x-hidden overflow-y-visible md:overflow-hidden pt-28 sm:pt-24 md:pt-20 pb-8 md:pb-0 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes cubeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cubeRotateSmall {
          0%, 100% { transform: rotateX(-5deg) rotateY(-3deg); }
          50% { transform: rotateX(5deg) rotateY(3deg); }
        }
        @keyframes houseRotate {
          0% { transform: rotateX(-20deg) rotateY(-30deg); }
          50% { transform: rotateX(-20deg) rotateY(30deg); }
          100% { transform: rotateX(-20deg) rotateY(-30deg); }
        }
        @keyframes houseFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes candleGlow {
          0%, 100% { filter: drop-shadow(0 0 15px currentColor); }
          50% { filter: drop-shadow(0 0 35px currentColor); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .house-scene {
          perspective: 1500px;
        }
        .house-wrapper {
          animation: houseFloat 6s ease-in-out infinite;
        }
        .house-3d {
          transform-style: preserve-3d;
          animation: houseRotate 15s ease-in-out infinite;
        }
        .candle-glow-green {
          animation: candleGlow 2s ease-in-out infinite;
          color: #00E676;
        }
        .candle-glow-red {
          animation: candleGlow 2s ease-in-out infinite;
          color: #FF5252;
        }
        .candle-glow-gold {
          animation: candleGlow 2s ease-in-out infinite;
          color: #FFD700;
        }
        .pulse-ring {
          animation: pulseRing 2.5s ease-out infinite;
        }
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .letter-cube {
          transform-style: preserve-3d;
        }
        @keyframes shipFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-8px) translateX(3px); }
          50% { transform: translateY(-5px) translateX(6px); }
          75% { transform: translateY(-10px) translateX(2px); }
        }
        @keyframes enginePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes blinkLight {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .spaceship-float {
          animation: shipFloat 8s ease-in-out infinite;
        }
        .engine-pulse {
          animation: enginePulse 1s ease-in-out infinite;
        }
        .blink-light {
          animation: blinkLight 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background - Conditional on theme - seamless with header */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
          {/* Sparse Stars - Very subtle */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 1.5 + 0.5}px`,
                  height: `${Math.random() * 1.5 + 0.5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.4 + 0.1,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Clean light background with subtle warm gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/20 to-white" />

          {/* Subtle golden accent circles */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large soft glow - top left */}
            <div
              className="absolute -left-[10%] -top-[20%] w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
              }}
            />
            {/* Medium glow - right side */}
            <div
              className="absolute right-[10%] top-[20%] w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,193,7,0.06) 0%, transparent 60%)',
              }}
            />
            {/* Small accent - bottom */}
            <div
              className="absolute left-[30%] bottom-[10%] w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Subtle grid pattern for depth */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Light mode decorative trading chart - top right */}
          <div className="absolute top-[2%] right-[2%] w-[450px] h-[350px] md:w-[550px] md:h-[400px] lg:w-[650px] lg:h-[450px] opacity-[0.25]">
            <svg viewBox="0 0 600 400" className="w-full h-full">
              {/* Rising trend line */}
              <path
                d="M30 320 Q100 290 150 260 T250 200 T350 150 T450 100 T550 50"
                stroke="url(#lightGradient1)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Secondary trend line */}
              <path
                d="M30 340 Q100 320 150 300 T250 250 T350 200 T450 150 T550 100"
                stroke="url(#lightGradient2)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Candlesticks - more of them */}
              <g>
                {/* Green candles (bullish) */}
                <rect x="50" y="270" width="14" height="45" fill="#16a34a" rx="2" />
                <line x1="57" y1="258" x2="57" y2="325" stroke="#16a34a" strokeWidth="2" />

                <rect x="100" y="240" width="14" height="55" fill="#16a34a" rx="2" />
                <line x1="107" y1="225" x2="107" y2="305" stroke="#16a34a" strokeWidth="2" />

                <rect x="200" y="190" width="14" height="50" fill="#16a34a" rx="2" />
                <line x1="207" y1="175" x2="207" y2="250" stroke="#16a34a" strokeWidth="2" />

                <rect x="300" y="140" width="14" height="55" fill="#16a34a" rx="2" />
                <line x1="307" y1="125" x2="307" y2="205" stroke="#16a34a" strokeWidth="2" />

                <rect x="400" y="95" width="14" height="50" fill="#16a34a" rx="2" />
                <line x1="407" y1="80" x2="407" y2="155" stroke="#16a34a" strokeWidth="2" />

                <rect x="500" y="50" width="14" height="55" fill="#16a34a" rx="2" />
                <line x1="507" y1="35" x2="507" y2="115" stroke="#16a34a" strokeWidth="2" />

                <rect x="550" y="40" width="14" height="45" fill="#16a34a" rx="2" />
                <line x1="557" y1="28" x2="557" y2="95" stroke="#16a34a" strokeWidth="2" />

                {/* Red candles (bearish) */}
                <rect x="150" y="225" width="14" height="35" fill="#dc2626" rx="2" />
                <line x1="157" y1="215" x2="157" y2="270" stroke="#dc2626" strokeWidth="2" />

                <rect x="250" y="175" width="14" height="30" fill="#dc2626" rx="2" />
                <line x1="257" y1="165" x2="257" y2="215" stroke="#dc2626" strokeWidth="2" />

                <rect x="350" y="130" width="14" height="28" fill="#dc2626" rx="2" />
                <line x1="357" y1="120" x2="357" y2="168" stroke="#dc2626" strokeWidth="2" />

                <rect x="450" y="85" width="14" height="32" fill="#dc2626" rx="2" />
                <line x1="457" y1="75" x2="457" y2="127" stroke="#dc2626" strokeWidth="2" />
              </g>
              <defs>
                <linearGradient id="lightGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
                <linearGradient id="lightGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Light mode golden sun/circle - top left accent */}
          <div className="absolute -left-[5%] top-[10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle at 70% 30%, rgba(255,215,0,0.15) 0%, rgba(255,193,7,0.05) 50%, transparent 70%)',
              }}
            />
          </div>
        </>
      )}

      {/* Very Dark 3D Moon - Large, ominous (dark mode only) */}
      {isDark && (
      <div className="absolute -left-[15%] md:-left-[5%] top-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px]">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(circle at 75% 25%,
                rgba(40,40,50,0.6) 0%,
                rgba(25,25,32,0.7) 20%,
                rgba(15,15,20,0.85) 40%,
                rgba(8,8,12,0.95) 60%,
                rgba(3,3,5,1) 80%,
                rgba(0,0,0,1) 100%
              )
            `,
            boxShadow: 'inset -80px -40px 120px rgba(0,0,0,0.95), 0 0 100px rgba(20,20,30,0.3)',
          }}
        >
          {/* Dark crater details */}
          <div className="absolute top-[20%] left-[50%] w-[25%] h-[18%] rounded-full bg-gradient-to-br from-[#1a1a22]/40 to-transparent blur-sm" />
          <div className="absolute top-[45%] left-[60%] w-[20%] h-[12%] rounded-full bg-gradient-to-br from-[#15151a]/30 to-transparent blur-sm" />
          <div className="absolute top-[60%] left-[45%] w-[30%] h-[15%] rounded-full bg-gradient-to-br from-[#12121a]/25 to-transparent blur-md" />
        </div>
        {/* Subtle rim light */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(60,60,80,0.1) 0%, transparent 30%)',
        }} />
      </div>
      )}

      {/* B-2 Stealth Style Spaceship - Dark mode only */}
      {isDark && (
      <div className="absolute top-[8%] md:top-[5%] right-[-15%] md:right-[-5%] lg:right-[0%] spaceship-float z-[5]">
        <svg width="550" height="220" viewBox="0 0 550 220" className="md:w-[650px] md:h-[260px] lg:w-[800px] lg:h-[320px]">

          {/* B-2 Flying Wing Shape - Main Body */}
          <path
            d="M275 30
               L320 50 L400 70 L480 110 L530 130 L530 135 L480 145
               L400 155 L320 170 L275 190
               L230 170 L150 155 L70 145 L20 135 L20 130 L70 110
               L150 70 L230 50 Z"
            fill="url(#b2HullGrad)"
            stroke="rgba(50,55,65,0.6)"
            strokeWidth="1"
          />

          {/* Left Wing Surface */}
          <path
            d="M230 50 L150 70 L70 110 L20 130 L70 125 L150 95 L230 70 L260 55 Z"
            fill="url(#b2WingTopGrad)"
          />

          {/* Right Wing Surface */}
          <path
            d="M320 50 L400 70 L480 110 L530 130 L480 125 L400 95 L320 70 L290 55 Z"
            fill="url(#b2WingTopGrad)"
          />

          {/* Center Body Ridge */}
          <path
            d="M275 35 L295 55 L295 165 L275 185 L255 165 L255 55 Z"
            fill="url(#b2CenterGrad)"
            stroke="rgba(40,45,55,0.5)"
            strokeWidth="0.5"
          />

          {/* Cockpit Area */}
          <path
            d="M275 40 L290 55 L290 85 L275 95 L260 85 L260 55 Z"
            fill="#0a0c10"
            stroke="rgba(60,65,75,0.4)"
            strokeWidth="0.5"
          />
          <path
            d="M275 48 L285 58 L285 78 L275 85 L265 78 L265 58 Z"
            fill="#0f1218"
          />

          {/* Wing Panel Lines - Left */}
          <line x1="200" y1="65" x2="80" y2="115" stroke="rgba(35,40,50,0.7)" strokeWidth="0.5" />
          <line x1="180" y1="80" x2="60" y2="125" stroke="rgba(35,40,50,0.5)" strokeWidth="0.5" />
          <line x1="220" y1="100" x2="100" y2="135" stroke="rgba(35,40,50,0.5)" strokeWidth="0.5" />

          {/* Wing Panel Lines - Right */}
          <line x1="350" y1="65" x2="470" y2="115" stroke="rgba(35,40,50,0.7)" strokeWidth="0.5" />
          <line x1="370" y1="80" x2="490" y2="125" stroke="rgba(35,40,50,0.5)" strokeWidth="0.5" />
          <line x1="330" y1="100" x2="450" y2="135" stroke="rgba(35,40,50,0.5)" strokeWidth="0.5" />

          {/* Engine Exhausts - Subtle dark slots */}
          <ellipse cx="240" cy="175" rx="12" ry="5" fill="#08090c" />
          <ellipse cx="275" cy="180" rx="14" ry="6" fill="#08090c" />
          <ellipse cx="310" cy="175" rx="12" ry="5" fill="#08090c" />


          {/* Surface Details - Intake Vents */}
          <path d="M245 95 L250 100 L250 115 L245 120 L240 115 L240 100 Z" fill="#0a0c10" />
          <path d="M305 95 L310 100 L310 115 L305 120 L300 115 L300 100 Z" fill="#0a0c10" />

          {/* Wing Edge Highlights */}
          <line x1="20" y1="130" x2="150" y2="95" stroke="rgba(70,75,85,0.3)" strokeWidth="1" />
          <line x1="530" y1="130" x2="400" y2="95" stroke="rgba(70,75,85,0.3)" strokeWidth="1" />

          {/* Subtle Panel Details */}
          <rect x="180" y="85" width="20" height="10" rx="1" fill="#0d0f14" />
          <rect x="350" y="85" width="20" height="10" rx="1" fill="#0d0f14" />
          <rect x="140" y="100" width="15" height="8" rx="1" fill="#0d0f14" />
          <rect x="395" y="100" width="15" height="8" rx="1" fill="#0d0f14" />

          <defs>
            <linearGradient id="b2HullGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#1e2128" />
              <stop offset="40%" stopColor="#15181d" />
              <stop offset="70%" stopColor="#0f1115" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="b2WingTopGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#12151a" />
              <stop offset="100%" stopColor="#1a1e24" />
            </linearGradient>
            <linearGradient id="b2CenterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#15181d" />
              <stop offset="50%" stopColor="#1a1e24" />
              <stop offset="100%" stopColor="#15181d" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      )}

      {/* Subtle fog at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t ${isDark ? 'from-[#000000]/80 via-[#020204]/40' : 'from-white/60 via-white/30'} to-transparent`} />

      {/* 3D Prop Firm Money House - Background Effect (Dark mode only) */}
      {isDark && (
      <div className="absolute right-[18%] md:right-[22%] lg:right-[25%] top-[50%] -translate-y-1/2 z-[1] hidden md:block opacity-60" style={{ filter: 'blur(0.5px) brightness(0.7)' }}>
        <div className="house-scene">
          <div className="house-wrapper relative" style={{ width: '480px', height: '530px' }}>

            {/* Main 3D House Structure */}
            <div className="house-3d relative w-full h-full flex items-center justify-center">

              {/* Base Platform - Dark with subtle gold edge */}
              <div
                className="absolute"
                style={{
                  width: '250px',
                  height: '250px',
                  transform: 'rotateX(90deg) translateZ(-145px)',
                  background: 'linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(8,8,12,0.98) 100%)',
                  border: '2px solid rgba(255,215,0,0.25)',
                }}
              />

              {/* Front Wall - Dark Glass with Chart Pattern */}
              <div
                className="absolute"
                style={{
                  width: '250px',
                  height: '200px',
                  transform: 'translateZ(125px)',
                  background: 'linear-gradient(180deg, rgba(20,20,28,0.9) 0%, rgba(8,8,12,0.97) 100%)',
                  border: '2px solid rgba(255,215,0,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Mini chart inside wall */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 100 80">
                  <path d="M10 60 L25 45 L40 55 L55 30 L70 40 L85 20" stroke="#00E676" strokeWidth="2.5" fill="none" opacity="0.8" />
                  <path d="M10 65 L25 55 L40 60 L55 45 L70 50 L85 35" stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.5" />
                </svg>
              </div>

              {/* Back Wall */}
              <div
                className="absolute"
                style={{
                  width: '250px',
                  height: '200px',
                  transform: 'translateZ(-125px) rotateY(180deg)',
                  background: 'linear-gradient(180deg, rgba(18,18,24,0.92) 0%, rgba(5,5,8,0.98) 100%)',
                  border: '2px solid rgba(255,215,0,0.12)',
                }}
              />

              {/* Left Wall */}
              <div
                className="absolute"
                style={{
                  width: '250px',
                  height: '200px',
                  transform: 'rotateY(-90deg) translateZ(125px)',
                  background: 'linear-gradient(180deg, rgba(20,20,26,0.9) 0%, rgba(6,6,10,0.97) 100%)',
                  border: '2px solid rgba(255,215,0,0.15)',
                }}
              />

              {/* Right Wall */}
              <div
                className="absolute"
                style={{
                  width: '250px',
                  height: '200px',
                  transform: 'rotateY(90deg) translateZ(125px)',
                  background: 'linear-gradient(180deg, rgba(20,20,26,0.9) 0%, rgba(6,6,10,0.97) 100%)',
                  border: '2px solid rgba(255,215,0,0.15)',
                }}
              />

              {/* Roof - Pyramid Style - Dark with subtle highlight */}
              <div
                className="absolute"
                style={{
                  width: '290px',
                  height: '290px',
                  transform: 'rotateX(90deg) translateZ(100px)',
                  background: 'linear-gradient(135deg, rgba(25,25,32,0.92) 0%, rgba(12,12,18,0.97) 100%)',
                  border: '2px solid rgba(255,215,0,0.25)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
              />

              {/* 4 Corner Candlestick Pillars - Muted for background effect */}
              {/* Front Left - Bullish Green */}
              <div className="absolute" style={{ transform: 'translate3d(-100px, 0, 100px)' }}>
                <div className="w-1.5 h-[250px] bg-gradient-to-b from-[#00E676]/70 to-[#00E676]/10 mx-auto" />
                <div className="w-9 h-[180px] rounded-sm -mt-[215px] mx-auto" style={{
                  background: 'linear-gradient(180deg, #00E676 0%, #00C853 50%, #00E676 100%)',
                  opacity: 0.75
                }} />
              </div>

              {/* Front Right - Bearish Red */}
              <div className="absolute" style={{ transform: 'translate3d(100px, 25px, 100px)' }}>
                <div className="w-1.5 h-[200px] bg-gradient-to-b from-[#FF5252]/70 to-[#FF5252]/10 mx-auto" />
                <div className="w-9 h-[130px] rounded-sm -mt-[165px] mx-auto" style={{
                  background: 'linear-gradient(180deg, #FF5252 0%, #D32F2F 50%, #FF5252 100%)',
                  opacity: 0.75
                }} />
              </div>

              {/* Back Left - Bearish Red */}
              <div className="absolute" style={{ transform: 'translate3d(-100px, 35px, -100px)' }}>
                <div className="w-1.5 h-[180px] bg-gradient-to-b from-[#FF5252]/70 to-[#FF5252]/10 mx-auto" />
                <div className="w-9 h-[110px] rounded-sm -mt-[145px] mx-auto" style={{
                  background: 'linear-gradient(180deg, #FF5252 0%, #D32F2F 50%, #FF5252 100%)',
                  opacity: 0.75
                }} />
              </div>

              {/* Back Right - Bullish Green */}
              <div className="absolute" style={{ transform: 'translate3d(100px, -10px, -100px)' }}>
                <div className="w-1.5 h-[270px] bg-gradient-to-b from-[#00E676]/70 to-[#00E676]/10 mx-auto" />
                <div className="w-9 h-[200px] rounded-sm -mt-[235px] mx-auto" style={{
                  background: 'linear-gradient(180deg, #00E676 0%, #00C853 50%, #00E676 100%)',
                  opacity: 0.75
                }} />
              </div>

              {/* Center Golden Candle - Main Feature */}
              <div className="absolute" style={{ transform: 'translate3d(0, -25px, 0)' }}>
                <div className="w-2.5 h-[300px] bg-gradient-to-b from-[#FFD700]/70 to-[#FFD700]/10 mx-auto" />
                <div className="w-12 h-[220px] rounded -mt-[265px] mx-auto" style={{
                  background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 30%, #FF8C00 70%, #FFD700 100%)',
                  opacity: 0.8
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-2xl">
          <p className="text-[#FFD700]/80 text-xs md:text-sm font-medium tracking-widest uppercase mb-4">
            Trading Platform
          </p>

          {/* GET FUNDED TODAY - Big Bold Text */}
          <div className="mb-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
              <span className={`block ${isDark ? 'text-white' : 'text-black'}`}>GET</span>
              <span className="block text-[#FFD700]">FUNDED</span>
              <span className={`block ${isDark ? 'text-white' : 'text-black'}`}>TODAY</span>
            </h1>
          </div>

          <p className={`text-sm md:text-base max-w-md leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-black/90'}`}>
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {buttons[0] && (
              <a
                href={buttons[0].link}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.5)]"
              >
                {buttons[0].label}
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            {buttons[1] && (
              <a
                href={buttons[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 border border-[#FFD700]/30 font-semibold rounded-lg hover:bg-[#FFD700]/10 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`}
              >
                {buttons[1].icon === "discord" && <FaDiscord className="w-4 h-4 text-[#5865F2]" />}
                {buttons[1].label}
              </a>
            )}
          </div>

          <div className="flex gap-6 md:gap-8">
            {[
              { value: "$50M+", label: "Payouts" },
              { value: "15K+", label: "Traders" },
              { value: "90%", label: "Profit" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-lg md:text-xl font-bold ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>{stat.value}</div>
                <div className={`text-[9px] md:text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-black/60'}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile Video - Inside content flow, below stats */}
          <div className="md:hidden mt-4 w-full max-w-[420px] mx-auto">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#FFD700]/10 blur-xl rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border-2 border-[#FFD700]/25 shadow-2xl shadow-[#FFD700]/15">
                <EmbeddedVideo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Video - Bottom Right */}
      <div
        className="absolute right-6 lg:right-12 bottom-16 md:bottom-10 w-[380px] lg:w-[480px] xl:w-[520px] z-50"
        style={{ display: 'none' }}
        id="desktop-video"
      >
        <div className="relative w-full">
          <div className="absolute -inset-2 bg-[#FFD700]/10 blur-xl rounded-2xl" />
          <div className="relative rounded-xl overflow-hidden border-2 border-[#FFD700]/25 shadow-2xl shadow-[#FFD700]/15">
            <EmbeddedVideo />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (min-width: 768px) {
          #desktop-video {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          #desktop-video {
            display: none !important;
          }
        }
      `}</style>

      {/* Bottom gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t pointer-events-none z-10 ${isDark ? 'from-black' : 'from-gray-100'} to-transparent`} />
    </section>
  );
};

export default Hero;
