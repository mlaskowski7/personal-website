import type { Config } from "tailwindcss";

const withOpacity =
  (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue
      ? `rgb(var(${variable}) / ${opacityValue})`
      : `rgb(var(${variable}))`;

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // legacy tokens kept during migration
        primary: "#f4edea",
        secondary: "#c5d8d1",
        tertiary: "#06bcc1",
        "dark-primary": "#000000",
        "dark-secondary": "#14213d",
        "dark-tertiary": "#fca311",

        // editor chrome
        ed: {
          bg: withOpacity("--ed-bg"),
          bg2: withOpacity("--ed-bg2"),
          bg3: withOpacity("--ed-bg3"),
          border: withOpacity("--ed-border"),
          fg: withOpacity("--ed-fg"),
          muted: withOpacity("--ed-muted"),
          blue: withOpacity("--ed-blue"),
          purple: withOpacity("--ed-purple"),
          green: withOpacity("--ed-green"),
          orange: withOpacity("--ed-orange"),
          red: withOpacity("--ed-red"),
          yellow: withOpacity("--ed-yellow"),
          cyan: withOpacity("--ed-cyan"),
        } as any,
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "scan-line": "scan-line 6s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--ed-blue) / 0.25), 0 0 24px -4px rgb(var(--ed-blue) / 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
