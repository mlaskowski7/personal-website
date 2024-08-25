import ProjectCard from "@/components/cards/ProjectCard";
import { Project, projects } from "@/lib/constants";
import React from "react";
import { Link } from "react-scroll";

const Projects = () => {
  return (
    <div
      id="projects"
      className={`min-h-screen relative bg-black flex md:flex-row-reverse flex-col-reverse gap-10 max-md:gap-4 justify-center items-center py-10`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-4 items-center">
        {projects.slice(0, 6).map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            img={project.imagePath}
            link={`project/${project.title}`}
            title={project.title}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-left text-white sm:w-[20%] w-[80%] mr-[30px] ml-[0px] p-[10px] pr-0">
        <h1 className="font-bold text-[52px] max-md:mt-[10px] max-lg:text-[38px] text-[#C0C0C0]">
          Personal Projects
        </h1>
        <p className="md:text-[16px] max-md:text-center text-[10px]">
          Take a look at both my personal and academic projects
        </p>
      </div>
    </div>
  );
};

export default Projects;
