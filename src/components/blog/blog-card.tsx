/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface BlogCardProps {
  thum: any;
  title: string;
  readMoreLink: string;
}
const BlogCard = ({ thum, title, readMoreLink }: BlogCardProps) => {
  console.log({ title });

  return (
    <div className="rounded-3xl lg:rounded-4xl overflow-hidden">
      <div className="overflow-hidden">
        <Image
          src={thum}
          className="w-full aspect-video transition-all hover:scale-110"
          alt={title}
        />
      </div>
      <div className="bg-[#121212] p-3 lg:p-4">
        <span className="text-base lg:text-lg font-semibold text-foreground hover:text-[#FFD700]">
          {title}
        </span>
        <Link
          href={readMoreLink}
          className="text-sm font-bold text-black bg-[#FFD700] px-4 py-2 rounded-full mt-2 block w-max"
        >
          ReadMore
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
