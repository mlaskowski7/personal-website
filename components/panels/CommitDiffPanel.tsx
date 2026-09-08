"use client";

import React, { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Commit, commitColorClass, commitColorVar } from "@/lib/experience";
import TerminalPopup, { TERMINAL_STEP_MS } from "../editor/TerminalPopup";
import BrowserPopup from "../editor/BrowserPopup";

interface Props {
  commit?: Commit;
  instant?: boolean;
}

/* ---------------- keyword highlighting ---------------- */

const LABEL_PALETTE = [
  "#0969da", // blue
  "#8250df", // purple
  "#1a7f37", // green
  "#9a6700", // gold
  "#cf222e", // red
  "#bc4c00", // orange
  "#6639ba", // violet
  "#116329", // dark green
  "#a40e26", // dark red
  "#57606a", // gray
];

const labelColor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return LABEL_PALETTE[h % LABEL_PALETTE.length];
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HighlightedText = ({
  text,
  keywords,
  instant,
}: {
  text: string;
  keywords: string[];
  instant?: boolean;
}) => {
  if (!keywords.length) return <>{text}</>;
  const sorted = [...keywords].sort((a, b) => b.length - a.length).map(escapeRegExp);
  const re = new RegExp(`(?<![A-Za-z0-9])(${sorted.join("|")})(?![A-Za-z0-9])`, "gi");
  const parts = text.split(re);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
        if (!isMatch) return <Fragment key={i}>{part}</Fragment>;
        const color = labelColor(part);
        return (
          <motion.span
            key={i}
            initial={instant ? false : { backgroundColor: `${color}55` }}
            animate={{ backgroundColor: `${color}00` }}
            transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
            style={{ color, fontWeight: 700 }}
            className="rounded px-0.5"
          >
            {part}
          </motion.span>
        );
      })}
    </>
  );
};

const LinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path
      d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const DiffLine = ({
  children,
  keywords,
  instant,
}: {
  children: string;
  keywords: string[];
  instant?: boolean;
}) => (
  <div className="flex gap-2 bg-ed-green/10 px-3 py-[3px]">
    <span className="select-none text-ed-green">+</span>
    <span className="text-ed-fg/90">
      <HighlightedText text={children} keywords={keywords} instant={instant} />
    </span>
  </div>
);

const DiffLinkLine = ({
  label,
  onOpen,
}: {
  label: string;
  onOpen: () => void;
}) => (
  <div className="flex gap-2 bg-ed-green/10 px-3 py-[3px]">
    <span className="select-none text-ed-green">+</span>
    <button
      onClick={onOpen}
      className="inline-flex items-center gap-1.5 break-all text-left text-ed-blue underline-offset-2 hover:underline"
    >
      <LinkIcon />
      {label}
    </button>
  </div>
);

/** realistic Linux command to "preview" a credential — chafa for local
 * images/PDFs (it genuinely supports both via libpoppler), xdg-open for a
 * remote verification URL or repo */
const previewCommand = (link: string): string[] => {
  if (link.startsWith("/")) {
    const filename = link.split("/").pop() || "credential";
    return [`chafa ${filename}`, "Loading image... done"];
  }
  return [`xdg-open ${link}`, "Opening in default handler..."];
};

type PreviewPhase = "idle" | "terminal" | "browser";
type Row = { kind: "text"; value: string } | { kind: "link"; value: string; label: string };

const CommitDiffPanel = ({ commit, instant }: Props) => {
  const [preview, setPreview] = useState<PreviewPhase>("idle");
  const isCert = commit?.type === "cert";

  useEffect(() => {
    if (preview !== "terminal" || !commit?.repoLink) return;
    const cmds = previewCommand(commit.repoLink);
    const duration = cmds.length * TERMINAL_STEP_MS + 500;
    const t = setTimeout(() => setPreview("browser"), duration);
    return () => clearTimeout(t);
  }, [preview, commit?.repoLink]);

  if (!commit) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14 text-ed-muted">
        {"// commit not found"}
      </div>
    );
  }

  const typeLabel =
    commit.type === "job"
      ? "work"
      : commit.type === "edu"
      ? "education"
      : isCert
      ? "certification"
      : "activity";

  const keywords = commit.tech ?? [];
  const rows: Row[] = [];
  if (commit.role) rows.push({ kind: "text", value: commit.role });
  if (commit.company)
    rows.push({
      kind: "text",
      value: isCert ? `issuer: ${commit.company}` : `@ ${commit.company}`,
    });
  rows.push({ kind: "text", value: commit.date });
  if (commit.location && commit.type === "job")
    rows.push({ kind: "text", value: commit.location });
  if (commit.repoLink)
    rows.push({
      kind: "link",
      value: commit.repoLink,
      label: isCert ? `credential: ${commit.repoLink}` : `repo: ${commit.repoLink}`,
    });
  commit.extraLinks?.forEach((l) =>
    rows.push({ kind: "link", value: l.url, label: l.label })
  );
  commit.bullets?.forEach((b) => rows.push({ kind: "text", value: b }));

  return (
    <motion.div
      key={commit.id}
      initial={instant ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10"
    >
      {/* commit header */}
      <div className="rounded-t-lg border border-ed-border bg-ed-bg2 p-4">
        <div className="flex items-start gap-3">
          {commit.icon ? (
            <span className="flex h-11 shrink-0 items-center">
              <Image
                src={commit.icon}
                alt=""
                width={180}
                height={44}
                unoptimized
                className="h-11 w-auto max-w-[180px] rounded-md object-contain"
              />
            </span>
          ) : (
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[14px] font-bold text-white"
              style={{ background: commitColorVar[commit.type] }}
            >
              {commit.title.slice(0, 2)}
            </span>
          )}
          <div className="min-w-0">
            <h1 className="text-[16px] font-semibold text-ed-fg">{commit.title}</h1>
            <p className="text-[12px] text-ed-muted">
              <span className={commitColorClass[commit.type]}>{typeLabel}</span>{" "}
              · {commit.date}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-0.5 text-[12px] leading-5">
          <p>
            <span className="text-ed-muted">commit </span>
            <span className="text-ed-yellow">{commit.fullHash}</span>
          </p>
          <p className="text-ed-muted">
            Author: Mateusz Laskowski &lt;mtlaskowski7@gmail.com&gt;
          </p>
          <p className="text-ed-muted">Date: {commit.date}</p>
          <p className="pt-2 pl-4 text-ed-fg/80">{commit.message}</p>
        </div>
      </div>

      {/* diff */}
      <div className="overflow-hidden rounded-b-lg border border-t-0 border-ed-border font-mono text-[12.5px] leading-6">
        <div className="px-3 py-[2px] text-ed-muted">
          diff --git a/{commit.filePath} b/{commit.filePath}
        </div>
        <div className="px-3 py-[2px] text-ed-muted">new file mode 100644</div>
        <div className="bg-ed-blue/10 px-3 py-[2px] text-ed-cyan">
          @@ -0,0 +1,{rows.length} @@
        </div>
        {rows.map((row, i) =>
          row.kind === "link" ? (
            <DiffLinkLine
              key={i}
              label={row.label}
              onOpen={() =>
                isCert && row.value.startsWith("/")
                  ? setPreview("terminal")
                  : window.open(row.value, "_blank", "noopener,noreferrer")
              }
            />
          ) : (
            <DiffLine key={i} keywords={keywords} instant={instant}>
              {row.value}
            </DiffLine>
          )
        )}
      </div>

      <AnimatePresence>
        {preview === "terminal" && commit.repoLink && (
          <TerminalPopup lines={previewCommand(commit.repoLink)} />
        )}
      </AnimatePresence>

      {/* portaled to <body> — a "fixed" element inside an animated (transformed)
          ancestor would otherwise be positioned relative to that ancestor
          instead of the viewport, which is why this can't stay nested here */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {preview === "browser" && commit.repoLink && (
              <BrowserPopup
                url={commit.repoLink}
                onClose={() => setPreview("idle")}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
};

export default CommitDiffPanel;
