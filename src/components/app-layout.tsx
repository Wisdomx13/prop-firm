import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import ContactUs from "@/components/contact-us/contact-us";
import { FadeIn } from "./fade-in";
import { MotionProvider } from "./framer-provider";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionProvider>
      <Header />
      {children}
      <FadeIn>
        <ContactUs />
      </FadeIn>
      <FadeIn>
        <Footer />
      </FadeIn>
    </MotionProvider>
  );
};

export default AppLayout;
