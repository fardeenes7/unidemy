import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, calSans, mono } from "../public/fonts/index";
import { Suspense } from "react";
import TopLoadingBar from "@/components/ui/toploadingbar";

export const metadata = {
  title: "Unidemy",
  description: "All in one platform for learning, teaching, and collaborating.",
  metadataBase: new URL("https://unidemy.tech/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx(
          sfPro.variable,
          inter.variable,
          calSans.variable,
          mono.variable,
          "font-sf",
        )}
      >
        <TopLoadingBar>{children}</TopLoadingBar>
        <Analytics />
      </body>
    </html>
  );
}
