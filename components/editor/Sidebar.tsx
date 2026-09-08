"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExplorerFile, ExplorerNode, explorerTree, isFolder } from "@/lib/files";
import { Commit, commitColorVar } from "@/lib/experience";
import { ViewId } from "./ActivityBar";
import FileIcon from "./FileIcon";

interface Props {
  view: ViewId;
  openTabIds: string[];
  activeTabId: string;
  onOpen: (file: ExplorerFile) => void;
  commits: Commit[];
  onOpenCommit: (commit: Commit) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

/* ---------------- Explorer ---------------- */

const FileRow = ({
  file,
  depth,
  isActive,
  isOpen,
  onOpen,
}: {
  file: ExplorerFile;
  depth: number;
  isActive: boolean;
  isOpen: boolean;
  onOpen: (file: ExplorerFile) => void;
}) => (
  <button
    onClick={() => onOpen(file)}
    style={{ paddingLeft: `${12 + depth * 14}px` }}
    className={`group relative flex w-full items-center gap-2 py-[5px] pr-3 text-left text-[13px] transition-colors duration-150 ${
      isActive
        ? "bg-ed-bg3 text-ed-fg"
        : isOpen
        ? "text-ed-fg hover:bg-ed-bg3/60"
        : "text-ed-muted hover:bg-ed-bg3/60 hover:text-ed-fg"
    }`}
  >
    {isActive && (
      <span className="absolute left-0 h-[22px] w-[2px] bg-ed-blue" />
    )}
    <FileIcon ext={file.ext} color={file.color} />
    <span className="truncate">{file.name}</span>
  </button>
);

const Chevron = ({ open }: { open: boolean }) => (
  <motion.svg
    animate={{ rotate: open ? 90 : 0 }}
    transition={{ duration: 0.15 }}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    className="shrink-0 text-ed-muted"
  >
    <path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </motion.svg>
);

const ExplorerView = ({
  openTabIds,
  activeTabId,
  onOpen,
}: {
  openTabIds: string[];
  activeTabId: string;
  onOpen: (file: ExplorerFile) => void;
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "projects-folder": true,
  });

  const renderNode = (node: ExplorerNode, depth: number): React.ReactNode => {
    if (isFolder(node)) {
      const open = !!expanded[node.id];
      return (
        <div key={node.id}>
          <button
            onClick={() => setExpanded((e) => ({ ...e, [node.id]: !open }))}
            style={{ paddingLeft: `${12 + depth * 14}px` }}
            className="flex w-full items-center gap-1.5 py-[5px] pr-3 text-left text-[13px] text-ed-fg hover:bg-ed-bg3/60"
          >
            <Chevron open={open} />
            <span className="select-none">{node.name}</span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {node.children.map((child) => renderNode(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    return (
      <FileRow
        key={node.id}
        file={node}
        depth={depth}
        isActive={node.id === activeTabId}
        isOpen={openTabIds.includes(node.id)}
        onOpen={onOpen}
      />
    );
  };

  return (
    <>
      <div className="flex items-center px-4 pt-4 pb-2">
        <span className="text-[11px] font-semibold tracking-widest text-ed-muted">
          EXPLORER
        </span>
      </div>
      <div className="px-4 pb-1 text-[12px] font-bold tracking-wide text-ed-fg">
        mateusz-laskowski/
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        {explorerTree.map((node) => renderNode(node, 0))}
      </div>
    </>
  );
};

/* ---------------- Source Control ---------------- */

const MAIN_X = 13;
const CERT_X = 27;

const ScmView = ({
  commits,
  activeTabId,
  onOpenCommit,
}: {
  commits: Commit[];
  activeTabId: string;
  onOpenCommit: (commit: Commit) => void;
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-semibold tracking-widest text-ed-muted">
          SOURCE CONTROL
        </span>
      </div>
      <div className="flex items-center gap-2 px-4 pb-3 text-[12px] text-ed-fg">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-ed-muted">
          <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 8.4v7.2M8.3 7.2A5 5 0 0 0 15.6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        main
        <span className="text-ed-muted">· {commits.length} commits</span>
      </div>

      <div className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
        Graph
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {commits.map((c, i) => {
          const isCert = c.type === "cert" || c.type === "activity";
          const first = i === 0;
          const last = i === commits.length - 1;
          const isActive = activeTabId === `commit-${c.id}`;
          return (
            <button
              key={c.id}
              onClick={() => onOpenCommit(c)}
              className={`relative block w-full py-2 pl-9 pr-3 text-left transition-colors ${
                isActive ? "bg-ed-bg3" : "hover:bg-ed-bg3/60"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-[2px] bg-ed-blue" />
              )}
              {/* trunk */}
              <span
                className="absolute w-[2px] bg-ed-border"
                style={{
                  left: MAIN_X,
                  top: first ? "50%" : 0,
                  bottom: last ? "50%" : 0,
                }}
              />
              {/* cert spur */}
              {isCert && (
                <span
                  className="absolute h-[2px] bg-ed-border"
                  style={{ left: MAIN_X, top: "calc(50% - 1px)", width: CERT_X - MAIN_X }}
                />
              )}
              {/* node */}
              <span
                className="absolute z-10 -translate-y-1/2 rounded-full border-2"
                style={{
                  left: (isCert ? CERT_X : MAIN_X) - 4,
                  top: "50%",
                  width: 9,
                  height: 9,
                  background: "rgb(var(--ed-bg2))",
                  borderColor: commitColorVar[c.type],
                }}
              />
              <div className="flex items-start gap-1.5">
                <span className="mt-[1px] shrink-0 text-[11px] text-ed-yellow">
                  {c.hash}
                </span>
                <span className="text-[12.5px] leading-snug text-ed-fg">
                  {c.title}
                </span>
              </div>
              <span className="mt-0.5 block text-[10.5px] text-ed-muted">
                {c.date}
                {c.issuer ? ` · ${c.issuer}` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

/* ---------------- Wrapper ---------------- */

const Sidebar = ({
  view,
  openTabIds,
  activeTabId,
  onOpen,
  commits,
  onOpenCommit,
  mobileOpen,
  onCloseMobile,
}: Props) => {
  const content = (
    <div className="relative flex h-full flex-col bg-ed-bg2">
      {view === "explorer" ? (
        <ExplorerView
          openTabIds={openTabIds}
          activeTabId={activeTabId}
          onOpen={onOpen}
        />
      ) : (
        <ScmView
          commits={commits}
          activeTabId={activeTabId}
          onOpenCommit={onOpenCommit}
        />
      )}
    </div>
  );

  const desktopWidth = view === "scm" ? "md:w-[24rem]" : "md:w-64";
  const drawerWidth = view === "scm" ? "w-[85vw] max-w-[24rem]" : "w-64";

  return (
    <>
      {/* Desktop — right side */}
      <div
        className={`hidden md:block md:shrink-0 md:border-l md:border-ed-border ${desktopWidth}`}
      >
        {content}
      </div>

      {/* Mobile drawer — from the right */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className={`fixed inset-y-0 right-0 z-50 border-l border-ed-border md:hidden ${drawerWidth}`}
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
