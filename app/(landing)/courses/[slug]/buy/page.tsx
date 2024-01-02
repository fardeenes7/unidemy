import prisma from "@/lib/prisma";
export default async function PayCourse({
  params,
}: {
  params: { slug: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      lessons: false,
    },
  });
  return <section>Buy Course {course?.title}</section>;
}
