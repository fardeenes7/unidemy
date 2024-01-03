import { ReactNode } from "react";
import CreateLessonButton from "@/components/manage/create-lesson-button";
import Lessons from "@/components/manage/lessons";
import prisma from "@/lib/prisma";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const data = await prisma.course.findUnique({
    where: {
      slug: decodeURIComponent(params.slug),
    },
  });

  // const lessons = await prisma.lesson.findMany({
  //   where: {
  //     courseId: data?.id,
  //   },
  // });
  // console.log(lessons);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <div className="space-4 flex flex-col gap-4 rounded-md  lg:col-span-1">
        <div className="flex items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-display text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All lessons of {data?.title}
          </h1>
          <CreateLessonButton />
        </div>
        <Lessons courseId={data!.id} />
      </div>
      <div className="flex flex-col space-y-6">{children}</div>
    </div>
  );
}
