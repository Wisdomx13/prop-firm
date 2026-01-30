"use client";
import Link from "next/link";
import React from "react";
import { Youtube, MessageCircle, Mail } from "lucide-react";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "@/context/ThemeContext";

import logo from "@/../public/logo.png";
import Image from "next/image";

import { Contact as ContactData } from "../../../data/page/contact";

const ContactComponent = () => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      {/* Logo */}
      <Link href="/" className="inline-block">
        <Image src={logo} alt="Pipzen" className="w-[130px] md:w-[150px]" />
      </Link>

      {/* Contact section */}
      <div className="space-y-4">
        <h3 className={`text-sm font-bold uppercase tracking-wider ${
          isDark ? 'text-white/50' : 'text-gray-800'
        }`}>
          Get In Touch
        </h3>

        {/* Email with glass styling */}
        <a
          href="mailto:support@pipzen.io"
          className={`group inline-flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
            isDark
              ? 'bg-white/[0.02] border-white/[0.05] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/20'
              : 'bg-white border-gray-200 shadow-sm hover:bg-amber-50 hover:border-amber-200'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-[#FFD700]/10' : 'bg-amber-100'
          }`}>
            <Mail className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
          </div>
          <span className={`text-sm font-semibold transition-colors ${
            isDark
              ? 'text-white/70 group-hover:text-white'
              : 'text-gray-700 group-hover:text-black'
          }`}>
            support@pipzen.io
          </span>
        </a>

        {/* Social links */}
        <div className="flex items-center gap-2 pt-2">
          {ContactData?.youtube && (
            <SocialLink
              label="Youtube"
              link={ContactData.youtube}
              Icon={Youtube}
            />
          )}

          {ContactData?.discord && (
            <SocialLink
              label="Discord"
              link={ContactData.discord}
              Icon={MessageCircle}
            />
          )}

          {ContactData?.x && (
            <SocialLink label="X" link={ContactData.x} Icon={FaXTwitter} />
          )}

          {ContactData?.instagram && (
            <SocialLink
              label="Instagram"
              link={ContactData.instagram}
              Icon={RiInstagramFill}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;

const SocialLink = ({
  Icon,
  label,
  link,
}: {
  Icon: React.ElementType;
  label: string;
  link: string;
}) => {
  const { isDark } = useTheme();

  return (
    <a
      title={label}
      href={link}
      target="_blank"
      className={`group w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'bg-white/[0.03] border-white/[0.08] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/30'
          : 'bg-white border-gray-200 shadow-sm hover:bg-amber-50 hover:border-amber-300'
      }`}
    >
      <Icon className={`w-4 h-4 transition-colors ${
        isDark
          ? 'text-white/60 group-hover:text-[#FFD700]'
          : 'text-gray-600 group-hover:text-amber-600'
      }`} />
    </a>
  );
};
