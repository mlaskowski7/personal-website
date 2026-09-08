import {
  activities,
  certifications,
  educationData,
  experienceData,
} from "./constants";
import { slugify } from "./slug";

export type CommitType = "job" | "edu" | "cert" | "activity";

export interface Commit {
  id: string;
  type: CommitType;
  branch: string;
  hash: string;
  fullHash: string;
  title: string;
  message: string;
  date: string;
  sortKey: string;
  current?: boolean;
  icon?: string;
  fileName: string;
  filePath: string;
  // diff payload
  role?: string;
  company?: string;
  issuer?: string;
  location?: string;
  bullets?: string[];
  tech?: string[];
  repoLink?: string;
  extraLinks?: { label: string; url: string }[];
}

const hashInt = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h >>> 0;
};

const longHash = (s: string) => {
  let out = "";
  let seed = s;
  while (out.length < 40) {
    out += hashInt(seed).toString(16).padStart(8, "0");
    seed = out;
  }
  return out.slice(0, 40);
};

export const buildTimeline = (): Commit[] => {
  const jobs: Commit[] = experienceData.map((e) => {
    const full = longHash(e.title + e.company_name);
    return {
      id: `job-${slugify(e.company_name)}`,
      type: "job",
      branch: "main",
      hash: full.slice(0, 7),
      fullHash: full,
      title: `${e.title} @ ${e.company_name}`,
      message: `feat(career): ${slugify(e.title)} @ ${slugify(e.company_name)}`,
      date: e.date,
      sortKey: e.current ? "9999-99" : e.sortDate,
      current: e.current,
      icon: e.icon,
      fileName: `${slugify(e.company_name)}.diff`,
      filePath: `career/${slugify(e.company_name)}`,
      role: e.title,
      company: e.company_name,
      location: e.location,
      bullets: e.bullets,
      tech: e.techRelated.map((t) => t.name),
      extraLinks: [
        e.website && { label: `website: ${e.website}`, url: e.website },
        e.linkedin && { label: `linkedin: ${e.linkedin}`, url: e.linkedin },
      ].filter((l): l is { label: string; url: string } => Boolean(l)),
    };
  });

  const edu: Commit[] = educationData.map((e) => {
    const full = longHash(e.degree + e.school);
    return {
      id: `edu-${slugify(e.school)}`,
      type: "edu",
      branch: "edu",
      hash: full.slice(0, 7),
      fullHash: full,
      title: e.degree,
      message: `docs(edu): ${slugify(e.school)}`,
      date: e.date,
      sortKey: e.sortDate,
      icon: e.icon,
      fileName: `${slugify(e.school)}.diff`,
      filePath: `education/${slugify(e.school)}`,
      role: e.degree,
      company: e.school,
      location: e.detail,
      bullets: [
        ...(e.detail ? [e.detail] : []),
        ...(e.techRelated?.length
          ? [`skills: ${e.techRelated.map((t) => t.name).join(", ")}`]
          : []),
      ],
      tech: e.techRelated?.map((t) => t.name),
    };
  });

  const certs: Commit[] = certifications.map((c) => {
    const full = longHash(c.name);
    return {
      id: `cert-${slugify(c.name)}`,
      type: "cert",
      branch: "certs",
      hash: full.slice(0, 7),
      fullHash: full,
      title: c.name,
      message: `cert: ${slugify(c.name)}`,
      date: c.year,
      sortKey: `${c.year}-07`,
      icon: c.icon,
      fileName: `${slugify(c.name)}.diff`,
      filePath: `certifications/${slugify(c.name)}`,
      issuer: c.issuer,
      company: c.issuer,
      bullets: [c.description, `skills: ${c.skills.join(", ")}`],
      tech: c.skills,
      repoLink: c.verifyLink,
    };
  });

  const activityCommits: Commit[] = activities.map((a) => {
    const full = longHash(a.title);
    return {
      id: `activity-${slugify(a.title)}`,
      type: "activity",
      branch: "activities",
      hash: full.slice(0, 7),
      fullHash: full,
      title: a.title,
      message: `chore(activities): ${slugify(a.title)}`,
      date: a.date,
      sortKey: a.sortDate,
      icon: a.icon,
      fileName: `${slugify(a.title)}.diff`,
      filePath: `activities/${slugify(a.title)}`,
      company: a.context,
      bullets: a.techUsed
        ? [a.description, `stack: ${a.techUsed.map((t) => t.name).join(", ")}`]
        : [a.description],
      tech: a.techUsed?.map((t) => t.name),
      repoLink: a.repoLink,
    };
  });

  return [...jobs, ...edu, ...certs, ...activityCommits].sort((a, b) =>
    a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0
  );
};

export const commitColorVar: Record<CommitType, string> = {
  job: "rgb(var(--ed-blue))",
  edu: "rgb(var(--ed-green))",
  cert: "rgb(var(--ed-orange))",
  activity: "rgb(var(--ed-purple))",
};

export const commitColorClass: Record<CommitType, string> = {
  job: "text-ed-blue",
  edu: "text-ed-green",
  cert: "text-ed-orange",
  activity: "text-ed-purple",
};

export const findCommit = (id: string) =>
  buildTimeline().find((c) => c.id === id);
