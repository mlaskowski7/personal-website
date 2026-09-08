"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

const lines = [
  "$ whoami",
  "mateusz-laskowski",
  "$ cat workspace.json | jq .status",
  "> mounting file explorer",
  "> hydrating README.md",
  "> starting dev server ✓ ready in 412ms",
];

const BootScreen = ({ onDone }: Props) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      onDone();
      return;
    }
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onDone}
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ed-bg px-6"
    >
      <div className="w-full max-w-md font-mono text-[13px] leading-relaxed text-ed-fg">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 * i, duration: 0.25 }}
            className={
              line.startsWith("$")
                ? "text-ed-purple"
                : line.startsWith(">")
                ? "text-ed-muted"
                : "text-ed-green"
            }
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.18 * lines.length, duration: 0.55, ease: "easeOut" }}
          className="mt-4 h-[2px] w-full origin-left bg-ed-blue"
        />
      </div>
    </motion.div>
  );
};

export default BootScreen;
