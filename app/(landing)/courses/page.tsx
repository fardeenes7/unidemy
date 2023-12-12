import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import prisma from "@/lib/prisma";
import CourseCard from "@/components/manage/course-card";
import PageHeading from "@/components/landing/pageHeading";

export default async function Home() {
  const courses = await prisma.course.findMany({
    where: {
      status: "Draft",
    },
    include: {
      lessons: false,
    },
  });
  return (
    <>
      <PageHeading title="Courses We Offer" />
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4 xl:px-0">
        {courses.map((course) => (
          <CourseCard key={course.id} data={course} landing={true} />
        ))}
      </div>
    </>
  );
}
