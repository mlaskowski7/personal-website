import ProgressBar from "@/components/ProgressBar";
import ExperienceEducation from "@/containers/ExperienceEducation";
import Hero from "@/containers/Hero";
import Navbar from "@/containers/Navbar";
import Projects from "@/containers/Projects";
import Technologies from "@/containers/Technologies";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary dark:bg-dark-primary text-black dark:text-white min-h-screen text-base font-inter flex flex-col max-sm:gap-40">
      <Navbar />
      <Hero />
      <Technologies />
      <ExperienceEducation />
      <Projects />
      <ProgressBar />
    </div>
  );
};

export default Page;
