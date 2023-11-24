import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Lessons from "@/components/manage/lessons";
import CreateLessonButton from "@/components/manage/create-lesson-button";
import { DataTable } from "../../../../components/manage/data-table";
import { columns } from "./columns";

export default async function SitePosts({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
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

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-display text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All lessons for {data.name}
          </h1>
        </div>
        <CreateLessonButton />
      </div>
      {/* <DataTable columns={columns} data={lessons} /> */}
      <Lessons courseId={data.id} />
    </>
  );
}
