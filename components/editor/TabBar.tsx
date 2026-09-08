"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tab } from "@/lib/files";
import FileIcon from "./FileIcon";

interface Props {
  tabs: Tab[];
  activeTabId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

const TabBar = ({ tabs, activeTabId, onSelect, onClose }: Props) => {
  return (
    <div className="flex h-10 shrink-0 items-stretch overflow-x-auto border-b border-ed-border bg-ed-bg2">
      <AnimatePresence initial={false}>
        {tabs.map((tab) => {
          const active = tab.id === activeTabId;
          return (
            <motion.div
              key={tab.id}
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="relative flex shrink-0 items-center"
            >
              <button
                onClick={() => onSelect(tab.id)}
                className={`group flex h-full items-center gap-2 whitespace-nowrap border-r border-ed-border px-3 text-[13px] transition-colors duration-150 ${
                  active
                    ? "bg-ed-bg text-ed-fg"
                    : "text-ed-muted hover:bg-ed-bg/60 hover:text-ed-fg"
                }`}
              >
                <FileIcon ext={tab.ext} color={tab.color} />
                <span>
                  {tab.folder && (
                    <span className="text-ed-muted/70">{tab.folder}/</span>
                  )}
                  {tab.name}
                </span>
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(tab.id);
                  }}
                  className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm text-[11px] text-ed-muted opacity-0 hover:bg-ed-bg3 hover:text-ed-fg group-hover:opacity-100"
                >
                  ✕
                </span>
              </button>
              {active && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-ed-blue"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TabBar;
