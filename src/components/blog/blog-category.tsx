"use client";
import React from "react";
import BlogCard, { BlogCardProps } from "./blog-card";

interface BlogCategoryProps {
  category: string;

  blogs: BlogCardProps[];
}
const BlogCategory = ({ category, blogs }: BlogCategoryProps) => {
  console.log({ blogs });
  return (
    <div>
      <h3 className="text-2xl md:text-3xl py-1 lg:py-1 font-bold text-center text-black bg-[#FFD700] rounded-md">
        {category}
      </h3>
      <div className="border border-[#FFD700] mt-3 lg:mt-5 p-4 lg:p-6 rounded-4xl grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {blogs.map((blog, i) => (
          <BlogCard
            thum={blog.thum}
            readMoreLink={blog.readMoreLink}
            title={blog.title}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCategory;
