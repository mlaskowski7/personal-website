"use client";

import React from "react";
import { motion } from "framer-motion";

const isImagePath = (url: string) => /\.(jpe?g|png|gif|webp)$/i.test(url);

/** macOS-chrome "browser window" used to preview a URL — a local image/PDF,
 * an embeddable iframe (e.g. a YouTube /embed/ page), or (for sites that
 * block embedding, like Credly/GitHub/LinkedIn) whichever URL the caller
 * chose to still show here anyway */
const BrowserPopup = ({ url, onClose }: { url: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      className="flex h-[88vh] w-[92vw] max-w-4xl flex-col overflow-hidden rounded-lg border border-black/30 bg-white shadow-2xl"
    >
      <div className="flex items-center gap-2 border-b border-black/10 bg-[#e8e8ea] px-3 py-2">
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="group flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#ff5f57]"
        >
          <span className="text-[7px] leading-none text-[#4d0000] opacity-0 group-hover:opacity-100">
            ✕
          </span>
        </button>
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[11px] text-gray-600">
          <span>🔒</span>
          <span className="truncate">{url}</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-auto bg-neutral-100">
        {isImagePath(url) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="mx-auto block h-auto w-full max-w-2xl" />
        ) : (
          <iframe
            src={url}
            title="preview"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </motion.div>
  </motion.div>
);

export default BrowserPopup;
