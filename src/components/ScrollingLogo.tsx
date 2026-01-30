"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";

type ScrollingLogoProps = {
  children: React.ReactNode;
};

export default function ScrollingLogo({ children }: ScrollingLogoProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 1, 0.3]);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <>
      <motion.div
        style={{ scale, opacity }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
      >
        <Logo />
      </motion.div>

      <div ref={targetRef}>{children}</div>
    </>
  );
}
