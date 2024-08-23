import { Tech } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  tech: Tech;
}

const TechCard = ({ tech }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-secondary dark:bg-dark-secondary">
      <Image src={tech.icon as string} alt="techIcon" width={80} height={80} />
    </div>
  );
};

export default TechCard;
