import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1CA8CB",
        primary_light: "#E9F6F9",
        secondary: "#113D48",
        text_gray: "#666666",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(194,106,245,1) 0%, rgba(84,240,255,1) 100%)",
          "shipping-banner":"url(/assets/Images/h3_b1.jpg)",
          "login-banner":"url(/assets/Images/loginBanner.jpg)"
      },
    },
  },
  plugins: [],
};
export default config;
