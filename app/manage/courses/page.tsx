import { Suspense } from "react";
import Courses from "@/components/manage/courses";
import PlaceholderCard from "@/components/manage/placeholder-card";
import CreateCourseButton from "@/components/manage/create-course-button";
import CreateCourseModal from "@/components/manage/modal/create-course";

export default function AllCourses({ params }: { params: { id: string } }) {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold dark:text-white">
            All Courses
          </h1>
          <CreateCourseButton>
            <CreateCourseModal />
          </CreateCourseButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <Courses courseId={decodeURIComponent(params.id)} />
        </Suspense>
      </div>
    </div>
  );
}
