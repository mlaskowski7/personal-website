"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface Props {
  img: string;
  link: string;
  title: string;
}

const ProjectCard = ({ img, link, title }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState({ width: "auto", height: "auto" });
  const imageRef = useRef(null);

  const handleImageLoad = () => {
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
        width={40}
        height={40}
        src={img}
        alt={title}
        onLoad={handleImageLoad}
        className={`w-auto h-auto ${
          isLoading ? "display-none" : "display-block"
        }`}
      />
      <div className="absolute inset-0 bg-gray-950/40 opacity-0 hover:opacity-100 flex flex-col justify-center items-center transition-all duration-300 ease w-full h-full">
        <h1 className="text-white font-bold text-xl text-center">{title}</h1>
        <Link
          href={`/${link}`}
          className="text-white text-xs text-center transition-all duration-300 ease hover:underline underline-offset-2"
        >
          Click to view
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
