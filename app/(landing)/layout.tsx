import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";

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
      <Nav />
      <div className="fixed z-0 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="z-10 flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
