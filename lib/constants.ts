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
  prodLink?: string;
  techUsed: Tech[];
}

type techCategory = "frontend" | "backend" | "fullstack" | "other-tools" | "db";

export interface Tech {
  name: string;
  icon: IconProp | string;
  category: techCategory;
  relatedProjects: Project[];
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  date: string;
  techRelated: Tech[];
}

export const technologies: Tech[] = [
  {
    name: "C#",
    icon: "/csharp2.png",
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
    name: "C++",
    icon: "/cpp.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Bash",
    icon: "/bash.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "SQL",
    icon: "/sql.png",
    category: "db" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "MariaDB",
    icon: "/mariadb.png",
    category: "db" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "MongoDB",
    icon: "/mongodb.png",
    category: "db" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "PostgreSQL",
    icon: "/postgres.png",
    category: "db" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "TypeScript",
    icon: "/ts.png",
    category: "fullstack" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "JavaScript",
    icon: "/javascript.png",
    category: "fullstack" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Node.js",
    icon: "/express.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Python",
    icon: "/python.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "Django",
    icon: "/django.png",
    category: "backend" as techCategory,
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
  {
    name: "Actix",
    icon: "/react.png",
    category: "backend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "SvelteKit",
    icon: "/svelte.png",
    category: "frontend" as techCategory,
    relatedProjects: [] as Project[],
  },
  {
    name: "MySQL",
    icon: "/mySQL-logo.png",
    category: "db" as techCategory,
    relatedProjects: [] as Project[],
  },
];

export const projects: Project[] = [
  {
    title: "Titans Game",
    description:
      "Real time web game project, based on websockets. Supports multiple comprehensive game menu with friends, lobbies functionalities. Advanced user authentication system based on jwt tokens.",
    imagePath: "/titansGame.png",
    repoLink: "https://github.com/mlaskowski7/titansGame",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "Rust" ||
        tech.name === "Actix" ||
        tech.name === "MySQL" ||
        tech.name === "TypeScript" ||
        tech.name === "SvelteKit"
    ),
  },
  {
    title: "Betting Service",
    description:
      "A Node.js and Express-powered betting platform with a React TypeScript frontend and PostgreSQL database. Supports user authentication, bet management, and features comprehensive leaderboards.",
    imagePath: "/betting.png",
    repoLink: "https://github.com/mlaskowski7/bettingService",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "TypeScript" ||
        tech.name === "React" ||
        tech.name === "Node.js" ||
        tech.name === "PostgreSQL"
    ),
  },
  {
    title: "StackOverflow Clone",
    description:
      "A Stack Overflow clone using Next.js, TypeScript, and Tailwind CSS. Used next js server actions for backend, mongodb as database and clerk for authorizarion",
    imagePath: "/stackoverflowClone.png",
    repoLink: "https://github.com/mlaskowski7/stackoverflowClone",
    prodLink: "https://stackoverflow-clone-gold.vercel.app/",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "TypeScript" ||
        tech.name === "Next.js" ||
        tech.name === "MongoDB"
    ),
  },
  {
    title: "Quiz",
    description:
      "This is a fullstack quiz application with backend developed in Java Spring Framework, frontend using Vite with React.js, and Tailwind CSS for styling. The database is powered by PostgreSQL. API endpoints were tested using Postman. App has quiz creation and quiz checking functionalities.",
    imagePath: "/quiz.png",
    repoLink: "https://github.com/mlaskowski7/quiz",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "Java" ||
        tech.name === "Spring" ||
        tech.name === "PostgreSQL" ||
        tech.name === "JavaScript" ||
        tech.name === "React"
    ),
  },
  {
    title: "Friends",
    description:
      "Friends is my fullstack social media web app, with user authorization, feed, like and comment functionalities.",
    imagePath: "/friends.png",
    repoLink: "https://github.com/mlaskowski7/friends",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "Python" ||
        tech.name === "Django" ||
        tech.name === "JavaScript"
    ),
  },
  {
    title: "Pacman Clone",
    description: "Pacman clone window app created in Java with awt, swing",
    imagePath: "/pacman.png",
    repoLink: "https://github.com/mlaskowski7/pacmanGame",
    techUsed: technologies.filter((tech) => tech.name === "Java"),
  },
  {
    title: "2D Game",
    description: "2D Game created in c++ using SFML library",
    imagePath: "/2dgame.png",
    repoLink: "https://github.com/mlaskowski7/2dGame",
    techUsed: technologies.filter((tech) => tech.name === "C++"),
  },
  {
    title: "Chat App",
    description:
      "This is a real-time chat application built using Rust with Actix Web for the backend and Next.js with TypeScript for the frontend. The app supports WebSocket connections for real-time messaging.",
    imagePath: "/chat-app.png",
    repoLink: "https://github.com/mlaskowski7/chat-app",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "Rust" ||
        tech.name === "TypeScript" ||
        tech.name === "Next.js"
    ),
  },
  {
    title: "Wget Clone",
    description: "2D Game created in c++ using SFML library",
    imagePath: "/2dgame.png",
    repoLink: "https://github.com/mlaskowski7/wget_clone",
    techUsed: technologies.filter((tech) => tech.name === "Rust"),
  },
  {
    title: "Auth Server",
    description: "2D Game created in c++ using SFML library",
    imagePath: "/2dgame.png",
    repoLink: "https://github.com/mlaskowski7/rustAuthServer",
    techUsed: technologies.filter((tech) => tech.name === "Rust"),
  },
  {
    title: "Employee Manager",
    description: "2D Game created in c++ using SFML library",
    imagePath: "/2dgame.png",
    repoLink: "https://github.com/mlaskowski7/employeeManager",
    techUsed: technologies.filter(
      (tech) => tech.name === "C#" || tech.name === ".NET"
    ),
  },
  {
    title: "Movies",
    description:
      "FullStack movies web app, front end side made with react js, back end made in java spring and database is held on MongoDB",
    imagePath: "/2dgame.png",
    repoLink: "https://github.com/mlaskowski7/movies",
    techUsed: technologies.filter(
      (tech) =>
        tech.name === "Java" || tech.name === "Spring" || tech.name === "React"
    ),
  },
];

export const experienceData: Experience[] = [
  {
    title: "Bachelor's of Engineering in Computer Science",
    company_name: "Polish-Japanese Academy of Information Technology",
    icon: "/pjatk.png",
    date: "October 2023 - Present",
    techRelated: technologies.filter(
      (tech) =>
        tech.name === "Java" ||
        tech.name === "C++" ||
        tech.name === "Bash" ||
        tech.name === "SQL"
    ),
  },
  {
    title: "Junior Software Developer",
    company_name: "Atinea",
    icon: "/atinea.png",
    date: "February 2024 - Present",
    techRelated: technologies.filter(
      (tech) =>
        tech.name === "C#" ||
        tech.name === ".NET" ||
        tech.name === "TypeScript" ||
        tech.name === "React"
    ),
  },
  {
    title: "Member of RustLab Students Club",
    company_name: "Polish-Japanese Academy of Information Technology",
    icon: "/rust.png",
    date: "April 2024 - Present",
    techRelated: technologies.filter((tech) => tech.name === "Rust"),
  },
  {
    title: ".NET Trainee",
    company_name: "Epam Systems",
    icon: "/epam.png",
    date: "June 2024 - Present",
    techRelated: technologies.filter(
      (tech) => tech.name === "C#" || tech.name === ".NET"
    ),
  },
];

export const navLinks: NavLink[] = [
  {
    title: "ABOUT",
    link: "about",
  },
  {
    title: "TECHNOLOGIES",
    link: "technologies",
  },
  {
    title: "EXPERIENCE/EDUCATION",
    link: "experience",
  },
  {
    title: "PROJECTS",
    link: "projects",
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
    name: "Mail",
    link: "mailto:mtlaskowski7@gmail.com",
    username: "mtlaskowski7@gmail.com",
    icon: faEnvelope,
  },
  {
    name: "Discord",
    link: "https://discord.gg/YyaGb22Q",
    username: "las_novv",
    icon: faDiscord,
  },
];
