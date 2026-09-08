"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { socials } from "@/lib/constants";
import { useTheme } from "@/context/ThemeProvider";
import { Tab } from "@/lib/files";

interface Props {
  activeFile?: Tab;
}

const useCursorGhost = () => {
  const [pos, setPos] = useState({ ln: 1, col: 1 });
  const frame = useRef<number>();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPos({
          ln: Math.max(1, Math.floor(e.clientY / 19) + 1),
          col: Math.max(1, Math.floor(e.clientX / 8.2) + 1),
        });
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return pos;
};

const useClock = () => {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Warsaw",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const StatusBar = ({ activeFile }: Props) => {
  const { mode, setMode } = useTheme();
  const { ln, col } = useCursorGhost();
  const time = useClock();

  const toggleTheme = () => setMode(mode === "dark" ? "light" : "dark");

  return (
    <div className="flex h-7 shrink-0 items-center justify-between border-t border-ed-border bg-ed-blue px-3 text-[11px] font-medium text-white dark:bg-ed-bg3 dark:text-ed-fg">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCodeBranch} className="text-[10px]" />
          main
        </span>
        <span className="max-sm:hidden">0 problems</span>
        <span className="max-sm:hidden text-white/70 dark:text-ed-muted">
          Warsaw, PL {time}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="max-sm:hidden text-white/70 dark:text-ed-muted">
          Ln {ln}, Col {col}
        </span>
        <span className="max-sm:hidden">UTF-8</span>
        {activeFile && <span className="max-sm:hidden">{activeFile.lang}</span>}

        <div className="flex items-center gap-3 border-l border-white/25 pl-3 dark:border-ed-border">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target={s.link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.name}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {s.icon && <FontAwesomeIcon icon={s.icon} />}
            </a>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="opacity-90 transition-opacity hover:opacity-100"
        >
          <FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
