"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface VimLine {
  /** plain text used to drive typing pace; also the gutter alignment key */
  text: string;
  /** final styled node rendered once this line is committed */
  render: () => React.ReactNode;
  /** suppress the line-number gutter (spacer lines) */
  noNumber?: boolean;
}

interface Props {
  path: string;
  lines: VimLine[];
  step?: number;
  interval?: number;
  className?: string;
  /** rendered once the whole doc finishes typing, fades in */
  after?: React.ReactNode;
  showWriteFooter?: boolean;
  /** hide the path label in the header, keeping just the mode badge */
  hidePath?: boolean;
  /** skip the animation and render fully typed immediately (e.g. tab revisited) */
  instant?: boolean;
  onDone?: () => void;
}

const Cursor = () => (
  <span className="ml-[1px] inline-block h-[1.05em] w-[0.5ch] translate-y-[2px] bg-ed-cyan animate-blink" />
);

const VimTypedDoc = ({
  path,
  lines,
  step = 3,
  interval = 16,
  className = "",
  after,
  showWriteFooter = true,
  hidePath = false,
  instant = false,
  onDone,
}: Props) => {
  const linesRef = useRef(lines);
  linesRef.current = lines;

  const [pos, setPos] = useState(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return instant || reduced
      ? { i: Number.MAX_SAFE_INTEGER, c: 0 }
      : { i: 0, c: 0 };
  });

  const total = lines.length;
  const done = pos.i >= total;

  useEffect(() => {
    if (pos.i >= total) return;
    const id = setInterval(() => {
      setPos((prev) => {
        const ls = linesRef.current;
        if (prev.i >= ls.length) return prev;
        let { i, c } = prev;
        c += step;
        if (c >= ls[i].text.length) {
          i += 1;
          c = 0;
        }
        return { i, c };
      });
    }, interval);
    return () => clearInterval(id);
    // run once on mount — content-only re-renders (e.g. a selection toggle)
    // must not restart the typing animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <div className={className}>
      <div className="mb-4 flex items-center gap-3 pl-12">
        {!hidePath && <span className="text-[12px] text-ed-muted">{path}</span>}
        <span
          className={`rounded px-1.5 py-[1px] text-[10px] font-bold tracking-wide ${
            done ? "bg-ed-bg3 text-ed-muted" : "bg-ed-green/20 text-ed-green"
          }`}
        >
          {done ? "NORMAL" : "-- INSERT --"}
        </span>
      </div>

      <div className="font-mono text-[13.5px] leading-7">
        {lines.map((line, idx) => {
          if (idx > pos.i) return null;
          const committed = idx < pos.i || done;
          return (
            <div key={idx} className="flex">
              {!line.noNumber && (
                <span className="w-8 shrink-0 select-none pr-3 text-right text-[12px] text-ed-muted/50">
                  {idx + 1}
                </span>
              )}
              <span className="min-w-0 whitespace-pre-wrap">
                {committed ? (
                  line.render()
                ) : (
                  <>
                    <span className="text-ed-fg/80">
                      {line.text.slice(0, pos.c)}
                    </span>
                    <Cursor />
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {done && showWriteFooter && (
        <div className="mt-2 flex">
          <span className="w-8 shrink-0" />
          <span className="text-ed-muted">
            <span className="text-ed-cyan">:wq</span>{" "}
            <span className="text-[12px]">
              &quot;{path.split("/").pop()}&quot; {lines.length}L written
            </span>
          </span>
        </div>
      )}

      {done && after && (
        <motion.div
          initial={instant ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {after}
        </motion.div>
      )}
    </div>
  );
};

export default VimTypedDoc;
