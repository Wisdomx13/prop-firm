import Link from "next/link";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";

interface IntroProps {
  title: string;
  description: string;
  featuresButtons: {
    label: string;
    redirect: string;
  }[];
}
const Intro = ({ title, description, featuresButtons }: IntroProps) => {
  return (
    <section className="h-[70vh] lg:h-[80vh] flex flex-col justify-center trading-hero-bg">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-[55px] font-extrabold text-[#FFD700] text-center max-w-[85%] md:max-w-[550px] mx-auto">
          {title}
        </h1>
        <p className="my-2 lg:my-3 text-center max-w-[90%] mx-auto text-foreground text-sm lg:text-lg font-normal">
          {description}
        </p>

        <div className="flex justify-center gap-3 lg:gap-5 items-center mt-8 md:mt-12 lg:mt-16 ">
          {featuresButtons.map((feature, i) => (
            <Link
              className="flex items-center gap-2 platform-btn hover:text-[#FFD700] hover:transition-colors font-bold"
              key={i}
              href={feature.redirect}
            >
              <span className="text">{feature.label}</span>
              <IoMdArrowForward className="w-5 h-5 icon" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
