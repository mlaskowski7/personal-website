"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="w-full fixed bottom-0 left-0 right-0 h-[10px] bg-tertiary dark:bg-dark-tertiary origin-0 max-sm:w-[100vw]"
      style={{ scaleX }}
    ></motion.div>
  );
};

export default ProgressBar;
