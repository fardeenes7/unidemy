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
      <Form
        title="Playlist Id"
        description="The ID of the corresponding YouTube playlist."
        helpText="Use a valid YouTube playlist ID."
        inputAttrs={{
          name: "playlistId",
          type: "text",
          defaultValue: data?.playlistId!,
          placeholder: "PL1lNrW4e0JXZLzQv4JL1ZlqZz3jJXKz5x",
        }}
        handleSubmit={updateCourse}
      />

      <DeleteCourseForm courseName={data?.name!} />
    </div>
  );
}
