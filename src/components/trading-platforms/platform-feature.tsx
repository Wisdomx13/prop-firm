/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface PlatformFeatureProps {
  title: string;
  description: string;
  featues: string[];
  buttons: {
    lable: string;
    redirect: string;
  }[];
  sideImage: any;
  contenAlign?: "left" | "right";
  id: string;
}

const PlatformFeature = ({
  title,
  description,
  featues,
  buttons,
  sideImage,
  contenAlign = "left",
  id,
}: PlatformFeatureProps) => {
  return (
    <section id={id} className="container pt-[120px] md:pt-[420px] lg:pt-24 ">
      <div className="flex flex-col gap-5 lg:justify-between lg:items-center lg:flex-row">
        <div className={`flex-1 ${contenAlign == "right" && "order-2"}`}>
          <h3 className="text-3xl md:text-5xl lg:text-[55px] font-bold text-foreground">
            {title}
          </h3>
          <p className="text-xs lg:text-sm text-foreground my-2">
            {description}
          </p>
          <ul className="flex flex-col gap-1 mt-3 lg:mt-4">
            {featues.map((feature, i) => (
              <li key={i} className="flex gap-2 items-center ">
                <FaCheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFD700]" />
                <span className="text-sm lg:text-lg font-semibold lg:font-bold text-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 lg:gap-6 my-7 md:my-8 lg:my-12">
            {buttons.map((btn, i) => (
              <Link
                key={i}
                className="h-[40px] lg:h-[60px] w-max px-8 rounded-full text-sm font-bold text-black bg-foreground hover:transition-all hover:scale-110 flex justify-center items-center"
                href={btn.redirect}
              >
                {btn.lable}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1 ">
          <Image src={sideImage} alt="title" className="w-[90%] mx-auto rounded-4xl" />
        </div>
      </div>
    </section>
  );
};

export default PlatformFeature;
