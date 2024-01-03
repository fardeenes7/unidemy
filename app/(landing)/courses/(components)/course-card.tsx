import BlurImage from "@/components/manage/blur-image";
import { placeholderBlurhash, random } from "@/lib/manage/utils";
import { Course } from "@prisma/client";
import { BarChart, ExternalLink, Star, Radio, Video } from "lucide-react";
import Link from "next/link";

export default function CourseCard({ data }: { data: Course }) {
  const url = `${data.slug}`;
  return (
    <div
      className={`relative rounded-lg border border-stone-200 transition-all hover:shadow-xl dark:border-stone-800 dark:hover:border-white`}
    >
      <Link
        href={`courses/${data.slug}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <BlurImage
          alt={data.title ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-44 object-cover"
          src={data.image ?? `/api/og?type=course&title=${data.title}`}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="flex flex-col space-y-2 border-t border-stone-200 p-4 dark:border-stone-700">
          <div className="text-sm">
            {data.type != "Live" ? (
              <div className="flex items-center space-x-2 ">
                <Radio className="h-5 w-5 text-red-500" />
                <span>Live Class</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-red-500" />
                <span>Recorded</span>
              </div>
            )}
          </div>

          <h3 className="my-0 truncate font-display text-xl font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className=" line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
          <div className="mt-auto">
            <div className="mt-2 flex items-center space-x-1 text-sm  ">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{data.averageRating}</span>{" "}
              <span className="text-stone-500">
                ({data.totalRatings} Reviews)
              </span>
            </div>
            <div className="mt-2">
              {data.price == null || data.price === 0 ? (
                <span>FREE</span>
              ) : data.discountedPrice && data.discountedPrice < data.price! ? (
                <div>
                  <span className="mr-2 text-xs text-stone-500 line-through">
                    ৳{data.price}
                  </span>
                  <span>৳{data.discountedPrice}</span>
                </div>
              ) : (
                <div>
                  <span>৳{data.price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
