"use client";

import { toast } from "sonner";
import { createCourse } from "@/lib/manage/actions";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/manage/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import { getPlaylistList } from "@/lib/manage/actions";

export default function CreateCourseModal() {
  const router = useRouter();
  const modal = useModal();
  const playlistList = getPlaylistList();

  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    playlistId: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      slug: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  return (
    <form
      action={async (data: FormData) =>
        createCourse(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Created Course");
            const { slug } = res;
            router.refresh();
            router.push(`/manage/courses/${slug}`);
            modal?.hide();
            toast.success(`Successfully created course!`);
          }
        })
      }
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-display text-2xl dark:text-white">
          Create a new course
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Course Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Awesome Course"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-stone-500">
            Slug
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="slug"
              type="text"
              placeholder="slug"
              value={data.slug}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        </div>
        {/* <div className="flex flex-col space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-stone-500">
            Youtube Playlist ID{" "}
            <a
              href="https://studio.youtube.com/channel/UCbFuqIt1YTKCeRh5bkrRO9g"
              target="_blank"
              className="ml-2 rounded-lg border bg-stone-100 px-3 py-1 text-xs font-bold"
            >
              Channel<span>↗</span>
            </a>
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="plyalistId"
              type="text"
              placeholder="Playlist Id"
              autoCapitalize="off"
              maxLength={32}
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        </div> */}

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about why my course is so awesome"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateCourseFormButton />
      </div>
    </form>
  );
}
function CreateCourseFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Create Course</p>}
    </button>
  );
}
