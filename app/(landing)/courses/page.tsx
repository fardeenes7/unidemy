import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import prisma from "@/lib/prisma";
import CourseCard from "@/app/(landing)/courses/(components)/course-card";
import PageHeading from "@/components/landing/pageHeading";

const calculateAverageRating = async () => {
  const courses = await prisma.course.findMany({
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  const coursesWithAvgRating = courses.map((course) => {
    const totalRatings = course.reviews.length;
    const totalRatingSum = course.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

    return {
      ...course,
      totalRatings,
      averageRating,
    };
  });

  return coursesWithAvgRating;
};

export default async function Home() {
  // const courses = await prisma.course.findMany({
  //   where: {
  //     status: "Draft",
  //   },
  //   include: {
  //     reviews: {
  //       select: {
  //         rating: true,
  //       },
  //     },
  //   },
  // });
  const courses = await calculateAverageRating();
  console.log(courses);
  return (
    <>
      <PageHeading title="Courses We Offer" />
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4 xl:px-0">
        {courses.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
}
