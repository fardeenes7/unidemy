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
      <div className=" fixed z-0 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="z-10 flex w-full flex-col items-center justify-center py-32 font-default">
        {children}
      </main>
      <Footer />
    </>
  );
}
