import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, calSans } from "../fonts";
// import Nav from "@/components/layout/nav";
import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback="...">
        <Nav />
      </Suspense>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
