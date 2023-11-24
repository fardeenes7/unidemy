import prisma from "@/lib/prisma";
import Form from "@/components/manage/form";
import { updateCourse } from "@/lib/manage/actions";
import DeleteCourseForm from "@/components/manage/form/delete-course-form";

export default async function CourseSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.course.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your course. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Course",
          maxLength: 32,
        }}
        handleSubmit={updateCourse}
      />

      <Form
        title="Description"
        description="The description of your course. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateCourse}
      />

      <DeleteCourseForm courseName={data?.name!} />
    </div>
  );
}
