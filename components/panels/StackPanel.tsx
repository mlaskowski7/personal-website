"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tech,
  technologies,
  categoryLabels,
  experienceData,
  projects,
} from "@/lib/constants";
import TechBadge from "../editor/TechBadge";
import VimTypedDoc, { VimLine } from "../editor/VimTypedDoc";

interface Props {
  onOpenProject: (slug: string) => void;
  onOpenScm: () => void;
  instant?: boolean;
  onDone?: () => void;
}

const categoryOrder: Tech["category"][] = [
  "backend",
  "frontend",
  "databases",
  "cloud",
  "devops",
];

const StackPanel = ({ onOpenProject, onOpenScm, instant, onDone }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedTech = technologies.find((t) => t.name === selected);
  const relatedExperience = selectedTech
    ? experienceData.filter((exp) =>
        exp.techRelated.some((t) => t.name === selectedTech.name)
      )
    : [];
  const relatedProjects = selectedTech
    ? projects.filter((p) => p.techUsed.some((t) => t.name === selectedTech.name))
    : [];

  const lines = useMemo<VimLine[]>(() => {
    const out: VimLine[] = [
      { text: "{", render: () => <span className="text-ed-muted">{"{"}</span> },
    ];
    for (const cat of categoryOrder) {
      const items = technologies.filter((t) => t.category === cat);
      if (!items.length) continue;
      const text = `  "${categoryLabels[cat]}": [ ${items
        .map((t) => t.name)
        .join(", ")} ],`;
      out.push({
        text,
        render: () => (
          <span className="flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-ed-muted">
              <span className="text-ed-cyan">&quot;{categoryLabels[cat]}&quot;</span>
              {": ["}
            </span>
            <span className="flex flex-wrap gap-1.5">
              {items.map((t) => (
                <TechBadge
                  key={t.name}
                  tech={t}
                  active={selected === t.name}
                  onClick={() =>
                    setSelected((s) => (s === t.name ? null : t.name))
                  }
                />
              ))}
            </span>
            <span className="text-ed-muted">],</span>
          </span>
        ),
      });
    }
    out.push({ text: "}", render: () => <span className="text-ed-muted">{"}"}</span> });
    return out;
  }, [selected]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
      <h1 className="pl-[3.25rem] text-2xl font-bold text-ed-fg">tech-stack.json</h1>
      <p className="mt-1 pl-[3.25rem] text-[13px] text-ed-muted">
        Click any technology to see where I&apos;ve used it.
      </p>

      <div className="mt-6">
        <VimTypedDoc
          path="tech-stack.json"
          lines={lines}
          instant={instant}
          onDone={onDone}
        />
      </div>

      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-[3.25rem] mt-4 overflow-hidden rounded-lg border border-ed-border bg-ed-bg2"
          >
            <div className="flex items-center gap-2 border-b border-ed-border px-4 py-2 text-[12px] text-ed-muted">
              <span className="text-ed-blue">$ grep -rl</span> {selectedTech.name}
            </div>
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
                  Experience
                </p>
                {relatedExperience.length === 0 ? (
                  <p className="text-[12px] text-ed-muted">—</p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {relatedExperience.map((exp) => (
                      <button
                        key={exp.title + exp.company_name}
                        onClick={onOpenScm}
                        className="truncate rounded px-2 py-1 text-left text-[12px] text-ed-fg hover:bg-ed-bg3 hover:text-ed-blue"
                      >
                        {exp.title} · {exp.company_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
                  Projects
                </p>
                {relatedProjects.length === 0 ? (
                  <p className="text-[12px] text-ed-muted">—</p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {relatedProjects.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => onOpenProject(p.slug)}
                        className="truncate rounded px-2 py-1 text-left text-[12px] text-ed-fg hover:bg-ed-bg3 hover:text-ed-blue"
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StackPanel;
