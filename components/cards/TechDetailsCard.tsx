import {
  Experience,
  experienceData,
  Project,
  projects,
  Tech,
} from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

interface Props {
  tech: Tech;
  onScrollLink: () => void;
}

interface ElementProps {
  title: string;
  elements: Experience[] | Project[];
  onScrollLink: () => void;
}

const isElementExperience = (
  element: Experience | Project
): element is Experience => {
  return (element as Project).repoLink === undefined;
};

const Element = ({ title, elements, onScrollLink }: ElementProps) => (
  <div className="flex flex-col gap-1 justify-center items-center">
    <h1 className="text-tertiary dark:text-dark-tertiary font-bold">{title}</h1>
    <div className="flex gap-1">
      {elements.map((element: Experience | Project, index: number) => {
        if (isElementExperience(element)) {
          return (
            <ScrollLink
              key={index}
              to="experience"
              className={`font-spaceGrotesk text-[12px] px-1 rounded-md underline-offset-1 ease-in-out duration-300 hover:underline cursor-pointer ${
                index % 2 === 0
                  ? "bg-primary dark:bg-dark-primary"
                  : "bg-tertiary dark:bg-dark-tertiary"
              }`}
              onClick={onScrollLink}
            >
              {element.title} at {element.company_name}
            </ScrollLink>
          );
        } else {
          return (
            <Link
              key={index}
              href={element.repoLink}
              className={`font-spaceGrotesk text-[12px] px-1 rounded-md underline-offset-1 ease-in-out duration-300 hover:underline ${
                index % 2 === 0
                  ? "bg-primary dark:bg-dark-primary"
                  : "bg-tertiary dark:bg-dark-tertiary"
              }`}
            >
              {element.title}
            </Link>
          );
        }
      })}
    </div>
  </div>
);

const TechDetailsCard = ({ tech, onScrollLink }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <Element
        title="Work Experience & Education"
        elements={experienceData.filter((exp) =>
          exp.techRelated.find((elem) => elem.name === tech.name)
        )}
        onScrollLink={onScrollLink}
      />
      <Element
        title="Projects"
        elements={projects.filter((exp) =>
          exp.techUsed.find((elem) => elem.name === tech.name)
        )}
        onScrollLink={onScrollLink}
      />
    </div>
  );
};

export default TechDetailsCard;
