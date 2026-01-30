/* eslint-disable @next/next/no-img-element */
import React from "react";

const AboutUsHero = () => {
  return (
    <section className="flex gap-16  items-center pt-26 lg:pt-32 mx-auto container ">
      <HeroContent />
      <HeroImage />
    </section>
  );
};

export default AboutUsHero;

const HeroContent: React.FC = () => {
  return (
    <article className="flex-1">
      <img
        alt="Company Logo"
        src="https://images.pexels.com/photos/7089760/pexels-photo-7089760.jpeg"
        className="object-cover overflow-hidden mb-8 w-full aspect-square"
      />
      <h1 className="mb-8 text-3xl lg:text-5xl bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent font-bold">
        Leading the Future of Prop Trading
      </h1>
      <p className="mb-10 text-lg lg:text-xl font-light leading-relaxed text-white">
        We are dedicated to empowering traders with cutting-edge technology,
        comprehensive support, and the capital they need to succeed in global
        markets.
      </p>
    </article>
  );
};

const HeroImage: React.FC = () => {
  return (
    <figure className="flex-1 hidden md:block">
      <img
        alt="Trading Office"
        src="https://images.pexels.com/photos/8204311/pexels-photo-8204311.jpeg"
        className="object-cover overflow-hidden w-full rounded-3xl aspect-square"
      />
    </figure>
  );
};
