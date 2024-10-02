"use client";
import { Social, socials } from "@/lib/constants";
import { faFile, faMehBlank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import AppearingText from "@/components/AppearingText";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="mt-[100px] w-full flex flex-col gap-10 justify-center items-center max-sm:mt-0 max-sm:text-center"
      style={{ height: "calc(100vh - 100px)" }}
      id="about"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] tracking-wider">README.md</h1>
        <p className="max-sm:text-[14px]">
          Hi, my name is Mateusz and I am a{" "}
          <AppearingText
            text="Junior Software Developer"
            delay={1}
            duration={0.5}
          />{" "}
          and a{" "}
          <AppearingText
            text="Computer Science Student"
            delay={1.5}
            duration={0.5}
          />
          <br />
          Located in Warsaw, Poland <br />
          Feel free to contact me and take a look on my website
        </p>
      </div>
      <div className="flex gap-20 justify-center max-sm:flex-col max-sm:gap-10">
        {socials
          .filter((social: Social) => social.icon != undefined)
          .map((social: Social, index: number) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              whileTap={{ scale: 0.85 }}
            >
              <Link
                href={social.link}
                className="bg-secondary dark:bg-dark-secondary hover:text-tertiary dark:hover:text-dark-tertiary ease-in-out duration-300 text-[30px] rounded-full p-3"
              >
                {social.icon && <FontAwesomeIcon icon={social.icon} />}
              </Link>
            </motion.div>
          ))}
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          whileTap={{ scale: 0.85 }}
        >
          <a
            download
            href="/MateuszLaskowskiResume.pdf"
            className="bg-secondary dark:bg-dark-secondary hover:text-tertiary dark:hover:text-dark-tertiary ease-in-out duration-300 text-[30px] rounded-full p-3"
          >
            <FontAwesomeIcon icon={faFile} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
