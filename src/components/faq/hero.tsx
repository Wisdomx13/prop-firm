import React from "react";
import PrimaryButton from "../buttons/primary-button";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import SecondaryButton from "../buttons/secondary-button";
import { RiDiscordFill } from "react-icons/ri";

interface HeroProps {
  title1: string;
  title2: string;
  subtitle: string;
  buttonPrimary: {
    label: string;
    link: string;
  };
  buttonScondary: {
    label: string;
    link: string;
  };
}

const Hero = ({
  title1,
  title2,
  subtitle,
  buttonPrimary,
  buttonScondary,
}: HeroProps) => {
  return (
    <section className="h-[50vh] lg:h-[90vh] flex items-center mt-[40px] lg:mt-[80px] section-bg">
      <div className="flex-1 container px-2 lg:px-0">
        <h3 className="text-base lg:text-lg font-semibold text-[#FFD700] ">
          {subtitle}
        </h3>
        <div className="flex items-center justify-between max-w-full md:max-w-[65%] ">
          <h3 className="max-w-[280px] mx-auto md:mx-0 text-4xl md:text-5xl lg:text-[60px] text-[#FFD700] font-extrabold">
            {title1}
          </h3>
          <h3 className="max-w-[260px] mx-auto md:mx-0 text-4xl md:text-5xl lg:text-[60px] text-[#FFD700] font-extrabold">
            {title2}
          </h3>
        </div>

        <div className="flex items-center gap-5 lg:gap-12 mt-4 lg:mt-8">
          <Link href={buttonPrimary.link}>
            <PrimaryButton>
              <FaArrowCircleRight className="w-5 h-5" />
              {buttonPrimary.label}
            </PrimaryButton>
          </Link>
          <a href={buttonScondary.link}>
            <SecondaryButton>
              <RiDiscordFill className="text-foreground w-5 h-5 lg:w-6 lg:h-6" />
              {buttonScondary.label}
            </SecondaryButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
