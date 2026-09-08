"use client";

import React from "react";

export type ViewId = "explorer" | "scm";

interface Props {
  active: ViewId;
  onSelect: (v: ViewId) => void;
}

const FilesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4h5l2 2h9v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const GitIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M6 8.4v7.2M8.3 7.2A5 5 0 0 0 15.6 10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const items: { id: ViewId; label: string; Icon: React.FC }[] = [
  { id: "explorer", label: "Explorer", Icon: FilesIcon },
  { id: "scm", label: "Source Control", Icon: GitIcon },
];

const ActivityBar = ({ active, onSelect }: Props) => {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-l border-ed-border bg-ed-bg2 py-2">
      {items.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            title={label}
            aria-label={label}
            className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
              isActive
                ? "text-ed-fg"
                : "text-ed-muted hover:text-ed-fg"
            }`}
          >
            {isActive && (
              <span className="absolute right-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-ed-blue" />
            )}
            <Icon />
          </button>
        );
      })}
    </div>
  );
};

export default ActivityBar;
