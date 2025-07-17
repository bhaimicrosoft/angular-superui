/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/**/*.{html,ts}",
    "./projects/lib/src/**/*.{html,ts}",
    "./projects/showcase/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        
        // Extended Color Palette
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },
        purple: {
          DEFAULT: "var(--purple)",
          foreground: "var(--purple-foreground)",
        },
        pink: {
          DEFAULT: "var(--pink)",
          foreground: "var(--pink-foreground)",
        },
        orange: {
          DEFAULT: "var(--orange)",
          foreground: "var(--orange-foreground)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          foreground: "var(--teal-foreground)",
        },
        indigo: {
          DEFAULT: "var(--indigo)",
          foreground: "var(--indigo-foreground)",
        },
        cyan: {
          DEFAULT: "var(--cyan)",
          foreground: "var(--cyan-foreground)",
        },
        rose: {
          DEFAULT: "var(--rose)",
          foreground: "var(--rose-foreground)",
        },
        emerald: {
          DEFAULT: "var(--emerald)",
          foreground: "var(--emerald-foreground)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          foreground: "var(--amber-foreground)",
        },
        lime: {
          DEFAULT: "var(--lime)",
          foreground: "var(--lime-foreground)",
        },
        violet: {
          DEFAULT: "var(--violet)",
          foreground: "var(--violet-foreground)",
        },
        sky: {
          DEFAULT: "var(--sky)",
          foreground: "var(--sky-foreground)",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-out-to-top": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-out-to-bottom": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        "zoom-out": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" },
        },
        "slide-in-from-left-1/2": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-left-1/2": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "slide-in-from-top-[48%]": {
          from: { transform: "translateY(-48%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-out-to-top-[48%]": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-48%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
        "slide-out-to-top": "slide-out-to-top 0.2s ease-in",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out",
        "slide-out-to-bottom": "slide-out-to-bottom 0.2s ease-in",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.2s ease-in",
        "slide-in-from-right": "slide-in-from-right 0.2s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.2s ease-in",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-in",
        "zoom-in-95": "zoom-in 0.2s ease-out",
        "zoom-out-95": "zoom-out 0.2s ease-in",
        "fade-in-0": "fade-in 0.2s ease-out",
        "fade-out-0": "fade-out 0.2s ease-in",
        "slide-in-from-left-1/2": "slide-in-from-left-1/2 0.2s ease-out",
        "slide-out-to-left-1/2": "slide-out-to-left-1/2 0.2s ease-in",
        "slide-in-from-top-[48%]": "slide-in-from-top-[48%] 0.2s ease-out",
        "slide-out-to-top-[48%]": "slide-out-to-top-[48%] 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
