"use client";

import React, { useMemo } from "react";
import { Project, projects } from "@/lib/constants";
import { EXT_ORDER, primaryExt } from "@/lib/files";
import VimTypedDoc, { VimLine } from "../editor/VimTypedDoc";

interface Props {
  onOpenProject: (slug: string) => void;
  instant?: boolean;
  onDone?: () => void;
}

const EXT_TO_LANG: Record<string, string> = {
  RS: "Rust",
  GO: "Go",
  JAVA: "Java",
  PY: "Python",
  CS: "C# / .NET",
  TSX: "React / Next.js",
  TS: "TypeScript",
  JS: "JavaScript",
  CPP: "C++",
  TXT: "Other",
};

interface Group {
  ext: string;
  lang: string;
  color: string;
  projects: Project[];
}

const ProjectsIndexPanel = ({ onOpenProject, instant, onDone }: Props) => {
  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, Group>();
    for (const p of projects) {
      const { ext, color } = primaryExt(p);
      if (!map.has(ext)) {
        map.set(ext, { ext, lang: EXT_TO_LANG[ext] ?? ext, color, projects: [] });
      }
      map.get(ext)!.projects.push(p);
    }
    return [...map.values()].sort(
      (a, b) => EXT_ORDER.indexOf(a.ext) - EXT_ORDER.indexOf(b.ext)
    );
  }, []);

  const lines = useMemo<VimLine[]>(() => {
    const out: VimLine[] = [];
    out.push({
      text: "# Personal Projects",
      render: () => (
        <span className="text-xl font-bold text-ed-fg">
          {"# Personal Projects"}
        </span>
      ),
    });
    out.push({ text: "", noNumber: true, render: () => <>&nbsp;</> });
    const introText = `> ${projects.length} repositories across ${groups.length} stacks — pick one to open it.`;
    out.push({ text: introText, render: () => <span className="text-ed-muted">{introText}</span> });
    out.push({ text: "", noNumber: true, render: () => <>&nbsp;</> });

    for (const g of groups) {
      const heading = `## ${g.lang}`;
      out.push({
        text: heading,
        render: () => <span className={`font-semibold ${g.color}`}>{heading}</span>,
      });
      for (const p of g.projects) {
        const text = `- ${p.slug} — ${p.tagline}`;
        out.push({
          text,
          render: () => (
            <button
              onClick={() => onOpenProject(p.slug)}
              className="group inline text-left hover:underline"
            >
              <span className="text-ed-muted">- </span>
              <span className={`${g.color} font-medium`}>{p.slug}</span>
              <span className="text-ed-muted"> — {p.tagline}</span>
              <span className="ml-1 text-[10px] text-ed-cyan opacity-0 transition-opacity group-hover:opacity-100">
                ↵
              </span>
            </button>
          ),
        });
      }
      out.push({ text: "", noNumber: true, render: () => <>&nbsp;</> });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <VimTypedDoc
        path="personal-projects/README.md"
        lines={lines}
        instant={instant}
        onDone={onDone}
      />
    </div>
  );
};

export default ProjectsIndexPanel;
