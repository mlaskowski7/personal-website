import { Tech, technologies } from "@/lib/constants";
import React from "react";
import TechCard from "./cards/TechCard";

const Technologies = () => {
  return (
    <div
      id="technologies"
      className="mt-[100px] w-full flex max-sm:flex-col gap-20 justify-center items-center max-sm:mx-2"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-tertiary dark:text-dark-tertiary text-[28px] font-bold tracking-wider font-spaceGrotesk">
          MY TECH STACK
        </h1>
        <p>
          Currently the most used by me technologies for backend are C# with
          .NET framework and Rust with actix-web framework
          <br />
          For client side I use react with typescript (often Next.js)
          <br />I am also proficcient in working with Java and Spring Framework
        </p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {technologies.map((elem: Tech, index: number) => (
          <TechCard key={index} tech={elem} />
        ))}
      </div>
    </div>
  );
};

export default Technologies;
