import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import { replaceTweets } from "@/lib/manage/remark-plugins";

export async function getCourseData(slug: string) {
  return await unstable_cache(async () => {
    return prisma.course.findUnique({
      where: slug ? { slug } : { slug: slug },
    });
  })();
}

export async function getLessonsForCourse(domain: string) {
  const slug = domain.endsWith(`.${process.env.NEXT_PUBLIC_APP_URL}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_APP_URL}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.lesson.findMany({
        where: {
          course: slug ? { slug } : { slug: slug },
          published: true,
        },
        select: {
          title: true,
          description: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-lessons`],
    {
      revalidate: 900,
      tags: [`${domain}-lessons`],
    },
  )();
}

// export async function getLessonData(id: number) {
//   return await unstable_cache(async () => {
//     const data = await prisma.lesson.findFirst({
//       where: {
//         id: id,
//         published: true,
//       },
//       include: {
//         course: {
//           include: {},
//         },
//       },
//     });

//     if (!data) return null;

//     const [mdxSource, adjacentLessons] = await Promise.all([
//       getMdxSource(data.content!),
//       prisma.lesson.findMany({
//         where: {
//           course: slug ? { slug } : { slug: slug },
//           published: true,
//           NOT: {
//             id: data.id,
//           },
//         },
//         select: {
//           slug: true,
//           title: true,
//           createdAt: true,
//           description: true,
//           image: true,
//           imageBlurhash: true,
//         },
//       }),
//     ]);

//     return {
//       ...data,
//       mdxSource,
//       adjacentLessons,
//     };
//   })();
// }

async function getMdxSource(lessonContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    lessonContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    // mdxOptions: {
    //   remarkPlugins: [replaceTweets, () => replaceExamples(prisma)],
    // },
  });

  return mdxSource;
}
