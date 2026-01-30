"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const FeatureCards = ({ data }: { data: any }) => {
  return (
    <div className="mt-7 md:mt-10 lg:mt-12  ">
      <Swiper slidesPerView={"auto"} spaceBetween={20}>
        {data.map((feature: any, i: number) => (
          <SwiperSlide
            key={i}
            className="max-w-[80%] md:max-w-[220px] lg:max-w-[350px] mx-auto p-5"
          >
            <FeatureCard Icon={feature.icon} text={feature.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureCards;

interface FeatureCardProps {
  text: string;
  Icon: React.ElementType;
}
const FeatureCard = ({ Icon, text }: FeatureCardProps) => {
  const cardRef = useRef<any>(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e : any) => {
      const wh = window.innerHeight / 2;
      const ww = window.innerWidth / 2;
      card.style.setProperty("--mouseX8", (e.clientX - ww) / 25);
      card.style.setProperty("--mouseY8", (e.clientY - wh) / 25);
    };

    const handleMouseLeave = () => {
      card.style.setProperty("--mouseX8", 0);
      card.style.setProperty("--mouseY8", 0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="feature-card feature-card--8 w-full p-3 md:p-4 lg:p-5 rounded-2xl"
      ref={cardRef}
    >
      <div className="w-12 h-12 bg-[#222]/50 border border-[#222] flex items-center justify-center rounded-sm mx-auto">
        <Icon className="w-8 h-8  " />
      </div>
      <h3 className="text-3xl first-line:bg-gradient-to-r  first-line:from-[#FFD700] first-line:to-[#B8860B] first-line:bg-clip-text first-line:text-transparent lg:text-4xl font-bold text-foreground mt-2">
        {text}
      </h3>
    </div>
  );
};
