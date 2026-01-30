/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

interface BlogHeroProps {
  title: string;
  subTitle?: string;
  description: string;
  image: any;
}
const BlogHero = ({ title, subTitle, description, image }: BlogHeroProps) => {
  return (
    <section className="h-[75vh] lg:h-[85vh] flex items-center container">
      <div className="flex flex-col gap-5 lg:justify-between lg:items-center lg:flex-row">
        <div className="flex-1">
          {subTitle && (
            <h4 className="text-lg lg:text-xl text-[#FFD700] font-semibold">
              {subTitle}
            </h4>
          )}
          <h2 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent text-4xl md:text-5xl lg:text-[60px] font-extrabold">
            {title}
          </h2>
          <p className="text-base max-w-[90%] lg:max-w-[75%] lg:text-lg text-foreground font-normal my-3 lg:my-4">
            {description}
          </p>
        </div>

        <div className="flex-1">
          <Image src={image} alt="Blog" className="w-[90%] mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
