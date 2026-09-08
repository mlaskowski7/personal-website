import { Project, projects } from "./constants";

export type PanelId =
  | "readme"
  | "stack"
  | "projects-index"
  | "project"
  | "contact";

export interface ExplorerFile {
  id: string;
  name: string;
  panel: PanelId;
  lang: string;
  ext: string;
  color: string;
  projectSlug?: string;
  external?: string;
  /** force a browser download instead of opening the external link in a new tab */
  download?: boolean;
  /** containing folder, shown in tabs/breadcrumbs to disambiguate same-named files */
  folder?: string;
}

export interface ExplorerFolder {
  id: string;
  name: string;
  children: ExplorerFile[];
}

export type ExplorerNode = ExplorerFile | ExplorerFolder;

/** A tab in the editor area — either an opened file or an inspected commit. */
export interface Tab {
  id: string;
  name: string;
  ext: string;
  color: string;
  lang: string;
  kind: "file" | "commit";
  panel?: PanelId;
  projectSlug?: string;
  commitId?: string;
  external?: string;
  folder?: string;
}

export const isFolder = (node: ExplorerNode): node is ExplorerFolder =>
  Object.prototype.hasOwnProperty.call(node, "children");

export const fileToTab = (f: ExplorerFile): Tab => ({
  id: f.id,
  name: f.name,
  ext: f.ext,
  color: f.color,
  lang: f.lang,
  kind: "file",
  panel: f.panel,
  projectSlug: f.projectSlug,
  external: f.external,
  folder: f.folder,
});

export const primaryExt = (
  project: Project
): { ext: string; color: string } => {
  const names = project.techUsed.map((t) => t.name);
  const has = (n: string) => names.includes(n);

  if (has("Rust")) return { ext: "RS", color: "text-ed-orange" };
  if (has("Go")) return { ext: "GO", color: "text-ed-cyan" };
  if (has("Java")) return { ext: "JAVA", color: "text-ed-red" };
  if (has("Python")) return { ext: "PY", color: "text-ed-yellow" };
  if (has("C#") || has(".NET")) return { ext: "CS", color: "text-ed-green" };
  if (has("C++")) return { ext: "CPP", color: "text-ed-blue" };
  if (has("Next.js") || has("React"))
    return { ext: "TSX", color: "text-ed-cyan" };
  if (has("TypeScript")) return { ext: "TS", color: "text-ed-blue" };
  if (has("JavaScript")) return { ext: "JS", color: "text-ed-yellow" };
  return { ext: "TXT", color: "text-ed-muted" };
};

/** display order for grouping/sorting projects by primary language */
export const EXT_ORDER = ["RS", "GO", "JAVA", "PY", "CS", "TSX", "TS", "JS", "CPP", "TXT"];

// order follows `projects` in lib/constants.ts (most important first),
// not grouped/sorted by language
export const projectFiles: ExplorerFile[] = projects.map((project) => {
  const { ext, color } = primaryExt(project);
  return {
    id: `project-${project.slug}`,
    name: `${project.slug}.${ext.toLowerCase()}`,
    panel: "project" as const,
    lang: ext,
    ext,
    color,
    projectSlug: project.slug,
  };
});

export const rootFiles: ExplorerFile[] = [
  {
    id: "readme",
    name: "README.md",
    panel: "readme",
    lang: "Markdown",
    ext: "MD",
    color: "text-ed-blue",
  },
  {
    id: "stack",
    name: "tech-stack.json",
    panel: "stack",
    lang: "JSON",
    ext: "JSON",
    color: "text-ed-yellow",
  },
  {
    id: "contact",
    name: "contact.json",
    panel: "contact",
    lang: "JSON",
    ext: "JSON",
    color: "text-ed-green",
  },
  {
    id: "resume",
    name: "resume.pdf",
    panel: "contact",
    lang: "PDF",
    ext: "PDF",
    color: "text-ed-red",
    external: "/MateuszLaskowskiResume.pdf",
    download: true,
  },
];

export const projectsReadme: ExplorerFile = {
  id: "projects-readme",
  name: "README.md",
  panel: "projects-index",
  lang: "Markdown",
  ext: "MD",
  color: "text-ed-blue",
  folder: "personal-projects",
};

export const projectsFolder: ExplorerFolder = {
  id: "projects-folder",
  name: "personal-projects",
  children: [projectsReadme, ...projectFiles],
};

export const explorerTree: ExplorerNode[] = [
  rootFiles[0],
  rootFiles[1],
  projectsFolder,
  rootFiles[2],
  rootFiles[3],
];

export const allFiles: ExplorerFile[] = [
  ...rootFiles,
  projectsReadme,
  ...projectFiles,
];

export const findFile = (id: string): ExplorerFile | undefined =>
  allFiles.find((f) => f.id === id);

export const fileForProject = (slug: string): ExplorerFile | undefined =>
  projectFiles.find((f) => f.projectSlug === slug);
