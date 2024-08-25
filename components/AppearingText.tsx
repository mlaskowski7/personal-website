import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { text } from "stream/consumers";

interface Props {
  text: string;
  delay: number;
  duration?: number;
}

const AppearingText = ({ text, delay, duration }: Props) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {});
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: duration ? duration : 0.5, delay: delay }}
      className="font-bold text-tertiary dark:text-dark-tertiary"
    >
      {text}
    </motion.span>
  );
};

export default AppearingText;
