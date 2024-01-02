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

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
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
}) {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();
  const { update } = useSession();
  const [editMode, setEditMode] = useState(false);
  const cancelAction = () => {
    setEditMode(false);
    router.refresh();
  };
  return (
    <form
      action={async (data: FormData) => {
        handleSubmit(data, slug, inputAttrs.name).then(async (res: any) => {
          setEditMode(false);
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Updated ${inputAttrs.name}`, slug ? { slug } : {});
            if (slug) {
              router.refresh();
            } else {
              await update();
              router.refresh();
            }
            toast.success(`Successfully updated ${inputAttrs.name}!`);
          }
        });
      }}
      className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl dark:text-white">{title}</h2>
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
        {editMode && (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {description}
          </p>
        )}

        {inputAttrs.name === "image" || inputAttrs.name === "logo" ? (
          <Uploader
            defaultValue={inputAttrs.defaultValue}
            name={inputAttrs.name}
            editMode={editMode}
          />
        ) : inputAttrs.name === "font" ? (
          <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-600">
            <select
              name="font"
              defaultValue={inputAttrs.defaultValue}
              className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white"
            >
              <option value="font-display">Cal Sans</option>
              <option value="font-lora">Lora</option>
              <option value="font-work">Work Sans</option>
            </select>
          </div>
        ) : editMode ? (
          inputAttrs.name === "description" ? (
            <textarea
              {...inputAttrs}
              rows={3}
              required
              className="w-full max-w-xl rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          ) : inputAttrs.type === "number" ? (
            <input
              {...inputAttrs}
              required
              pattern="[0-9]*"
              min={0}
              className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          ) : (
            <input
              {...inputAttrs}
              required
              className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          )
        ) : (
          <p className="text-md font-bold text-stone-500 dark:text-stone-400">
            {inputAttrs.defaultValue ?? "N/A"}
          </p>
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
