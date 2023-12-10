import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import LessonCard from "./lesson-card";
import LessonList from "./lesson-list";
import Image from "next/image";

export default async function Lessons({
  courseId,
  limit,
}: {
  courseId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const lessons = await prisma.lesson.findMany({
    where: {
      ...(courseId ? { courseId } : {}),
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      course: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return lessons.length > 0 ? (
    // <DataTable columns={columns} data={lessons} />
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => (
        <LessonList key={lesson.id} data={lesson} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-display text-4xl">No Lessons Yet</h1>
      <Image
        alt="missing lesson"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any lessons yet. Create one to get started.
      </p>
    </div>
  );
}
