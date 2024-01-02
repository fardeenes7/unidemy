import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import TeacherAlert from "./(components)/TeacherAlert";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex flex-col space-y-6">
      <section>
        <h1 className="font-display text-3xl">Welcome, {user?.name}</h1>
      </section>
      <section className="">
        <TeacherAlert />
      </section>
    </div>
  );
};

export default Page;
