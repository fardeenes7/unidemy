import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateCourseButton from "./create-course-button";
import CreateCourseModal from "./modal/create-course";
import Link from "next/link";

export default async function OverviewCoursesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const courses = await prisma.course.count({
    where: {
      userId: session.user.id as string,
    },
  });

  return courses > 0 ? (
    <Link
      href="/courses"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Courses
    </Link>
  ) : (
    <CreateCourseButton>
      <CreateCourseModal />
    </CreateCourseButton>
  );
}
