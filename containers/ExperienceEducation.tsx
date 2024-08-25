"use client";

import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { textVariant } from "../lib/motion";
import Image from "next/image";
import { Experience, experienceData, Tech } from "@/lib/constants";
import dynamic from "next/dynamic";

const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false, loading: () => <p>Loading...</p> }
);

interface PropsCard {
  experience: Experience;
}

const ExperienceCard = ({ experience }: PropsCard) => {
  return (
    <VerticalTimelineElement
      contentArrowStyle={{ borderRight: "7px solid #fff" }}
      date={experience.date}
      icon={
        <div className="flex justify-center items-center w-full h-full bg-white rounded-full">
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
            width={60}
            height={60}
          />
        </div>
      }
    >
      <div className="bg-secondary dark:bg-dark-secondary text-black dark:text-white p-4 rounded-xl">
        <div>
          <h3 className=" text text-[24px] font-bold">{experience.title}</h3>
          <p
            className="text-tertiary dark:text-dark-tertiary text-[16px] font-semibold"
            style={{ margin: 0 }}
          >
            {experience.company_name}
          </p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.techRelated.map((point: Tech, index: number) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point.name}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const ExperienceEducation = () => {
  return (
    <div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experienceData.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default ExperienceEducation;
