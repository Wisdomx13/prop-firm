/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

interface BlogHeaderProps {
  title: string;
  thumb: any;
  category: string;
}
const BlogHeader = ({ title, thumb, category }: BlogHeaderProps) => {
  return (
    <div className="">
      <Image src={thumb} alt={title} className="w-full h-auto" />
      <div className="my-3 lg:my-5">
        <h2 className="text-2xl lg:text-3xl font-bold !text-[#FFD700]">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default BlogHeader;
