import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "16px", md: "32px", xl: "64px" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        background: "#f9f9f9",
        foreground: "#1a1c1c",
        surface: "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-variant": "#e2e2e2",
        "muted-foreground": "#5d3f3c",
        primary: { DEFAULT: "#ba0013", foreground: "#ffffff", container: "#e31e24" },
        secondary: { DEFAULT: "#1b6d24", foreground: "#ffffff", container: "#a0f399" },
        border: "#e7bdb8",
        input: "#926f6b",
        ring: "#ba0013",
        card: { DEFAULT: "#ffffff", foreground: "#1a1c1c" }
      },
      borderRadius: { DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem" },
      boxShadow: { industrial: "4px 4px 0 rgba(26, 28, 28, 0.10)", "industrial-red": "4px 4px 0 rgba(186, 0, 19, 0.15)" },
      spacing: { gutter: "24px", "stack-sm": "8px", "stack-md": "16px", "stack-lg": "32px" }
    }
  },
  plugins: [tailwindcssAnimate]
};
export default config;
