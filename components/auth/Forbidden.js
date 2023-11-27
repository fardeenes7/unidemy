import Nav from "@/components/landing/nav";
import Footer from "@/components/landing/footer";
import ForbiddenLogin from "./ForbiddenLogin";

export default function NotAuthorized() {
  return (
    <>
      <Nav />
      <div className="fixed z-0 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="z-10 flex w-full flex-col items-center justify-center py-32">
        <div className="bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl py-16 sm:py-24">
              <div className="text-center">
                <h1
                  className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
                  style={{
                    animationDelay: "0.15s",
                    animationFillMode: "forwards",
                  }}
                >
                  403: Forbidden
                </h1>
                <p
                  className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
                  style={{
                    animationDelay: "0.25s",
                    animationFillMode: "forwards",
                  }}
                >
                  You do not have permission to access this page.
                </p>
                <ForbiddenLogin />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
