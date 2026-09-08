"use client";

import React, { useMemo } from "react";
import { about } from "@/lib/constants";
import { PanelId } from "@/lib/files";
import VimTypedDoc, { VimLine } from "../editor/VimTypedDoc";

interface Props {
  onGoPanel: (panel: PanelId) => void;
  onOpenScm: () => void;
  instant?: boolean;
  onDone?: () => void;
}

const blank: VimLine = { text: "", noNumber: true, render: () => <>&nbsp;</> };

const ReadmePanel = ({ onGoPanel, onOpenScm, instant, onDone }: Props) => {
  const quickLinks: { label: string; hint: string; action: () => void }[] = [
    { label: "tech-stack.json", hint: "core stack", action: () => onGoPanel("stack") },
    { label: "experience ⑂", hint: "source control", action: onOpenScm },
    { label: "contact.json", hint: "reach me", action: () => onGoPanel("contact") },
  ];

  const lines = useMemo<VimLine[]>(() => {
    const sentences = about.summary.split(/(?<=\.)\s+/);
    const out: VimLine[] = [
      { text: "---", render: () => <span className="text-ed-muted">{"---"}</span> },
      {
        text: `name: Mateusz Laskowski`,
        render: () => (
          <span className="text-ed-muted">
            <span className="text-ed-cyan">name</span>:{" "}
            <span className="text-ed-green">Mateusz Laskowski</span>
          </span>
        ),
      },
      {
        text: `role: ${about.headline}`,
        render: () => (
          <span className="text-ed-muted">
            <span className="text-ed-cyan">role</span>:{" "}
            <span className="text-ed-green">{about.headline}</span>
          </span>
        ),
      },
      {
        text: `location: ${about.location}`,
        render: () => (
          <span className="text-ed-muted">
            <span className="text-ed-cyan">location</span>:{" "}
            <span className="text-ed-green">{about.location}</span>
          </span>
        ),
      },
      { text: "---", render: () => <span className="text-ed-muted">{"---"}</span> },
      blank,
      {
        text: "# Hi, I'm Mateusz />",
        render: () => (
          <span className="text-2xl font-bold tracking-tight text-ed-fg glow-text sm:text-3xl">
            {"# Hi, I'm Mateusz "}
            <span className="text-ed-blue">{"/>"}</span>
          </span>
        ),
      },
      blank,
      {
        text: "backend · cloud · AI/ML",
        render: () => (
          <span className="text-[14px] font-semibold text-ed-blue">
            backend · cloud · AI/ML
          </span>
        ),
      },
      blank,
      ...sentences.map((s) => ({
        text: s,
        render: () => (
          <span className="text-[14px] leading-6 text-ed-fg/85">{s}</span>
        ),
      })),
    ];
    return out;
  }, []);

  const after = (
    <>
      <div className="mt-8 pl-[3.25rem]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
          Jump to
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {quickLinks.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              className="group flex flex-col items-start rounded-md border border-ed-border bg-ed-bg2 px-3 py-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ed-blue hover:shadow-glow"
            >
              <span className="text-[13px] text-ed-fg group-hover:text-ed-blue">
                {l.label}
              </span>
              <span className="text-[11px] text-ed-muted">{l.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
      <VimTypedDoc
        path="README.md"
        lines={lines}
        after={after}
        instant={instant}
        onDone={onDone}
      />
    </div>
  );
};

export default ReadmePanel;
