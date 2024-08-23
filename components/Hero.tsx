"use client";
import { Social, socials } from "@/lib/constants";
import { faMehBlank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="mt-[100px] w-full flex flex-col gap-10 justify-center items-center max-sm:mx-2"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] tracking-wider">README.md</h1>
        <p>
          Hi, my name is Mateusz and I am a{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-bold text-tertiary dark:text-dark-tertiary"
          >
            Junior Software Developer
          </motion.span>{" "}
          and a{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-bold text-tertiary dark:text-dark-tertiary"
          >
            Computer Science Student
          </motion.span>
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
            >
              <Link
                href={social.link}
                className="bg-secondary dark:bg-dark-secondary hover:bg-primary dark:hover:bg-dark-primary ease-in-out duration-300 text-[30px] rounded-full p-3"
              >
                {social.icon && <FontAwesomeIcon icon={social.icon} />}
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Hero;
