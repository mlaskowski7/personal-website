"use client";

import React from "react";
import Image from "next/image";
import { Tech } from "@/lib/constants";

interface Props {
  tech: Tech;
  size?: number;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

/**
 * Renders a tech chip. Brand SVGs from simple-icons are often near-black,
 * so the icon sits on a small light tile that stays legible in both themes.
 */
const TechBadge = ({ tech, size = 16, className = "", onClick, active }: Props) => {
  const interactive = !!onClick;
  const Comp = interactive ? "button" : "div";

  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[12px] transition-all duration-150 ${
        active
          ? "border-ed-blue bg-ed-bg3 text-ed-fg shadow-glow"
          : "border-ed-border bg-ed-bg2 text-ed-fg/85"
      } ${
        interactive
          ? "hover:-translate-y-0.5 hover:border-ed-blue/60 hover:text-ed-fg"
          : ""
      } ${className}`}
    >
      {tech.icon ? (
        <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-white/95 p-[1px] shrink-0">
          <Image
            src={tech.icon}
            alt=""
            width={size}
            height={size}
            unoptimized
            className="h-full w-full object-contain"
          />
        </span>
      ) : (
        <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-ed-bg3 text-[8px] font-bold text-ed-muted shrink-0">
          {tech.name.slice(0, 2)}
        </span>
      )}
      {tech.name}
    </Comp>
  );
};

export default TechBadge;
