import prisma from "@/lib/prisma";
import Form from "@/components/manage/form";
import { updateCourse } from "@/lib/manage/actions";
import DeleteCourseForm from "@/components/manage/form/delete-course-form";

export default async function CourseSettingsIndex({
  params,
}: {
  params: { slug: string };
}) {
  const data = await prisma.course.findUnique({
    where: {
      slug: decodeURIComponent(params.slug),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <DeleteCourseForm courseName={data?.title!} />
    </div>
  );
}
