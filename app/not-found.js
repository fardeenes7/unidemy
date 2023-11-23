import Error from "./(landing)/not-found";
import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";

export default function NotFound() {
  return (
    <>
      <Nav />

      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="flex w-full flex-col items-center justify-center py-32">
        <Error />
      </main>
      <Footer />
    </>
  );
}
