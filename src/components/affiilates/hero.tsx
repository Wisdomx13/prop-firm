import React from "react";
import PrimaryButton from "../buttons/primary-button";

interface HeroProps {
  titleHighlighted: string;
  title: string;
  button: {
    label: string;
    link: string;
  };
}
const Hero = ({ titleHighlighted, title, button }: HeroProps) => {
  return (
    <section className="py-32 section-bg text-center">
      <div className="px-5 py-0 mx-auto my-0 max-w-[1200px]">
        <h1 className="mb-5 text-5xl lg:text-7xl font-bold leading-none text-[#FFD700]">
          {titleHighlighted}
        </h1>
        <h2 className="mb-10 text-5xl lg:text-7xl font-medium leading-none">
          {title}
        </h2>
        <a href={button.link}>
          <PrimaryButton>{button.label}</PrimaryButton>
        </a>
      </div>
    </section>
  );
};

export default Hero;
