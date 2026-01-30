/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/primary-button";

interface ContentPairProps {
  header?: {
    subtitle?: string;
    title?: string;
  };
  image: any;
  title: string;
  description: string;
  button: {
    label: string;
    link: string;
  };
  contentAlign?: "left" | "right";
  backgroudColor?: boolean;
}
const ContentPair = ({
  image,
  title,
  header,
  description,
  button,
  contentAlign = "right",
  backgroudColor = true,
}: ContentPairProps) => {
  console.log({ backgroudColor });
  return (
    <section
      className={`py-12 lg:py-20 ${
        backgroudColor ? "bg-[#ecd82410]" : "bg-transparent"
      } `}
    >
      <div className="container">
        {header && (
          <div className="pb-5 lg:pb-8">
            {header.subtitle && (
              <h5 className="text-sm lg:text-base uppercase mx-auto text-black font-semibold bg-gradient-to-r from-[#FFD700] to-[#B8860B] w-max px-4 py-2 rounded-full ">
                {header.subtitle}
              </h5>
            )}
            {header.title && (
              <h3 className="mt-2 lg:mt-4 text-foreground text-center text-2xl lg:text-4xl font-bold">
                {header.title}
              </h3>
            )}
          </div>
        )}

        <div className=" flex flex-col md:flex-row items-center">
          <div
            className={`${
              contentAlign == "left" ? "order-2" : "order-1"
            } flex-1`}
          >
            <Image
              src={image}
              className="w-[90%] mx-auto rounded-4xl"
              alt="Best Prop Firm in Asia"
            />
          </div>
          <div
            className={`p-3 lg:p-5 ${
              contentAlign == "left" ? "order-1" : "order-2"
            } flex-1`}
          >
            <h3 className="text-3xl lg:text-5xl font-semibold text-[#FFD700]">
              {title}
            </h3>
            <p className="mt-2 text-sm lg:text-lg text-foreground font-light">
              {description}
            </p>

            <Link href={button.link} className="mt-8 lg:mt-10 block">
              <PrimaryButton>{button.label}</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPair;
