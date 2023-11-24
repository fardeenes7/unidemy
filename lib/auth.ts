import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      role: string;
    };
  } | null>;
}

export function withCourseAuth(action: any) {
  return async (
    formData: FormData | null,
    courseSlug: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const course = await prisma.course.findUnique({
      where: {
        slug: courseSlug,
      },
    });
    if (!course || course.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, course, key);
  };
}

export function withLessonAuth(action: any) {
  return async (
    formData: FormData | null,
    lessonId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        course: true,
      },
    });
    if (!lesson || lesson.userId !== session.user.id) {
      return {
        error: "Lesson not found",
      };
    }

    return action(formData, lesson, key);
  };
}
