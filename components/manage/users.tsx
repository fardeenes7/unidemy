import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CourseCard from "../../app/(landing)/courses/(components)/course-card";
import Image from "next/image";

export default async function Users({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
    ...(limit ? { take: limit } : {}),
  });

  return users.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-display text-4xl">No Courses Yet</h1>
      <Image
        alt="missing course"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any courses yet. Create one to get started.
      </p>
    </div>
  );
}
