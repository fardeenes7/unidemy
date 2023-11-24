import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, calSans } from "./fonts";
import { Suspense } from "react";

export const metadata = {
  title: "Unidemy",
  description: "All in one platform for learning, teaching, and collaborating.",
  metadataBase: new URL("https://unidemy.app/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable, calSans.variable)}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
