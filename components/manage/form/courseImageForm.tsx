"use client";

import LoadingDots from "@/components/manage/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "sonner";
import Uploader from "./imageForm";
import va from "@vercel/analytics";
import { useState } from "react";
import { set } from "date-fns";
import { Pencil } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

export default function CourseImageForm({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
  endpoint,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit: any;
  endpoint: any;
}) {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();
  const { update } = useSession();
  const [editMode, setEditMode] = useState(false);
  const cancelAction = () => {
    setEditMode(false);
    router.refresh();
  };
  const [data, setData] = useState(new FormData());

  return (
    <form
      action={async () => {
        handleSubmit(data, slug, "image").then(async (res: any) => {
          setEditMode(false);
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Updated course image`, slug ? { slug } : {});
            if (slug) {
              router.refresh();
            } else {
              await update();
              router.refresh();
            }
            toast.success(`Successfully updated course image!`);
          }
        });
      }}
      className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl dark:text-white">Course Image</h2>
          {!editMode && (
            <button
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-black transition-all hover:bg-white hover:text-black  focus:outline-none dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
              )}
              disabled={editMode}
              onClick={() => setEditMode(true)}
            >
              <Pencil width={15} height={15} />
              Edit {title}
            </button>
          )}
        </div>
        {editMode ? (
          <div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {description}
            </p>
            <UploadDropzone
              className="ut-button:w-full ut-label:text-slate-800 ut-button:ut-uploading:h-4"
              appearance={{
                button:
                  "bg-gray-700 ut-uploading:bg-gray-400 ut-uploading:after:bg-gray-800 text-white text-sm rounded-md ut-uploading:h-3",
              }}
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                setData((prev) => {
                  prev.set("image", res[0].url);
                  return prev;
                });
              }}
              onUploadError={(err) => {
                toast.error(err.message);
              }}
            ></UploadDropzone>
          </div>
        ) : (
          inputAttrs.defaultValue && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={inputAttrs.defaultValue as string}
              alt="Preview"
              className="aspect-video h-full w-full rounded-md border object-cover"
            />
          )
        )}
      </div>
      {editMode && (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {helpText}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => cancelAction()}
              className="flex items-center justify-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm text-black transition-all hover:bg-white hover:text-black  focus:outline-none dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
            >
              Cancel
            </button>
            <FormButton />
          </div>
        </div>
      )}
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Save Changes</p>}
    </button>
  );
}
