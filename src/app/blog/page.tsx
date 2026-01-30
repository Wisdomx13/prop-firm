import AppLayout from "@/components/app-layout";
import BlogHero from "@/components/blog/hero/blog-hero";
import React from "react";

import heroBg from "@/../public/blog-hero.jpg";
import BlogCategories from "@/components/blog/blog-categories";

export const metadata = {
  title: "Blog",
};

const Blog = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <BlogHero
            title="Pipzen Blog"
            subTitle="PROP TRADING, AS IT SHOULD BE"
            description="Trading ideas, practical tips and insider info — the Pipzen blog helps you fuel your trading"
            image={heroBg}
          />
          <BlogCategories />
        </main>
      </AppLayout>
    </div>
  );
};

export default Blog;
