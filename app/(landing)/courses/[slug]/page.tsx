import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import prisma from "@/lib/prisma";
import CourseCard from "@/components/manage/course-card";

export default async function CourseDetail({
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
  return (
    <>
      <div className="z-10 w-full max-w-2xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {course?.title}
        </h1>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4 xl:px-0"></div>
    </>
  );
}
