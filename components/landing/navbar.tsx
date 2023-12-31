"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "../auth/LoginModal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import Nav from "./nav/nav";
import { Suspense } from "react";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-40 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <div className="flex items-center justify-start gap-6">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.svg"
                alt="logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
              <p>unidemy</p>
            </Link>
            <Nav />
          </div>
          <Suspense fallback="Loading...">
            <div>
              {session ? (
                <UserDropdown session={session} />
              ) : (
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </button>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}
