import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NotAuthorized from "../../components/auth/Forbidden";
import { ReactNode, Suspense } from "react";
import Profile from "@/components/manage/profile";
import Nav from "@/components/manage/nav";
import { Providers } from "./providers";

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return <NotAuthorized />;
  }
  return (
    <Providers>
      <div>
        <Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </Nav>
        <div className="min-h-screen dark:bg-black sm:pl-60">
          <div className="p-16">{children}</div>
        </div>
      </div>
    </Providers>
  );
}
