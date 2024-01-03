import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CourseSettingsNav from "./nav";

export default async function CourseAnalyticsLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
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

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `courses/${data.slug}`;

  return (
    <>
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-display text-xl font-bold dark:text-white sm:text-3xl">
          Settings for {data.title}
        </h1>
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${process.env.NEXT_PUBLIC_APP_URL}/${url}`
              : `http://localhost:3000/${url}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a>
      </div>
      <CourseSettingsNav />
      {children}
    </>
  );
}
