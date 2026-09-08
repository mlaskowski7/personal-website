import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "./slug";

export interface Social {
  name: string;
  link: string;
  username: string;
  icon?: IconProp;
}

type techCategory =
  | "backend"
  | "frontend"
  | "databases"
  | "cloud"
  | "devops";

export interface Tech {
  name: string;
  /** path under /public, or "" to render an initials chip */
  icon: string;
  category: techCategory;
}

export interface Project {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  imagePath: string;
  repoLink: string;
  prodLink?: string;
  videoUrl?: string;
  year: string;
  featured?: boolean;
  techUsed: Tech[];
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  date: string;
  sortDate: string;
  current?: boolean;
  location?: string;
  website?: string;
  linkedin?: string;
  bullets: string[];
  techRelated: Tech[];
}

export interface Education {
  degree: string;
  school: string;
  icon: string;
  date: string;
  sortDate: string;
  detail?: string;
  techRelated?: Tech[];
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string;
  year: string;
  /** official description, from the issuer's certification page */
  description: string;
  /** skills measured, from the issuer's official exam guide */
  skills: string[];
  /** public credential verification link (Credly, Skilljar, etc.) */
  verifyLink?: string;
}

/* ------------------------------------------------------------------ */
/* Technologies                                                        */
/* ------------------------------------------------------------------ */

const I = "/icons/";

export const technologies: Tech[] = [
  // backend (languages + backend frameworks)
  { name: "C#", icon: `${I}csharp.svg`, category: "backend" },
  { name: ".NET", icon: `${I}dotnet.svg`, category: "backend" },
  { name: "Go", icon: `${I}go.svg`, category: "backend" },
  { name: "Java", icon: `${I}java.svg`, category: "backend" },
  { name: "Spring", icon: `${I}spring.svg`, category: "backend" },
  { name: "Python", icon: `${I}python.svg`, category: "backend" },
  { name: "FastAPI", icon: `${I}fastapi.svg`, category: "backend" },
  { name: "Rust", icon: `${I}rust.svg`, category: "backend" },
  { name: "Node.js", icon: `${I}nodedotjs.svg`, category: "backend" },

  // frontend
  { name: "TypeScript", icon: `${I}typescript.svg`, category: "frontend" },
  { name: "JavaScript", icon: `${I}javascript.svg`, category: "frontend" },
  { name: "React", icon: `${I}react.svg`, category: "frontend" },
  { name: "Next.js", icon: `${I}nextdotjs.svg`, category: "frontend" },
  { name: "Redux", icon: `${I}redux.svg`, category: "frontend" },
  { name: "Tailwind CSS", icon: `${I}tailwindcss.svg`, category: "frontend" },

  // databases
  { name: "PostgreSQL", icon: `${I}postgresql.svg`, category: "databases" },
  { name: "MySQL", icon: `${I}mysql.svg`, category: "databases" },
  { name: "SQL Server", icon: `${I}mssql.svg`, category: "databases" },
  { name: "DynamoDB", icon: `${I}amazonwebservices.svg`, category: "databases" },
  { name: "MongoDB", icon: `${I}mongodb.svg`, category: "databases" },
  { name: "Redis", icon: `${I}redis.svg`, category: "databases" },

  // cloud
  { name: "AWS", icon: `${I}amazonwebservices.svg`, category: "cloud" },
  { name: "Google Cloud", icon: `${I}googlecloud.svg`, category: "cloud" },
  { name: "Firebase", icon: `${I}firebase.svg`, category: "cloud" },

  // devops
  { name: "Docker", icon: `${I}docker.svg`, category: "devops" },
  { name: "Terraform", icon: `${I}terraform.svg`, category: "devops" },
  { name: "GitHub Actions", icon: `${I}github.svg`, category: "devops" },
  { name: "GitLab CI", icon: `${I}gitlab.svg`, category: "devops" },
];

// icons for techs used by individual projects but not part of the curated
// core stack shown on tech-stack.json
const EXTRA_ICONS: Record<string, string> = {
  SvelteKit: `${I}svelte.svg`,
  Django: `${I}django.svg`,
  Express: `${I}express.svg`,
  "C++": `${I}cplusplus.svg`,
  Kotlin: `${I}kotlin.svg`,
  tRPC: `${I}trpc.svg`,
  Flask: `${I}flask.svg`,
  "OpenAI API": `${I}openai.svg`,
  "OpenAI SDK": `${I}openai.svg`,
  "Notion API": `${I}notion.svg`,
  Bash: `${I}gnubash.svg`,
  TensorFlow: `${I}tensorflow.svg`,
  Pandas: `${I}pandas.svg`,
  NumPy: `${I}numpy.svg`,
  "Scikit-learn": `${I}scikitlearn.svg`,
  OpenCV: `${I}opencv.svg`,
  // AWS Lambda / API Gateway / SQS / S3 reuse the generic AWS logo — none
  // of these render as standalone badges yet (job diffs only use tech names
  // as highlight keywords), so a dedicated per-service icon isn't worth it
  // except where already fetched below
  "AWS Lambda": `${I}awslambda.svg`,
  Lambda: `${I}awslambda.svg`,
  "API Gateway": `${I}apigateway.svg`,
  SQS: `${I}sqs.svg`,
  S3: `${I}s3.svg`,
  EventBridge: `${I}amazonwebservices.svg`,
  "AWS Bedrock": `${I}amazonwebservices.svg`,
  OpenSearch: `${I}opensearch.svg`,
  Elasticsearch: `${I}elasticsearch.svg`,
  Sass: `${I}sass.svg`,
  "Spring Boot": `${I}spring.svg`,
  "Spring Data JPA": `${I}spring.svg`,
  "Spring Security": `${I}spring.svg`,
  "Java 21": `${I}java.svg`,
  "Java 8": `${I}java.svg`,
  GCP: `${I}googlecloud.svg`,
  "Cloud Run": `${I}googlecloud.svg`,
  "Cloud SQL": `${I}googlecloud.svg`,
};

const tech = (name: string): Tech =>
  technologies.find((t) => t.name === name) ?? {
    name,
    icon: EXTRA_ICONS[name] ?? "",
    category: "backend",
  };

const pick = (...names: string[]): Tech[] => names.map(tech);

export const categoryLabels: Record<techCategory, string> = {
  backend: "backend",
  frontend: "frontend",
  databases: "databases",
  cloud: "cloud",
  devops: "devops",
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const projectSeed: Omit<Project, "slug">[] = [
  {
    title: "AllegroLike",
    tagline: "Full-stack e-commerce marketplace, Spring Boot + React",
    description:
      "A full-stack e-commerce platform built during a PJATK course as a monorepo: a React + TypeScript storefront and admin dashboard with Redux Toolkit and React Query, and a Spring Boot REST API backed by MySQL with JWT auth, Liquibase migrations, Docker and a GitHub Actions CI pipeline.",
    imagePath: "",
    repoLink: "https://github.com/JakubGralinski/AllegroLike",
    year: "2025",
    featured: true,
    techUsed: pick("Java", "Spring", "React", "TypeScript", "MySQL", "Docker", "Redux"),
  },
  {
    title: "Titans Game",
    tagline: "Real-time multiplayer web game over WebSockets",
    description:
      "A real-time web game built on WebSockets. Features a comprehensive game menu with friends, lobbies and matchmaking, plus a JWT-based authentication system. The backend is written in Rust with Actix, the client in SvelteKit and TypeScript.",
    imagePath: "/titansGame.png",
    repoLink: "https://github.com/mlaskowski7/titansGame",
    year: "2024",
    featured: true,
    techUsed: pick("Rust", "TypeScript", "SvelteKit", "MySQL"),
  },
  {
    title: "LoL SoloQ Assistant",
    tagline: "Draft assistance and stats dashboard for League of Legends",
    description:
      "A SoloQ draft assistance and statistics dashboard built during the MAS course at PJATK. The .NET 10 backend follows CQRS with custom command/query handlers, JWT auth and Entity Framework Core over SQL Server, and pulls live data from the Riot Games API. The frontend is a React 19 + TypeScript app on TanStack Start/Router/Query with Tailwind CSS and Radix UI.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/lol-soloq-assistant",
    year: "2026",
    featured: true,
    techUsed: pick(".NET", "C#", "SQL Server", "React", "TypeScript", "Tailwind CSS"),
  },
  {
    title: "2D Game",
    tagline: "2D game engine demo in C++ with SFML",
    description:
      "A 2D game built during a PJATK course in C++ using the SFML library.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/2dGame",
    videoUrl: "https://www.youtube.com/embed/8WtrbL1Ntnw",
    year: "2023",
    techUsed: pick("C++"),
  },
  {
    title: "Pacman Clone",
    tagline: "Desktop Pacman built in Java Swing",
    description:
      "A Pacman clone desktop application built during a PJATK course in Java with AWT and Swing.",
    imagePath: "/pacman.png",
    repoLink: "https://github.com/mlaskowski7/pacmanGame",
    videoUrl: "https://www.youtube.com/embed/K45jRLe2yUA",
    year: "2023",
    techUsed: pick("Java"),
  },
  {
    title: "Gym Planner",
    tagline: "Serverless gym planner on AWS via IaC",
    description:
      "A gym-planner AWS Lambda with a full deployment setup provisioned through Terraform and GitHub Actions.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/gym-planner",
    year: "2025",
    techUsed: pick("Go", "AWS", "Terraform", "GitHub Actions", "OpenAI SDK", "Notion API"),
  },
  {
    title: "ML Algorithms",
    tagline: "Machine-learning algorithms implemented in Go",
    description:
      "A collection of machine-learning algorithms implemented from scratch in Go.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/ml_algorithms",
    year: "2025",
    featured: true,
    techUsed: pick("Go"),
  },
  {
    title: "StackOverflow Clone",
    tagline: "Q&A platform built on the Next.js App Router",
    description:
      "A Stack Overflow clone using Next.js, TypeScript and Tailwind CSS. Uses Next.js server actions for the backend, MongoDB for storage and Clerk for authentication.",
    imagePath: "/stackoverflowClone.png",
    repoLink: "https://github.com/mlaskowski7/stackoverflowClone",
    prodLink: "https://stackoverflow-clone-gold.vercel.app/",
    year: "2024",
    featured: true,
    techUsed: pick("TypeScript", "Next.js", "Tailwind CSS", "MongoDB"),
  },
  {
    title: "Betting Service",
    tagline: "Full-stack betting platform with leaderboards",
    description:
      "A Node.js and Express betting platform with a React + TypeScript frontend and a PostgreSQL database. Supports user authentication, bet management and comprehensive leaderboards.",
    imagePath: "/betting.png",
    repoLink: "https://github.com/mlaskowski7/bettingService",
    year: "2024",
    featured: true,
    techUsed: pick("TypeScript", "React", "Node.js", "Express", "PostgreSQL"),
  },
  {
    title: "Quiz",
    tagline: "Full-stack quiz builder with a Spring backend",
    description:
      "A full-stack quiz application with a Java Spring backend, a Vite + React frontend and Tailwind CSS for styling, backed by PostgreSQL. Supports quiz creation and grading; API endpoints tested with Postman.",
    imagePath: "/quiz.png",
    repoLink: "https://github.com/mlaskowski7/quiz",
    year: "2024",
    featured: true,
    techUsed: pick("Java", "Spring", "React", "PostgreSQL"),
  },
  {
    title: "Movies",
    tagline: "Full-stack movies app, Spring + React + MongoDB",
    description:
      "A full-stack movies web app with a React frontend, a Java Spring backend and data stored in MongoDB.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/movies",
    year: "2023",
    techUsed: pick("Java", "Spring", "React", "MongoDB"),
  },
  {
    title: "Friends",
    tagline: "Full-stack social media app with feed & comments",
    description:
      "Friends is a full-stack social media web app with user authentication, a feed, and like and comment functionality. Built with Python and Django.",
    imagePath: "/friends.png",
    repoLink: "https://github.com/mlaskowski7/friends",
    year: "2023",
    featured: true,
    techUsed: pick("Python", "Django", "JavaScript"),
  },
  {
    title: "Chat App",
    tagline: "Real-time chat with a Rust/Actix WebSocket backend",
    description:
      "A real-time chat application built with Rust and Actix Web on the backend and Next.js + TypeScript on the frontend. Uses WebSocket connections for live messaging between users.",
    imagePath: "/chat-app.png",
    repoLink: "https://github.com/mlaskowski7/chat-app",
    year: "2024",
    featured: true,
    techUsed: pick("Rust", "TypeScript", "Next.js"),
  },
  {
    title: "Employee Manager",
    tagline: "Employee management desktop app in C#/.NET",
    description:
      "An employee management application built with C# and .NET, covering CRUD operations over an employee dataset.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/employeeManager",
    year: "2024",
    techUsed: pick("C#", ".NET"),
  },
  {
    title: "Auth Server",
    tagline: "JWT authentication server in Rust",
    description:
      "A standalone authentication server written in Rust, exposing JWT-based sign-up and login flows.",
    imagePath: "",
    repoLink: "https://github.com/mlaskowski7/rustAuthServer",
    year: "2024",
    techUsed: pick("Rust"),
  },
];

export const projects: Project[] = projectSeed.map((p) => ({
  ...p,
  slug: slugify(p.title),
}));

export const featuredProjects = projects.filter((p) => p.featured);

export const findProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experienceData: Experience[] = [
  {
    title: "Co-Founder",
    company_name: "eloelo.ai",
    icon: "/icons/eloelo.svg",
    date: "Aug 2026 - Present",
    sortDate: "2026-08",
    current: true,
    website: "https://eloelo.ai",
    linkedin: "https://www.linkedin.com/company/eloeloai/",
    bullets: [
      "I'm the architect and main backend developer, designing this distributed, event-driven AWS system end to end.",
      "The backend runs on Go and Python AWS Lambda functions behind API Gateway, communicating asynchronously over SQS, with PostgreSQL for storage and AWS Bedrock for AI-generated match explanations — all provisioned as Terraform IaC.",
      "The frontend is a React + TypeScript app, and eloelo.ai helps people find the right co-founder, collaborator or mentor by matching on skills, personality (BFI-10), goals and commitment, revealing contact details only after a mutual match.",
    ],
    techRelated: pick(
      "Go",
      "Python",
      "AWS",
      "AWS Lambda",
      "API Gateway",
      "SQS",
      "PostgreSQL",
      "AWS Bedrock",
      "Terraform",
      "React",
      "TypeScript"
    ),
  },
  {
    title: "Software Engineer",
    company_name: "Startup Founders Stars",
    icon: "/icons/startupfoundersstars.jpeg",
    date: "Jan 2026 - Present",
    sortDate: "2026-01",
    current: true,
    location: "Warsaw, Poland",
    website: "https://www.startupstars.pl/",
    bullets: [
      "I own the backend behind a mobile app used live at events by hundreds of people.",
      "I built it with Python, FastAPI and PostgreSQL, using Firebase Auth for sign-in.",
      "I also help on the React/TypeScript and Kotlin clients that consume the API.",
    ],
    techRelated: pick(
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Firebase",
      "TypeScript",
      "React",
      "Kotlin"
    ),
  },
  {
    title: "Junior Software Engineer",
    company_name: "EPAM Systems",
    icon: "/icons/epam.png",
    date: "Jun 2025 - Sep 2026",
    sortDate: "2025-06",
    location: "Warsaw, Poland",
    bullets: [
      "I built backend services in C# / .NET on a cloud-native, event-driven AWS platform.",
      "I worked daily with DynamoDB, MongoDB, SQS, EventBridge, Lambda, API Gateway, S3, ElastiCache (Redis) and OpenSearch.",
      "I built an MCP server over our internal API using the official MCP SDK for .NET, exposing internal tooling to LLM agents.",
      "I provisioned infrastructure with Terraform and shipped features TDD-first (xUnit, AutoFixture, Moq).",
      "I ran stakeholder demos and collaborated with QA, BA and DevOps in an Agile team.",
    ],
    techRelated: pick(
      "C#",
      ".NET",
      "AWS",
      "Terraform",
      "DynamoDB",
      "MongoDB",
      "SQS",
      "EventBridge",
      "Lambda",
      "API Gateway",
      "S3",
      "Redis",
      "OpenSearch",
      "MCP"
    ),
  },
  {
    title: "Software Engineer Intern",
    company_name: "Grid Dynamics",
    icon: "/icons/griddynamics.png",
    date: "Nov 2024 - May 2025",
    sortDate: "2024-11",
    location: "Warsaw, Poland",
    bullets: [
      "I joined a Java internship building a microservices-based project.",
      "I wrote well-tested services with Java 21, Spring Boot, Spring Data JPA, Spring Security and Hibernate.",
      "I set up CI/CD for a microservice with Terraform, GitLab CI, GCP Cloud Run and Cloud SQL.",
    ],
    techRelated: pick(
      "Java",
      "Java 21",
      "Spring",
      "Spring Boot",
      "Spring Data JPA",
      "Spring Security",
      "Hibernate",
      "Terraform",
      "GitLab CI",
      "Google Cloud",
      "GCP",
      "Cloud Run",
      "Cloud SQL"
    ),
  },
  {
    title: "Junior Software Engineer",
    company_name: "Atinea",
    icon: "/icons/atinea.png",
    date: "Feb 2024 - Nov 2024",
    sortDate: "2024-02",
    location: "Warsaw, Poland",
    bullets: [
      "I worked across three projects spanning backend, desktop and frontend.",
      "I built a web app with Java 8, Spring and JSP.",
      "I developed a facility-management system in C# / .NET with WCF — down to serial communication and debugging ASM.",
      "I worked on a web client with TypeScript, React, Redux and Sass.",
    ],
    techRelated: pick(
      "Java",
      "Java 8",
      "Spring",
      "JSP",
      "C#",
      ".NET",
      "WCF",
      "ASM",
      "TypeScript",
      "React",
      "Redux",
      "Sass"
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const educationData: Education[] = [
  {
    degree: "Bachelor of Engineering, Computer Science",
    school: "Polish-Japanese Academy of Information Technology",
    icon: "/icons/pjatk.png",
    date: "Oct 2023 - Feb 2027 (expected)",
    sortDate: "2023-10",
    detail: "Specialization: Data Science & Intelligent Systems",
    techRelated: pick(
      "Java",
      "Bash",
      "C++",
      "Python",
      "Data Science",
      "Machine Learning",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "OpenCV"
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    icon: "/icons/cert-aws.svg",
    year: "2025",
    description:
      "Validates skills and knowledge in developing, optimizing, packaging, and deploying applications on AWS, using CI/CD workflows, and identifying and resolving application issues.",
    skills: [
      "Application Development",
      "CI/CD",
      "Debugging",
      "Application Optimization",
      "AWS SDKs & CLI",
    ],
    verifyLink: "https://www.credly.com/badges/8d6914e4-a6f0-459d-a7e1-955ac18d5f36/public_url",
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    icon: "/icons/cert-aws.svg",
    year: "2025",
    description:
      "Validates foundational knowledge of artificial intelligence, machine learning, and generative AI concepts and use cases on AWS.",
    skills: [
      "AI/ML Fundamentals",
      "Generative AI",
      "AWS AI Services",
      "Responsible AI",
      "ML Use Cases",
    ],
    verifyLink: "https://www.credly.com/badges/6c8b9539-b132-42e1-9bb4-04cf6c3e5fae",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    icon: "/icons/cert-terraform.svg",
    year: "2025",
    description:
      "Validates foundational Terraform knowledge and skills — infrastructure as code, the core workflow, state management, modules, and HCP Terraform.",
    skills: [
      "Infrastructure as Code",
      "Terraform Workflow",
      "State Management",
      "Modules",
      "HCP Terraform",
    ],
    verifyLink: "https://www.credly.com/badges/e4dab11b-6665-4f6d-8cc9-8062efd07e8f",
  },
  {
    name: "Claude Certified Architect",
    issuer: "Anthropic",
    icon: "/icons/cert-anthropic.svg",
    year: "2025",
    description:
      "Anthropic's official credential validating the ability to make informed tradeoffs when building production-grade applications with Claude.",
    skills: ["Claude Code", "Claude Agent SDK", "Claude API", "Model Context Protocol"],
    verifyLink: "https://verify.skilljar.com/c/9uwota2w69jq",
  },
  {
    name: "Associate Cloud Engineer",
    issuer: "Google Cloud Platform",
    icon: "/icons/cert-gcp.svg",
    year: "2024",
    description:
      "Validates the ability to deploy, monitor, and maintain projects on Google Cloud — setting up cloud environments, planning solutions, and configuring access and security.",
    skills: [
      "Cloud Solution Setup",
      "Deployment & Scaling",
      "IAM & Security",
      "Monitoring & Operations",
    ],
    verifyLink: "https://www.credly.com/badges/69231b2d-fb7a-4738-956f-507f1023c2d5/public_url",
  },
  {
    name: "Cloud Digital Leader",
    issuer: "Google Cloud Platform",
    icon: "/icons/cert-gcp.svg",
    year: "2024",
    description:
      "Validates knowledge of Google Cloud's core products and services and how they support digital transformation, data, AI, infrastructure, and security.",
    skills: [
      "Digital Transformation",
      "Data & Analytics",
      "Cloud AI",
      "Infrastructure Modernization",
      "Security & Trust",
    ],
    verifyLink: "https://www.credly.com/badges/4aa088bb-e6a0-4818-bad7-ac79dccb328a",
  },
  {
    name: ".NET Development Program",
    issuer: "EPAM Systems",
    icon: "/icons/epam.png",
    year: "2024",
    description:
      "EPAM's internal .NET training program (Jun–Oct 2024) covering ASP.NET Web API, Microsoft SQL, Entity Framework, and building N-layer applications.",
    skills: ["ASP.NET Web API", "Microsoft SQL", "Entity Framework", "N-layer Architecture"],
    verifyLink: "/certs/epam-dotnet-training-cert.jpeg",
  },
  {
    name: "Azure Data Fundamentals",
    issuer: "Microsoft",
    icon: "/icons/cert-azure.svg",
    year: "2024",
    description:
      "Demonstrates foundational knowledge of core data concepts and how they are implemented using Microsoft Azure data services.",
    skills: [
      "Relational Data",
      "Non-Relational Data",
      "Data Warehousing",
      "Analytics Workloads",
    ],
    verifyLink:
      "https://learn.microsoft.com/en-gb/users/mateuszlaskowski-8683/credentials/ee460c41c2e189a",
  },
  {
    name: "Certificate in Advanced English (C1)",
    issuer: "Cambridge English",
    icon: "/icons/cambridge.png",
    year: "2022",
    description:
      "Cambridge's C1-level qualification demonstrating the English proficiency required to succeed in demanding academic and professional environments.",
    skills: ["Reading & Use of English", "Writing", "Listening", "Speaking"],
    verifyLink: "/certs/cae-cert.jpeg",
  },
];

/* ------------------------------------------------------------------ */
/* About / activities                                                  */
/* ------------------------------------------------------------------ */

export const about = {
  headline: "Software Engineer",
  location: "Warsaw, Poland",
  // compact, first-person — panels below carry the detail
  summary:
    "I'm a backend-focused software engineer with 2+ years of experience, currently at EPAM and a startup on the side. I'm Associate-certified in both AWS and Google Cloud, comfortable with Docker and Terraform, and increasingly into AI/ML. I like understanding systems end to end, so I keep one foot in frontend and DevOps too. Outside work I code in Go, tinker with ML, and I played water polo professionally for ~10 years.",
  spokenLanguages: [
    { name: "Polish", level: "Native" },
    { name: "English", level: "C1 (Cambridge CAE)" },
  ],
};

export interface Activity {
  title: string;
  context: string;
  description: string;
  date: string;
  sortDate: string;
  icon?: string;
  repoLink?: string;
  techUsed?: Tech[];
}

export const activities: Activity[] = [
  {
    title: "Machine Learning Collective",
    context: "PJATK",
    description:
      "Member of a student org focused on machine learning — sharing experience, learning together, and building projects, including a RAG chat app over university study materials.",
    date: "Apr 2025 - Jun 2026",
    sortDate: "2025-04",
    icon: "/icons/mlcollective.jpeg",
  },
  {
    title: "GS Warsaw Hackathon",
    context: "Goldman Sachs",
    description:
      "Took 2nd place building HackModelHub — a full-stack platform for hosting data-modeling competitions, with challenge submissions, team collaboration and real-time leaderboards, backed by an automated Python evaluation engine.",
    date: "Nov 2025",
    sortDate: "2025-11",
    icon: "/icons/goldmansachs.svg",
    repoLink: "https://github.com/samorzadpjatk/HackModelHub",
    techUsed: pick(
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "tRPC",
      "PostgreSQL",
      "FastAPI",
      "Python",
      "Docker"
    ),
  },
  {
    title: "AI Tinkerers × OpenAI Warsaw Hackathon",
    context: "OpenAI",
    description:
      "Built CrunchByte, an AI-powered health and fitness assistant using OpenAI's reasoning models for personalized wellness recommendations, integrating Strava, Google Calendar and MyFitnessPal.",
    date: "Apr 2025",
    sortDate: "2025-04",
    icon: "/icons/openai.svg",
    repoLink: "https://github.com/JakubGralinski/AI_Tinkerers_Hackathon_2025",
    techUsed: pick("Python", "Flask", "OpenAI API"),
  },
];

/* ------------------------------------------------------------------ */
/* Socials                                                             */
/* ------------------------------------------------------------------ */

export const socials: Social[] = [
  {
    name: "GitHub",
    link: "https://github.com/mlaskowski7",
    username: "mlaskowski7",
    icon: faGithub,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/mateusz-laskowski-42472a269/",
    username: "mateusz-laskowski",
    icon: faLinkedin,
  },
  {
    name: "Email",
    link: "mailto:mtlaskowski7@gmail.com",
    username: "mtlaskowski7@gmail.com",
    icon: faEnvelope,
  },
];
