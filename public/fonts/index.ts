import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const calSans = localFont({
  src: "./CalSans-SemiBold.ttf",
  display: "swap",
  variable: "--font-calsans",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
