import Link from "next/link";
import React from "react";
import PrimaryButton from "../buttons/primary-button";
import { FaCircleArrowRight } from "react-icons/fa6";

interface HeroProps {
  hero: {
    title: string;
    titleHighited: string;
    description: string;
    button: { label: string; link: string };
  };
}
const Hero = ({ hero }: HeroProps) => {
  const { title, titleHighited, description, button } = hero;
  return (
    <section className="h-[60vh] md:h-[70vh] hero-bg flex items-center">
      <div className="container flex flex-col justify-center ">
        <h1 className="text-center md:text-start max-w-[98%] md:max-w-[65%] lg:max-w-[70%] text-2xl font-bold md:text-3xl lg:text-4xl text-white">
          <span className="text-[#FFD700] text-3xl md:text-5xl lg:text-[55px] block font-extrabold">
            {titleHighited}
          </span>
          {title}
        </h1>
        <p className="text-sm lg:text-base font-normal text-white mt-3 text-center md:text-start max-w-[95%] md:max-w-[70%] lg:max-w-[75%]">
          {description}
        </p>

        <Link
          href={button.link}
          className="mt-8 w-full flex justify-center md:justify-start"
        >
          <PrimaryButton className="flex items-center  gap-2 ">
            <FaCircleArrowRight className="w-5 h-5 lg:w-7 lg:h-7" />
            {button.label}
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
