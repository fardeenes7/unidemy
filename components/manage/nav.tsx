"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  Github,
  LibraryBig,
  Users,
  Library,
  CreditCard,
  Fingerprint,
  Frame,
  User,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getCourseFromLessonId } from "@/lib/manage/actions";
import Image from "next/image";

const externalLinks = [
  {
    name: "Read announcement",
    href: "https://vercel.com/blog/platforms-starter-kit",
    icon: <Megaphone width={18} />,
  },
  {
    name: "Go to GitHub",
    href: "https://github.com/fardeenes7/unidemy",
    icon: <Github width={18} />,
  },
  {
    name: "Read the docs",
    href: "/docs",
    icon: <FileCode width={18} />,
  },
  {
    name: "Go to user Dashboard",
    href: "https://demo.vercel.pub",
    icon: <Layout width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { slug } = useParams() as { slug?: string };

  const [courseId, setCourseId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "lesson" && slug) {
      getCourseFromLessonId(parseInt(slug)).then((id) => {
        setCourseId(id);
      });
    }
  }, [segments, slug]);

  const tabs = useMemo(() => {
    if (segments[0] === "courses" && slug) {
      return [
        {
          name: "Back to All Courses",
          href: "/manage/courses",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Overview",
          href: `/manage/courses/${slug}`,
          isActive: segments.length === 2,
          icon: <Newspaper width={18} />,
        },
        {
          name: "Lessons",
          href: `/manage/courses/${slug}/lessons`,
          isActive: segments.includes("lessons"),
          icon: <Library width={18} />,
        },

        {
          name: "Analytics",
          href: `/manage/courses/${slug}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/manage/courses/${slug}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "settings") {
      return [
        {
          name: "Back to Dashboard",
          href: "/manage",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "General",
          href: `/manage/settings`,
          isActive: segments.length === 1,
          icon: <Settings width={18} />,
        },
        {
          name: "Teacher",
          href: `/manage/settings/teacher`,
          isActive: segments.includes("teacher"),
          icon: <User width={18} />,
        },
      ];
    } else if (segments[0] === "lesson" && slug) {
      return [
        {
          name: "Back to All Lessons",
          href: courseId ? `/course/${courseId}` : "/courses",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/lesson/${slug}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/lesson/${slug}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: "/manage",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Courses",
        href: "/manage/courses",
        isActive: segments[0] === "courses",
        icon: <LibraryBig width={18} />,
      },
      {
        name: "NID Api",
        href: "/manage/nid",
        isActive: segments[0] === "nid",
        icon: <Fingerprint width={18} />,
      },
      {
        name: "UniPay",
        href: "/manage/unipay",
        isActive: segments[0] === "unipay",
        icon: <CreditCard width={18} />,
      },

      {
        name: "Users",
        href: "/manage/users",
        isActive: segments[0] === "users",
        icon: <Users width={18} />,
      },

      {
        name: "Settings",
        href: "/manage/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, slug, courseId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "lesson" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <a
              href="https://fardiin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              {/* <svg
                width="26"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black dark:text-white"
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg> */}
              <Image
                src="https://fardiin.com/logo.svg"
                alt="fardiin.com"
                width={24}
                height={24}
              />
            </a>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src="/logo.svg"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
