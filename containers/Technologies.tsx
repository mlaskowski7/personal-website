"use client";
import { Tech, technologies } from "@/lib/constants";
import React from "react";
import TechCard from "../components/cards/TechCard";
import AppearingText from "@/components/AppearingText";

const Technologies = () => {
  return (
    <div
      id="technologies"
      className=" w-full flex max-sm:flex-col gap-20 justify-center items-center max-sm:mx-2"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-tertiary dark:text-dark-tertiary text-[28px] font-bold tracking-wider font-spaceGrotesk">
          MY TECH STACK
        </h1>
        <p>
          Currently the most used by me technologies for backend are{" "}
          <AppearingText text="C#" delay={1} /> with{" "}
          <AppearingText text=".NET" delay={1.25} /> framework and{" "}
          <AppearingText text="Rust" delay={1.5} /> with{" "}
          <AppearingText text="Actix-web" delay={1.75} /> framework
          <br />
          For client side I use <AppearingText
            text="React"
            delay={2}
          /> with <AppearingText text="Typescript" delay={2.25} /> (often{" "}
          <AppearingText text="Next.js" delay={2.5} />)
          <br />I am also proficcient in working with{" "}
          <AppearingText text="Java" delay={2.75} /> and{" "}
          <AppearingText text="Spring" delay={3} /> framework
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {technologies.map((elem: Tech, index: number) => (
          <TechCard key={index} tech={elem} />
        ))}
      </div>
    </div>
  );
};

export default Technologies;
