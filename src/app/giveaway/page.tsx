"use client";
/* eslint-disable @next/next/no-img-element */
import ReactConfetti from "react-confetti";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { FaTrophy, FaCrown, FaGift, FaCalendarAlt, FaStar } from "react-icons/fa";
import AppLayout from "@/components/app-layout";

export default function Giveaway() {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black font-serif relative overflow-hidden">
      <AppLayout>
        {/* Confetti Background */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {mounted && width > 0 && height > 0 && (
            <ReactConfetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-24">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <img
            width={"100px"}
            alt="logo"
            src={"/fav/android-chrome-512x512.png"}
            className="mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4 tracking-wide animate-pulse">
            PIPZEN
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGift className="text-yellow-400 text-3xl animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
              MONTHLY GIVEAWAY
            </h2>
            <FaGift className="text-yellow-400 text-3xl animate-bounce" />
          </div>
        </div>

        {/* Monthly Winner Announcement */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-3xl p-8 mb-12 shadow-2xl shadow-yellow-400/20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaCalendarAlt className="text-yellow-400 text-2xl" />
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-300">
              NEW WINNER EVERY MONTH
            </h3>
            <FaCalendarAlt className="text-yellow-400 text-2xl" />
          </div>
          <p className="text-lg md:text-xl text-yellow-200 leading-relaxed max-w-3xl mx-auto">
            Join our exclusive community and get a chance to win amazing prizes every single month! 
            From funded trading accounts to cash prizes, we&apos;re constantly rewarding our dedicated traders.
          </p>
        </div>

        {/* Current Month Winner */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-3xl p-8 shadow-2xl shadow-yellow-400/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaCrown className="text-yellow-400 text-3xl animate-pulse" />
              <h4 className="text-2xl md:text-3xl font-bold text-yellow-300">
                THIS MONTH&apos;S CHAMPION
              </h4>
              <FaCrown className="text-yellow-400 text-3xl animate-pulse" />
            </div>
            
            <div className="bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-2xl p-6 mb-6">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 animate-pulse">
                ZABIULLAH
              </div>
              <div className="text-xl md:text-2xl text-yellow-300 font-semibold">
                $100K FUNDED ACCOUNT
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-yellow-200">
              <FaStar className="text-yellow-400" />
              <span className="text-lg">Congratulations on your incredible trading success!</span>
              <FaStar className="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Previous Winners */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaTrophy className="text-yellow-400 text-2xl" />
            <h5 className="text-2xl md:text-3xl font-bold text-yellow-300">
              RECENT WINNERS
            </h5>
            <FaTrophy className="text-yellow-400 text-2xl" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "LILIAN AGBO", prize: "$10K Account" },
              { name: "SAMUEL EBUBE", prize: "$10K Account" },
              { name: "MAXUEL MAMAH", prize: "$10K Account" },
              { name: "JOSHUA OREOW", prize: "$10K Account" },
              { name: "BENITA IDA", prize: "$10K Account" },
            ].map((winner, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-lg font-bold text-yellow-400 mb-1">
                  {winner.name}
                </div>
                <div className="text-sm text-yellow-300">
                  {winner.prize}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 rounded-3xl p-8">
          <h6 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">
            WANT TO BE NEXT MONTH&apos;S WINNER?
          </h6>
          <p className="text-lg text-yellow-200 mb-6">
            Join our community, participate in our challenges, and you could be the next champion!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/challenges"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-400/30"
            >
              JOIN CHALLENGE
            </a>
            <a
              href="/contact-us"
              className="border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              LEARN MORE
            </a>
          </div>
        </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-32 left-10 text-yellow-400/20 text-6xl animate-bounce">
          <FaGift />
        </div>
        <div className="fixed top-52 right-20 text-yellow-400/20 text-4xl animate-pulse">
          <FaTrophy />
        </div>
        <div className="fixed bottom-20 left-20 text-yellow-400/20 text-5xl animate-bounce">
          <FaCrown />
        </div>
        <div className="fixed bottom-40 right-10 text-yellow-400/20 text-3xl animate-pulse">
          <FaStar />
        </div>
      </AppLayout>
    </div>
  );
}
