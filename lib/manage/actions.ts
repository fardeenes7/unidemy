"use server";

import prisma from "@/lib/prisma";
import { Lesson, Course } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withCourseAuth, withLessonAuth } from "../auth";
import { getSession } from "@/lib/auth";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/manage/utils";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

const getAccessToken = async () => {
  const session = await getSession();
  if (!session?.user.id || !session?.accessToken) {
    return {
      error: "Not authenticated",
    };
  }
  return session.accessToken;
};

const createPlaylist = async (name: string, description: string) => {
  const url = `${process.env.YOUTUBE_API_URL}/playlists?part=snippet%2Cstatus&key=${process.env.YOUTUBE_DATA_API}`;
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      snippet: {
        title: name,
        description: description,
      },
      status: {
        privacyStatus: "private",
      },
    }),
  });
  const data = await response.json();
  return data.id;
};

const deletePlaylist = async (playlistId: string, accessToken: string) => {
  const url = `${process.env.YOUTUBE_API_URL}/playlists?id=${playlistId}&key=${process.env.YOUTUBE_DATA_API}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getPlaylistList = async () => {
  const url = `${process.env.YOUTUBE_API_URL}/playlists?part=snippet%2CcontentDetails&channelId=${process.env.YOUTUBE_CHANNEL_ID}&maxResults=25&key=${process.env.YOUTUBE_DATA_API}`;
  const response = await fetch(url, {});
  const data = await response.json();
  console.log("data: ", data);
};

export const createCourse = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  // const playlistId = formData.get("playlistId") as string;
  const playlistId = await createPlaylist(name, description);
  if (!playlistId) {
    return {
      error: "Error creating playlist",
    };
  }

  try {
    const response = await prisma.course.create({
      data: {
        name,
        description,
        slug,
        playlistId: playlistId,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-metadata`);
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This slug is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateCourse = withCourseAuth(
  async (formData: FormData, course: Course, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await prisma.course.update({
          where: {
            id: course.id,
          },
          data: {
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else {
        response = await prisma.course.update({
          where: {
            id: course.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      console.log(
        "Updated course data! Revalidating tags: ",
        `${process.env.NEXT_PUBLIC_APP_URL}-metadata`,
      );
      await revalidateTag(
        `${course.slug}.${process.env.NEXT_PUBLIC_APP_URL}-metadata`,
      );
      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteCourse = withCourseAuth(
  async (_: FormData, course: Course) => {
    try {
      const response = await prisma.course.delete({
        where: {
          id: course.id,
        },
      });
      await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-metadata`);

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const getCourseFromLessonId = async (lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      courseId: true,
    },
  });
  return lesson?.courseId;
};

export const createLesson = withCourseAuth(
  async (_: FormData, course: Course) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    console.log("Creating lesson for course: ", course.id);
    const response = await prisma.lesson.create({
      data: {
        courseId: course.id,
        userId: session.user.id,
      },
    });

    await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-lessons`);

    return response;
  },
);

export const createPost = withCourseAuth(
  async (_: FormData, course: Course) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const response = await prisma.lesson.create({
      data: {
        courseId: course.id,
        userId: session.user.id,
      },
    });

    return response;
  },
);

// creating a separate function for this because we're not using FormData
export const updateLesson = async (data: Lesson) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: data.id,
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
  try {
    const response = await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });

    await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-lessons`);
    await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-${lesson.slug}`);

    // if the course has a custom domain, we need to revalidate those tags too

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateLessonMetadata = withLessonAuth(
  async (
    formData: FormData,
    lesson: Lesson & {
      course: Course;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.lesson.update({
          where: {
            id: lesson.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.lesson.update({
          where: {
            id: lesson.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-lessons`);
      await revalidateTag(`${process.env.NEXT_PUBLIC_APP_URL}-${lesson.slug}`);

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteLesson = withLessonAuth(
  async (_: FormData, lesson: Lesson) => {
    try {
      const response = await prisma.lesson.delete({
        where: {
          id: lesson.id,
        },
        select: {
          courseId: true,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
