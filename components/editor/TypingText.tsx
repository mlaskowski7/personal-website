"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  text: string;
  startDelay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}

const TypingText = ({
  text,
  startDelay = 0,
  speed = 28,
  className = "",
  cursor = false,
  onDone,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const done = count >= text.length;

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      {cursor && !done && (
        <span className="inline-block w-[0.55ch] h-[1em] align-middle -mb-[1px] bg-ed-blue animate-blink ml-[1px]" />
      )}
    </span>
  );
};

export default TypingText;
