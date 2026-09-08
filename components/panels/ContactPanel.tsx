"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Social, about, socials } from "@/lib/constants";
import VimTypedDoc, { VimLine } from "../editor/VimTypedDoc";

interface Props {
  instant?: boolean;
  onDone?: () => void;
}

const ClickableValue = ({ social }: { social: Social }) => {
  const external = social.link.startsWith("http");
  return (
    <motion.a
      href={social.link}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="group relative inline-flex items-center gap-1 text-ed-green outline-none transition-colors hover:text-ed-cyan"
    >
      <span>&quot;{social.username}&quot;</span>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="text-[9px] opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
      <span className="pointer-events-none absolute -bottom-[1px] left-0 right-0 border-b border-dashed border-ed-green/40 group-hover:opacity-0" />
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-[1px] left-0 right-0 origin-left border-b border-ed-cyan opacity-0 group-hover:opacity-100"
      />
    </motion.a>
  );
};

const ContactPanel = ({ instant, onDone }: Props) => {
  const lines = useMemo<VimLine[]>(() => {
    const out: VimLine[] = [
      { text: "{", render: () => <span className="text-ed-muted">{"{"}</span> },
      {
        text: `  "name": "Mateusz Laskowski",`,
        render: () => (
          <span className="text-ed-muted">
            {"  "}
            <span className="text-ed-cyan">&quot;name&quot;</span>:{" "}
            <span className="text-ed-green">&quot;Mateusz Laskowski&quot;</span>,
          </span>
        ),
      },
      {
        text: `  "location": "${about.location}",`,
        render: () => (
          <span className="text-ed-muted">
            {"  "}
            <span className="text-ed-cyan">&quot;location&quot;</span>:{" "}
            <span className="text-ed-green">&quot;{about.location}&quot;</span>,
          </span>
        ),
      },
      ...socials.map((s, i) => ({
        text: `  "${s.name.toLowerCase()}": "${s.username}"${
          i < socials.length - 1 ? "," : ""
        }`,
        render: () => (
          <span className="text-ed-muted">
            {"  "}
            <span className="text-ed-cyan">&quot;{s.name.toLowerCase()}&quot;</span>:{" "}
            <ClickableValue social={s} />
            {i < socials.length - 1 ? "," : ""}
          </span>
        ),
      })),
      { text: "}", render: () => <span className="text-ed-muted">{"}"}</span> },
    ];
    return out;
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
      <h1 className="pl-[3.25rem] text-2xl font-bold text-ed-fg">contact.json</h1>
      <p className="mt-1 pl-[3.25rem] text-[13px] text-ed-muted">
        <span className="text-ed-cyan">→</span> every value is a link — click to
        open ↗
      </p>

      <div className="mt-6">
        <VimTypedDoc
          path="contact.json"
          lines={lines}
          instant={instant}
          onDone={onDone}
        />
      </div>
    </div>
  );
};

export default ContactPanel;
