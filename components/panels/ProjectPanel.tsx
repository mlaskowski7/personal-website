"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { findProject } from "@/lib/constants";
import { primaryExt } from "@/lib/files";
import VimTypedDoc, { VimLine } from "../editor/VimTypedDoc";
import TechBadge from "../editor/TechBadge";
import TerminalPopup, { TERMINAL_STEP_MS } from "../editor/TerminalPopup";
import BrowserPopup from "../editor/BrowserPopup";

interface Props {
  slug?: string;
  instant?: boolean;
}

const blank: VimLine = { text: "", noNumber: true, render: () => <>&nbsp;</> };

const kw = (s: string) => <span className="text-ed-purple">{s}</span>;
const id = (s: string) => <span className="text-ed-cyan">{s}</span>;
const str = (s: string) => <span className="text-ed-green">&quot;{s}&quot;</span>;

const strList = (items: string[]) => (
  <>
    {items.map((s, i) => (
      <span key={s}>
        {str(s)}
        {i < items.length - 1 ? ", " : ""}
      </span>
    ))}
  </>
);

/** language-appropriate source for the project "file", keyed by extension */
const sourceFor = (
  ext: string,
  name: string,
  year: string,
  stack: string[]
): VimLine[] => {
  const line = (text: string, render: () => React.ReactNode): VimLine => ({
    text,
    render,
  });

  switch (ext) {
    case "RS":
      return [
        line("struct Project {", () => <>{kw("struct")} Project {"{"}</>),
        line("    name: &'static str,", () => <>    name: &&apos;static str,</>),
        line("    year: &'static str,", () => <>    year: &&apos;static str,</>),
        line("    stack: &'static [&'static str],", () => (
          <>    stack: &&apos;static [&&apos;static str],</>
        )),
        line("}", () => <>{"}"}</>),
        blank,
        line("fn main() {", () => <>{kw("fn")} {id("main")}() {"{"}</>),
        line(`    let project = Project {`, () => (
          <>    {kw("let")} project = Project {"{"}</>
        )),
        line(`        name: "${name}",`, () => <>        name: {str(name)},</>),
        line(`        year: "${year}",`, () => <>        year: {str(year)},</>),
        line(`        stack: &[${stack.map((s) => `"${s}"`).join(", ")}],`, () => (
          <>        stack: &[{strList(stack)}],</>
        )),
        line("    };", () => <>    {"};"}</>),
        line("    render(project);", () => <>    {id("render")}(project);</>),
        line("}", () => <>{"}"}</>),
      ];
    case "GO":
      return [
        line("package main", () => <>{kw("package")} main</>),
        blank,
        line("type Project struct {", () => (
          <>{kw("type")} Project {kw("struct")} {"{"}</>
        )),
        line("    Name  string", () => <>    Name  {kw("string")}</>),
        line("    Year  string", () => <>    Year  {kw("string")}</>),
        line("    Stack []string", () => <>    Stack []{kw("string")}</>),
        line("}", () => <>{"}"}</>),
        blank,
        line("func main() {", () => <>{kw("func")} {id("main")}() {"{"}</>),
        line("    project := Project{", () => (
          <>    project := Project{"{"}</>
        )),
        line(`        Name:  "${name}",`, () => <>        Name:  {str(name)},</>),
        line(`        Year:  "${year}",`, () => <>        Year:  {str(year)},</>),
        line(
          `        Stack: []string{${stack.map((s) => `"${s}"`).join(", ")}},`,
          () => (
            <>
              {"        Stack: []"}
              {kw("string")}
              {"{"}
              {strList(stack)}
              {"},"}
            </>
          )
        ),
        line("    }", () => <>{"    }"}</>),
        line("    Render(project)", () => <>    {id("Render")}(project)</>),
        line("}", () => <>{"}"}</>),
      ];
    case "JAVA":
      return [
        line("public class Project {", () => (
          <>
            {kw("public")} {kw("class")} Project {"{"}
          </>
        )),
        line("    String name, year;", () => <>    {kw("String")} name, year;</>),
        line("    String[] stack;", () => <>    {kw("String")}[] stack;</>),
        blank,
        line("    public static void main(String[] args) {", () => (
          <>
            {"    "}
            {kw("public")} {kw("static")} {kw("void")} {id("main")}(
            {kw("String")}[] args) {"{"}
          </>
        )),
        line("        Project project = new Project();", () => (
          <>
            {"        "}Project project = {kw("new")} Project();
          </>
        )),
        line(`        project.name = "${name}";`, () => (
          <>        project.name = {str(name)};</>
        )),
        line(`        project.year = "${year}";`, () => (
          <>        project.year = {str(year)};</>
        )),
        line(
          `        project.stack = new String[]{${stack
            .map((s) => `"${s}"`)
            .join(", ")}};`,
          () => (
            <>
              {"        project.stack = "}
              {kw("new")} {kw("String")}[]{"{"}
              {strList(stack)}
              {"};"}
            </>
          )
        ),
        line("        Render.show(project);", () => (
          <>        Render.show(project);</>
        )),
        line("    }", () => <>{"    }"}</>),
        line("}", () => <>{"}"}</>),
      ];
    case "PY":
      return [
        line("class Project:", () => <>{kw("class")} Project:</>),
        line("    def __init__(self, name, year, stack):", () => (
          <>    {kw("def")} {id("__init__")}(self, name, year, stack):</>
        )),
        line("        self.name = name", () => <>        self.name = name</>),
        line("        self.year = year", () => <>        self.year = year</>),
        line("        self.stack = stack", () => <>        self.stack = stack</>),
        blank,
        line("project = Project(", () => <>project = Project(</>),
        line(`    name="${name}",`, () => <>    name={str(name)},</>),
        line(`    year="${year}",`, () => <>    year={str(year)},</>),
        line(
          `    stack=[${stack.map((s) => `"${s}"`).join(", ")}],`,
          () => (
            <>    stack=[{strList(stack)}],</>
          )
        ),
        line(")", () => <>)</>),
        line("render(project)", () => <>{id("render")}(project)</>),
      ];
    case "CS":
      return [
        line("public class Project", () => (
          <>
            {kw("public")} {kw("class")} Project
          </>
        )),
        line("{", () => <>{"{"}</>),
        line("    public string Name, Year;", () => (
          <>    {kw("public")} {kw("string")} Name, Year;</>
        )),
        line("    public string[] Stack;", () => (
          <>    {kw("public")} {kw("string")}[] Stack;</>
        )),
        line("}", () => <>{"}"}</>),
        blank,
        line("var project = new Project", () => (
          <>
            {kw("var")} project = {kw("new")} Project
          </>
        )),
        line("{", () => <>{"{"}</>),
        line(`    Name = "${name}",`, () => <>    Name = {str(name)},</>),
        line(`    Year = "${year}",`, () => <>    Year = {str(year)},</>),
        line(
          `    Stack = new[] { ${stack.map((s) => `"${s}"`).join(", ")} },`,
          () => (
            <>
              {"    Stack = "}
              {kw("new")}[] {"{ "}
              {strList(stack)}
              {" },"}
            </>
          )
        ),
        line("};", () => <>{"};"}</>),
        line("Render(project);", () => <>{id("Render")}(project);</>),
      ];
    case "CPP":
      return [
        line("struct Project {", () => <>{kw("struct")} Project {"{"}</>),
        line("    std::string name, year;", () => (
          <>    std::{kw("string")} name, year;</>
        )),
        line("    std::vector<std::string> stack;", () => (
          <>    std::vector&lt;std::{kw("string")}&gt; stack;</>
        )),
        line("};", () => <>{"};"}</>),
        blank,
        line("int main() {", () => <>{kw("int")} {id("main")}() {"{"}</>),
        line(
          `    Project project{"${name}", "${year}", {${stack
            .map((s) => `"${s}"`)
            .join(", ")}}};`,
          () => (
            <>
              {"    Project project{"}
              {str(name)}, {str(year)}, {"{"}
              {strList(stack)}
              {"}};"}
            </>
          )
        ),
        line("    render(project);", () => <>    {id("render")}(project);</>),
        line("}", () => <>{"}"}</>),
      ];
    default:
      return [
        line("interface Project {", () => <>{kw("interface")} Project {"{"}</>),
        line("  name: string;", () => <>  name: {kw("string")};</>),
        line("  year: string;", () => <>  year: {kw("string")};</>),
        line("  stack: string[];", () => <>  stack: {kw("string")}[];</>),
        line("}", () => <>{"}"}</>),
        blank,
        line("const project: Project = {", () => (
          <>
            {kw("const")} project: Project = {"{"}
          </>
        )),
        line(`  name: "${name}",`, () => <>  name: {str(name)},</>),
        line(`  year: "${year}",`, () => <>  year: {str(year)},</>),
        line(
          `  stack: [${stack.map((s) => `"${s}"`).join(", ")}],`,
          () => <>  stack: [{strList(stack)}],</>
        ),
        line("};", () => <>{"};"}</>),
        line("render(project);", () => <>{id("render")}(project);</>),
      ];
  }
};

/** first entry is the command typed at the prompt; the rest is its output */
const RUN_COMMANDS: Record<string, string[]> = {
  RS: ["cargo run --release", "Compiling project v0.1.0", "Finished release [optimized]"],
  GO: ["go run main.go", "building..."],
  JAVA: ["javac Project.java && java Project", "compiling..."],
  PY: ["python main.py", "loading..."],
  CS: ["dotnet run", "Build succeeded."],
  CPP: ["g++ main.cpp -o app && ./app", "compiling..."],
  TSX: ["npm run dev", "▲ ready in 412ms"],
  TS: ["tsc && node main.js", "compiling..."],
  JS: ["node main.js", "running..."],
  TXT: ["./run.sh"],
};

type Phase = "typing" | "running" | "done";

const ProjectPanel = ({ slug, instant }: Props) => {
  const project = slug ? findProject(slug) : undefined;
  const [imgError, setImgError] = useState(false);
  const [phase, setPhase] = useState<Phase>(instant ? "done" : "typing");
  const [showVideo, setShowVideo] = useState(false);

  const runExt = project ? primaryExt(project).ext : "TXT";
  const runDuration =
    (RUN_COMMANDS[runExt] ?? RUN_COMMANDS.TXT).length * TERMINAL_STEP_MS + 650;

  useEffect(() => {
    if (phase !== "running") return;
    const t = setTimeout(() => setPhase("done"), runDuration);
    return () => clearTimeout(t);
  }, [phase, runDuration]);

  const lines = useMemo<VimLine[]>(() => {
    if (!project) return [];
    const { ext, color } = primaryExt(project);
    const stackNames = project.techUsed.map((t) => t.name);
    const commentPrefix = ext === "PY" ? "#" : "//";
    return [
      {
        text: `${commentPrefix} personal-projects/${project.slug}.${ext.toLowerCase()}`,
        render: () => (
          <span className="text-ed-muted">
            {commentPrefix} personal-projects/
            <span className={color}>
              {project.slug}.{ext.toLowerCase()}
            </span>
          </span>
        ),
      },
      blank,
      ...sourceFor(ext, project.title, project.year, stackNames),
    ];
  }, [project]);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14 text-ed-muted">
        {"// project not found"}
      </div>
    );
  }

  const { ext } = primaryExt(project);

  const finalContent = (
    <>
      <h1 className="mt-2 pl-[3.25rem] text-2xl font-bold tracking-tight text-ed-fg glow-text">
        {project.title}
      </h1>
      <p className="mt-1 pl-[3.25rem] text-[14px] text-ed-muted">{project.tagline}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 pl-[3.25rem] text-[13px]">
        <Link
          href={project.repoLink}
          target="_blank"
          className="group flex items-center gap-2 rounded-md bg-ed-blue px-3 py-1.5 font-medium text-white transition-transform hover:-translate-y-0.5 hover:shadow-glow"
        >
          git clone ↗
        </Link>
        {project.prodLink && (
          <Link
            href={project.prodLink}
            target="_blank"
            className="flex items-center gap-2 rounded-md border border-ed-border bg-ed-bg2 px-3 py-1.5 text-ed-fg transition-transform hover:-translate-y-0.5 hover:border-ed-green"
          >
            live demo ↗
          </Link>
        )}
        {project.videoUrl && (
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-2 rounded-md border border-ed-border bg-ed-bg2 px-3 py-1.5 text-ed-fg transition-transform hover:-translate-y-0.5 hover:border-ed-cyan"
          >
            watch demo ▶
          </button>
        )}
        <span className="rounded-full border border-ed-border px-2 py-0.5 text-[11px] text-ed-muted">
          {project.year}
        </span>
      </div>

      <div className="mt-5 pl-[3.25rem]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
          Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techUsed.map((t) => (
            <TechBadge key={t.name} tech={t} />
          ))}
        </div>
      </div>

      {project.imagePath && !imgError && (
        <div className="relative mt-6 ml-[3.25rem] aspect-video max-w-2xl overflow-hidden rounded-lg border border-ed-border bg-ed-bg3">
          <Image
            src={project.imagePath}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover object-top"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="mt-6 pl-[3.25rem]">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ed-muted">
          README
        </p>
        <p className="mt-2 max-w-2xl text-[14px] leading-7 text-ed-fg/85">
          {project.description}
        </p>
      </div>
    </>
  );

  if (phase === "done") {
    return (
      <>
        <motion.div
          initial={instant ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14"
        >
          {finalContent}
        </motion.div>

        {/* portaled to <body> — a "fixed" element inside this animated
            (transformed) ancestor would otherwise position relative to it
            instead of the viewport */}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {showVideo && project.videoUrl && (
                <BrowserPopup
                  url={project.videoUrl}
                  onClose={() => setShowVideo(false)}
                />
              )}
            </AnimatePresence>,
            document.body
          )}
      </>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
      <div className="relative">
        <VimTypedDoc
          path={`personal-projects/${project.slug}`}
          lines={lines}
          showWriteFooter={false}
          instant={false}
          onDone={() => setPhase("running")}
        />
        <AnimatePresence>
          {phase === "running" && (
            <TerminalPopup lines={RUN_COMMANDS[ext] ?? RUN_COMMANDS.TXT} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectPanel;
