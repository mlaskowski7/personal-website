"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { text } from "stream/consumers";

interface Props {
  text: string;
  delay: number;
  duration?: number;
  isLink?: boolean;
}

const AppearingText = ({ text, delay, duration, isLink }: Props) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {});
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: duration ? duration : 0.5, delay: delay }}
      className={`font-bold text-tertiary dark:text-dark-tertiary underline-offset-2 ${
        isLink
          ? "hover:underline hover:text-black hover:dark:text-white ease-in-out duration-300"
          : ""
      }`}
    >
      {text}
    </motion.span>
  );
};

export default AppearingText;
