"use client";
import React from "react";
import { RiDiscordFill, RiTelegramFill } from "react-icons/ri";
import { Contact } from "../../../data/page/contact";
import { MessageCircle, Headphones, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ContactUs = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-12 md:py-16 ${isDark ? '' : 'bg-gray-50'}`}>
      <div className="container max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="relative">
          {/* Glow effect */}
          <div className={`absolute -inset-2 rounded-3xl blur-2xl ${
            isDark
              ? 'bg-gradient-to-r from-[#FFD700]/20 via-[#5865F2]/20 to-[#FFD700]/20'
              : 'bg-gradient-to-r from-[#FFD700]/30 via-[#5865F2]/30 to-[#FFD700]/30'
          }`} />

          {/* Card */}
          <div
            className={`relative rounded-2xl overflow-hidden border ${
              isDark
                ? 'border-[#FFD700]/30'
                : 'border-amber-200 shadow-xl'
            }`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(88,101,242,0.1) 0%, rgba(0,0,0,0.8) 50%, rgba(255,215,0,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(88,101,242,0.05) 0%, rgba(255,255,255,0.95) 50%, rgba(255,215,0,0.1) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#FFD700] via-[#5865F2] to-[#FFD700]" />

            <div className="p-6 md:p-8">
              {/* Header with icons */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark
                    ? 'bg-[#FFD700]/10 border border-[#FFD700]/30'
                    : 'bg-amber-100 border border-amber-200'
                }`}>
                  <Headphones className={`w-5 h-5 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark
                    ? 'bg-[#5865F2]/10 border border-[#5865F2]/30'
                    : 'bg-indigo-100 border border-indigo-200'
                }`}>
                  <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark
                    ? 'bg-[#FFD700]/10 border border-[#FFD700]/30'
                    : 'bg-amber-100 border border-amber-200'
                }`}>
                  <Clock className={`w-5 h-5 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
                </div>
              </div>

              {/* Text */}
              <div className="text-center mb-6">
                <p className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Need Help? We&apos;re Available</p>
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>Join Our </span>
                  <span className="bg-gradient-to-r from-[#5865F2] to-[#7289DA] bg-clip-text text-transparent">Community</span>
                </h3>
                <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>24/5 Support • Instant Response • Global Traders</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={Contact.discord}
                  className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 hover:scale-105"
                >
                  <RiDiscordFill className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Join Discord</span>
                </a>

                <a
                  href={Contact.discord}
                  className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0088cc] to-[#00a2e8] hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                  <RiTelegramFill className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Join Telegram</span>
                </a>
              </div>

              {/* Stats */}
              <div className={`flex items-center justify-center gap-6 mt-6 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}>
                {[
                  { value: "15K+", label: "Members" },
                  { value: "24/5", label: "Support" },
                  { value: "< 1hr", label: "Response" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-lg font-bold ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>{stat.value}</div>
                    <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer - Compact */}
        <div className={`mt-8 p-4 rounded-xl ${
          isDark
            ? 'bg-white/[0.02] border border-white/5'
            : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <p className={`text-[10px] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            <span className={`font-semibold ${isDark ? 'text-white/60' : 'text-gray-700'}`}>DISCLAIMER:</span> PIPZEN is an affiliate of Forest Park FX LTD.
            Forest Park FX LTD offers fee-based simulated trading assessments for Potential Traders. All funding assessments
            are provided by Forest Park FX LTD and all assessment fees are paid to Forest Park FX LTD. If you qualify for a
            Funded Account, you will be required to enter into a Trader Agreement with Forest Park FX LTD. Forest Park FX LTD
            does not provide any trading education or other services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
