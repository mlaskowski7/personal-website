import AppearingText from "@/components/AppearingText";
import ProjectCard from "@/components/cards/ProjectCard";
import { Project, projects } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Projects = () => {
  return (
    <div
      id="projects"
      className={`min-h-screen relative flex md:flex-row flex-col-reverse gap-10 max-md:gap-4 justify-center items-center py-10`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-4 items-center">
        {projects.slice(0, 6).map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            img={project.imagePath}
            link={project.repoLink}
            title={project.title}
            tech={project.techUsed}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-left sm:w-[20%] w-[80%] mr-[30px] ml-[0px] p-[10px] pr-0 gap-3">
        <h1 className="text-tertiary dark:text-dark-tertiary text-[28px] font-bold tracking-wider font-spaceGrotesk">
          Projects
        </h1>
        <p>
          Take a look at both my personal and academic projects, explore more of
          them on my{" "}
          <Link
            href="https://github.com/mlaskowski7"
            className="hover:text-black dark:hover:text-white"
          >
            <AppearingText text="Github" delay={1} isLink={true} />
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Projects;
