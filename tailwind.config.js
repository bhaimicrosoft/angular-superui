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
    },
  },
  plugins: [],
};
