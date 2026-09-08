"use client";

import React from "react";
import { Tab } from "@/lib/files";

interface Props {
  activeFile?: Tab;
  onMenuClick: () => void;
}

const TitleBar = ({ activeFile, onMenuClick }: Props) => {
  return (
    <div className="flex h-9 shrink-0 items-center gap-3 border-b border-ed-border bg-ed-bg2 px-4 text-ed-muted">
      <button
        onClick={onMenuClick}
        className="text-ed-muted hover:text-ed-fg md:hidden"
        aria-label="Toggle explorer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <div className="flex-1 select-none truncate text-center text-[12px]">
        <span className="text-ed-muted">mateusz-laskowski</span>
        {activeFile && (
          <>
            <span className="mx-1.5 text-ed-border">/</span>
            {activeFile.folder && (
              <span className="text-ed-muted">{activeFile.folder}/</span>
            )}
            <span className="text-ed-fg">{activeFile.name}</span>
          </>
        )}
        <span className="mx-1.5 text-ed-border max-sm:hidden">—</span>
        <span className="text-ed-muted max-sm:hidden">~/portfolio</span>
      </div>

      <div className="w-[54px] max-sm:hidden" />
    </div>
  );
};

export default TitleBar;
