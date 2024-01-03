"use client";

import LoadingDots from "@/components/manage/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "sonner";
import Uploader from "./uploader";
import va from "@vercel/analytics";
import { Facebook, Instagram, Dribbble, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { updateTeacher } from "@/lib/manage/actions";
import prisma from "@/lib/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sites = [
  {
    name: "Facebook",
    icon: <Facebook width={18} height={18} className="mr-2 inline" />,
  },
  {
    name: "Instagram",
    icon: <Instagram width={18} height={18} className="mr-2 inline" />,
  },
  {
    name: "Dribbble",
    icon: <Dribbble width={18} height={18} className="mr-2 inline" />,
  },
  {
    name: "Twitter",
    icon: <Twitter width={18} height={18} className="mr-2 inline" />,
  },
  {
    name: "Linkedin",
    icon: <Linkedin width={18} height={18} className="mr-2 inline" />,
  },
];

export default function SocialLinkForm() {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();
  const { update } = useSession();
  const [media, setMedia] = useState("");
  const [link, setLink] = useState("");
  return (
    <form
      action={async (FormData) => {
        updateTeacher(FormData, null, `social-${media}`).then(
          async (res: any) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              va.track(`Updated Social Links`, slug ? { slug } : {});
              if (slug) {
                router.refresh();
              } else {
                await update();
                router.refresh();
              }
              toast.success(`Successfully updated Social Links`);
            }
          },
        );
      }}
      className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-display text-xl dark:text-white">Social Links</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Add your social links here.
        </p>
        <div className="flex space-x-2">
          <Select onValueChange={(value) => setMedia(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Social Media" />
            </SelectTrigger>
            <SelectContent>
              {sites.map(({ name, icon }) => (
                <SelectItem key={name} value={name} className="items-center justify-start">
                  {icon}
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            name={media}
            required
            placeholder="https://"
            className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Include Full Link
        </p>
        <FormButton />
      </div>
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
