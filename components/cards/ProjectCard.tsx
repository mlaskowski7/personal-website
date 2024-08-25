"use client";
import { Tech } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface Props {
  img: string;
  link: string;
  title: string;
  tech: Tech[];
}

const ProjectCard = ({ img, link, title, tech }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState({ width: "auto", height: "auto" });
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    // @ts-ignore
    const { naturalWidth, naturalHeight } = imageRef.current;
    const scaleRatio = naturalWidth / naturalHeight;

    let width = naturalWidth;
    let height = naturalHeight;

    const sm = 640;

    const isSm = window.innerWidth < 640;

    const maxWidth = !isSm
      ? window.innerWidth * 0.175
      : window.innerWidth * 0.9;
    const maxHeight = !isSm
      ? window.innerHeight * 0.175
      : window.innerHeight * 0.7;

    if (width > maxWidth) {
      width = maxWidth;
      height = maxWidth / scaleRatio;
    } else if (height > maxHeight) {
      height = maxHeight;
      width = maxHeight * scaleRatio;
    }

    setSize({
      width: width,
      height: height,
    });
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
      }}
      className="relative transition-all duration-300 ease hover:scale-110 mx-auto"
    >
      {isLoading && <div>Loading ...</div>}
      <Image
        ref={imageRef}
        width={400}
        height={400}
        src={img}
        alt={title}
        onLoad={handleImageLoad}
        className={`w-auto h-auto ${
          isLoading ? "display-none" : "display-block"
        }`}
      />
      <div className="absolute inset-0 bg-gray-950/40 opacity-0 hover:opacity-100 flex flex-col justify-center items-center transition-all duration-300 ease w-full h-full gap-2">
        <h1 className="text-white font-bold text-xl text-center">{title}</h1>

        <div className="flex gap-1 justify-center items-center">
          {tech.map((item, index) => (
            <div
              className={` font-spaceGrotesk text-[12px] px-1 rounded-md  ${
                index % 2 == 0
                  ? "bg-secondary dark:bg-dark-secondary"
                  : "bg-tertiary dark:bg-dark-tertiary"
              }`}
              key={index}
            >
              {item.name}
            </div>
          ))}
        </div>
        <Link
          href={link}
          className="text-white text-xs text-center transition-all duration-300 ease hover:underline underline-offset-2"
        >
          Click to view
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
