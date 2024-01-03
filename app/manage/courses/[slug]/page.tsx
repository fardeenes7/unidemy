import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Lessons from "@/components/manage/lessons";
import CreateLessonButton from "@/components/manage/create-lesson-button";
import { DataTable } from "../../../../components/manage/data-table";
import Form from "@/components/manage/form/miniform";
import { updateCourse } from "@/lib/manage/actions";
import CourseImageForm from "@/components/manage/form/courseImageForm";

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 lg:col-span-2">
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <h1 className="w-60 truncate font-display text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
              {data.title}
            </h1>
          </div>
          <CreateLessonButton />
        </div>
        {/* left column */}
        <div className="flex flex-col space-y-4">
          <Form
            title="Course Title"
            description="The title of your course. This will be used as the meta title on Google as well."
            helpText="Please use 32 characters maximum."
            inputAttrs={{
              name: "title",
              type: "text",
              defaultValue: data?.title!,
              placeholder: "My Awesome Course",
              maxLength: 32,
            }}
            handleSubmit={updateCourse}
          />
          <Form
            title="Description"
            description="The Description of your course. This will be used as the meta description on Google as well."
            helpText="Please use 150 characters maximum."
            inputAttrs={{
              name: "description",
              type: "text",
              defaultValue: data?.description!,
              placeholder: "Write why your course is awesome.",
              maxLength: 150,
            }}
            handleSubmit={updateCourse}
          />
          <Form
            title="Category"
            description="The category of your course. This will be used as the meta description on Google as well."
            helpText="Select a category."
            inputAttrs={{
              name: "category",
              type: "text",
              defaultValue: data?.categoryId!,
              placeholder: "Select course category.",
              maxLength: 150,
            }}
            handleSubmit={updateCourse}
          />
          <Form
            title="Price"
            description="The price of your course."
            helpText="This is the base price users will see"
            inputAttrs={{
              name: "price",
              type: "number",
              defaultValue: "" + data?.price!,
              placeholder: "1000",
              maxLength: 150,
            }}
            handleSubmit={updateCourse}
          />
          <Form
            title="Discounted Price"
            description="The discounted price of your course."
            helpText="This is the price users will buy the course at."
            inputAttrs={{
              name: "discountedPrice",
              type: "number",
              defaultValue: "" + data?.discountedPrice!,
              placeholder: "1000",
              maxLength: 150,
            }}
            handleSubmit={updateCourse}
          />
          <Form
            title="Course type"
            description="Course type can't be edited"
            helpText=""
            inputAttrs={{
              name: "type",
              type: "text",
              defaultValue: "" + data?.type!,
              placeholder: "1000",
              maxLength: 150,
            }}
            handleSubmit={updateCourse}
          />
        </div>
        {/* right column */}
        <div className="flex flex-col space-y-4">
          <CourseImageForm
            title="Course Banner"
            description="The banner of your course. This will be used as the meta image on Google as well."
            helpText="Please upload jpeg or png only."
            inputAttrs={{
              name: "image",
              type: "image",
              defaultValue: data?.image!,
              placeholder: "My Awesome Course",
              maxLength: 32,
            }}
            handleSubmit={updateCourse}
            endpoint="courseImage"
          />
        </div>
      </div>
    </>
  );
}
