"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { LoadingDots, Youtube } from "@/components/shared/icons";

export default function NotAuthorized() {
  const [signInClicked, setSignInClicked] = useState(false);
  return (
    <div className>
      <main className="z-10 flex h-screen w-full flex-col items-center justify-center bg-gray-50">
        <div className="rounded-xl border  bg-white shadow">
          <div className="mx-auto max-w-xl p-16 sm:p-24">
            <div className="text-center">
              <Link href="/" className="flex items-center justify-center">
                <Image src="/logo.svg" alt="Unidemy" width={30} height={30} />
                <h1 className="ml-4 font-display text-3xl">Unidemy</h1>
              </Link>
              <h2
                className="mx-auto max-w-lg animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-2xl md:leading-[5rem]"
                style={{
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
              >
                Sign in with admin account.
              </h2>
              <p
                className="animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-lg"
                style={{
                  animationDelay: "0.25s",
                  animationFillMode: "forwards",
                }}
              >
                This page is only accessible to admin accounts.
              </p>
              <button
                disabled={signInClicked}
                className={`${
                  signInClicked
                    ? "cursor-not-allowed border-gray-200 bg-gray-100"
                    : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                } mt-8 flex h-10 w-full animate-fade-up items-center justify-center space-x-3 rounded-md border text-sm opacity-0 shadow-sm transition-all duration-75 focus:outline-none`}
                style={{
                  animationDelay: "0.35s",
                  animationFillMode: "forwards",
                }}
                onClick={() => {
                  setSignInClicked(true);
                  signIn(
                    "google",
                    {},
                    {
                      scope:
                        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube",
                    },
                  );
                }}
              >
                {signInClicked ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <>
                    <Youtube className="h-5 w-5" />
                    <p>Sign In with Youtube</p>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
