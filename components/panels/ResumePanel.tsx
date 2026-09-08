"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface Props {
  instant?: boolean;
}

const RESUME_PATH = "/MateuszLaskowskiResume.pdf";

const ResumePanel = ({ instant }: Props) => {
  return (
    <motion.div
      initial={instant ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14"
    >
      <h1 className="pl-[3.25rem] text-2xl font-bold text-ed-fg">resume.pdf</h1>

      <div className="mt-5 pl-[3.25rem]">
        <a
          href={RESUME_PATH}
          download="MateuszLaskowskiResume.pdf"
          className="group inline-flex items-center gap-2 rounded-md bg-ed-blue px-4 py-2 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow"
        >
          <FontAwesomeIcon
            icon={faDownload}
            className="text-[11px] transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          Download
        </a>
      </div>

      <div className="mt-6 ml-[3.25rem] overflow-hidden rounded-lg border border-ed-border bg-ed-bg3">
        <iframe
          src={RESUME_PATH}
          title="resume preview"
          className="h-[70vh] w-full"
        />
      </div>
    </motion.div>
  );
};

export default ResumePanel;
