import BlurImage from "@/components/manage/blur-image";
import { placeholderBlurhash, random } from "@/lib/manage/utils";
import { Lesson, Course } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function LessonCard({
  data,
}: {
  data: Lesson & { course: Course | null };
}) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/manage/courses/${data.course?.slug}/${data.id}`;

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link href={url} className="flex flex-col overflow-hidden rounded-lg">
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full object-cover"
            src={
              data.image ??
              `/api/og?type=course&title=${data.title ?? "Untitled Lesson"}`
            }
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
        </div>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-display text-xl font-bold tracking-wide dark:text-white">
            {data.title ?? "Untitled lesson"}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description ?? "No description"}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full px-4">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `localhost:3000/course/${data.course?.slug}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          Course: {data.course?.title} ↗
        </a>
      </div>
    </div>
  );
}
