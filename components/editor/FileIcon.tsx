import React from "react";
import Image from "next/image";

interface Props {
  ext: string;
  color: string;
  className?: string;
}

const ICON_BY_EXT: Record<string, string> = {
  MD: "/icons/markdown.svg",
  JSON: "/icons/json.svg",
  PDF: "/icons/filetype-pdf.svg",
  DIFF: "/icons/git.svg",
  GIT: "/icons/git.svg",
  RS: "/icons/rust.svg",
  GO: "/icons/go.svg",
  JAVA: "/icons/java.svg",
  PY: "/icons/python.svg",
  CS: "/icons/csharp.svg",
  CPP: "/icons/cplusplus.svg",
  TS: "/icons/typescript.svg",
  TSX: "/icons/react.svg",
  JS: "/icons/javascript.svg",
};

const FileIcon = ({ ext, color, className = "" }: Props) => {
  const icon = ICON_BY_EXT[ext.toUpperCase()];

  if (icon) {
    return (
      <span
        className={`inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center ${className}`}
      >
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-[3px] bg-ed-bg3 ${color} text-[8px] font-bold leading-none w-[18px] h-[14px] tracking-tighter ${className}`}
    >
      {ext.slice(0, 4)}
    </span>
  );
};

export default FileIcon;
