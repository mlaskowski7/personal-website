import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export interface NavLink {
  title: string;
  link: string;
}

export interface Social {
  name: string;
  link: string;
  username: string;
  icon?: IconProp;
}

export interface Project {
  title: string;
  description: string;
  imagePath: string;
  repoLink: string;
  prodLink: string;
  techUsed: Tech[];
}

type techCategory = "frontend" | "backend" | "fullstack" | "other-tools" | "db";

export interface Tech {
  name: string;
  icon: IconProp | string;
  category: techCategory;
  relatedProjects: Project[];
}

export const technologies: Tech[] = [
  {
    name: "C#",
    icon: "/c#Icon.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: ".NET",
    icon: "/dotnet.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Java",
    icon: "/java.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Spring",
    icon: "/spring.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Rust",
    icon: "/rust.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "TypeScript",
    icon: "/ts.png",
    category: "fullstack" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Next.js",
    icon: "/next.svg",
    category: "fullstack" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "React",
    icon: "/react.png",
    category: "frontend" as techCategory,
    relatedProjects: [] as Project[],
  },
];

export const navLinks: NavLink[] = [
  {
    title: "ABOUT",
    link: "#about",
  },
  {
    title: "TECHNOLOGIES",
    link: "#technologies",
  },
  {
    title: "EXPERIENCE/EDUCATION",
    link: "#experience",
  },
  {
    title: "PROJECTS",
    link: "#projects",
  },
];

export const socials: Social[] = [
  {
    name: "Github",
    link: "https://github.com/mlaskowski7",
    username: "mlaskowski7",
    icon: faGithub,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/mateusz-laskowski-42472a269/",
    username: "Mateusz Laskowski",
    icon: faLinkedin,
  },
  {
    name: "Discord",
    link: "https://discord.gg/YyaGb22Q",
    username: "las_novv",
    icon: faDiscord,
  },
  {
    name: "Mail",
    link: "mailto:mtlaskowski7@gmail.com",
    username: "mtlaskowski7@gmail.com",
    icon: faEnvelope,
  },
];
