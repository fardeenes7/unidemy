import Link from "next/link";

import { docsConfig } from "config/docs";
import { siteConfig } from "config/site";
import { Icons } from "components/docs/icons";
import { DocsSearch } from "components/docs/search";

import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <Nav />
      <div className="flex min-h-screen w-full flex-col ">
        <div className="container flex-1 py-16">{children}</div>
      </div>
      <Footer />
    </>
  );
}

// return (
//   <>
//     <Suspense fallback="...">
//       <Nav />
//     </Suspense>
//     <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
//     <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
//       {children}
//     </main>
//     <Footer />
//   </>
// );
