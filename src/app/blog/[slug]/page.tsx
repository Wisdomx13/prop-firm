import React from "react";

import { findBlogBySlug } from "../../../../blogs";
import BlogHeader from "@/components/blog/blog-header";
import BlogContent from "@/components/blog/blog-content";

export const metadata = {
  title: "Blog",
};


type Params = Promise<{ slug: string }>;
const Blog = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const blog = findBlogBySlug(slug);

  return (
    <div className="container">
      {blog && (
        <div className="flex justify-between">
          <div className="w-[70%]">
            <BlogHeader
              title={blog.title}
              category={blog.category.name}
              thumb={blog.thumb}
            />
            <BlogContent content={blog.content} />
          </div>

          <div className="w-[30%]"> </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
