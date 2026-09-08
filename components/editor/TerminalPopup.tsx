"use client";

import React from "react";
import { motion } from "framer-motion";

export const TERMINAL_STEP_MS = 280;

interface Props {
  /** first entry is the command typed at the prompt; the rest is its output */
  lines: string[];
  label?: string;
}

/** A floating terminal window popping up over dimmed content, typing a command. */
const TerminalPopup = ({ lines, label = "zsh" }: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="absolute inset-0 z-20 flex items-center justify-center bg-ed-bg/70 backdrop-blur-[2px]"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-[min(88%,440px)] overflow-hidden rounded-lg border border-black/40 bg-[#0b0b12] shadow-2xl"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-white/50">{label}</span>
      </div>
      <div className="px-4 py-4 font-mono text-[12.5px] leading-relaxed text-white/90">
        {lines.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (i * TERMINAL_STEP_MS) / 1000, duration: 0.2 }}
            className={i === 0 ? "text-[#7ee787] break-all" : "text-white/55"}
          >
            {i === 0 ? "❯ " : ""}
            {c}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (lines.length * TERMINAL_STEP_MS) / 1000 }}
          className="mt-1 inline-block h-3 w-[6px] bg-white/70 animate-blink"
        />
      </div>
    </motion.div>
  </motion.div>
);

export default TerminalPopup;
