import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {/* <div className="fixed z-0 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" /> */}
      <main className="flex w-full flex-col items-center justify-center pb-32 pt-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
