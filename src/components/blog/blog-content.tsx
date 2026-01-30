import React from "react";
import ReactMarkdown from "react-markdown";
interface BlogContentProps {
  content: string;
}
const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="blog py-5 lg:py-10">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogContent;
