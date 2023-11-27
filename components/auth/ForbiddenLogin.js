"use client";
import { useSignInModal } from "./LoginModal";
export default function NotAuthorizedLogin() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
      <SignInModal />
      <button
        className=" mt-8 animate-fade-up rounded-full bg-black px-4 py-2 text-center text-sm font-bold text-white opacity-0 [text-wrap:balance]"
        style={{
          animationDelay: "0.35s",
          animationFillMode: "forwards",
        }}
        onClick={() => setShowSignInModal(true)}
      >
        Sign In With Admin Account
      </button>
    </>
  );
}
