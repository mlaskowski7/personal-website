import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Technologies from "@/components/Technologies";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary dark:bg-dark-primary text-black dark:text-white min-h-screen text-base font-inter flex flex-col">
      <Navbar />
      <Hero />
      <Technologies />
    </div>
  );
};

export default Page;
