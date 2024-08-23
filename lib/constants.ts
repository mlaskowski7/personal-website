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
