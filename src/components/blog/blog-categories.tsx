"use client";
import React from "react";

import blogThum from "@/../public/blog-thum.jpg";
import BlogCategory from "./blog-category";

const blogsData = [
  {
    category: "About Pipzen",
    blogs: [
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
    ],
  },
  {
    category: "About Pipzen",
    blogs: [
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
    ],
  },
  {
    category: "About Pipzen",
    blogs: [
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
      {
        thum: blogThum,
        title: "Funded Trading with Pipzen: Your Path to Success",
        readMoreLink: "#",
      },
    ],
  },
];

const BlogCategories = () => {
  return (
    <section className="container">
      <div className="flex flex-col gap-5 lg:gap-12">
        {blogsData.map((bd, i) => (
          <BlogCategory blogs={bd.blogs} category={bd.category} key={i} />
        ))}
      </div>
    </section>
  );
};

export default BlogCategories;
