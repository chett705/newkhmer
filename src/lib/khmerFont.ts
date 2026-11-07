import { Kantumruy_Pro, Battambang } from "next/font/google";

export const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kantumruy",
  display: "swap",
  preload: false,
});

export const battambang = Battambang({
  subsets: ["khmer"],
  weight: ["400", "700"],
  variable: "--font-battambang",
  display: "swap",
  preload: false,
});
