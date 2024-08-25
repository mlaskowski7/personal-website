"use client";

import { Tech } from "@/lib/constants";
import React, { useState } from "react";
import Image from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Popover from "../Popover";
import { motion, Variants } from "framer-motion";
import TechDetailsCard from "./TechDetailsCard";

interface Props {
  tech: Tech;
}

const cardVariants: Variants = {
  offscreen: {
    y: 200,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const TechCard = ({ tech }: Props) => {
  const [showingPopover, setShowingPopover] = useState(false);

  const openPopover = () => {
    setShowingPopover(true);
  };
  const closePopover = () => {
    setShowingPopover(false);
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex flex-col justify-center items-center p-8 gap-2 bg-secondary dark:bg-dark-secondary"
    >
      <Image src={tech.icon as string} alt="techIcon" width={70} height={70} />
      <button
        onClick={openPopover}
        className="text-tertiary dark:text-dark-tertiary p-1 rounded-full text-[14px]"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {showingPopover && (
        <Popover
          onClose={closePopover}
          content={<TechDetailsCard tech={tech} onScrollLink={closePopover} />}
        />
      )}
    </motion.div>
  );
};

export default TechCard;
