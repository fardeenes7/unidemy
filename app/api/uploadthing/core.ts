import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "@/lib/auth";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const handleAuth = async () => {
  const session = await getSession();
  if (!session?.user.id) {
    throw new Error("Not authenticated");
  }
  return { userId: session.user.id };
};

// FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     // Set permissions and file types for this FileRoute
//     .middleware(async ({ req }) => {
//       // This code runs on your server before upload
//       const user = await auth(req);

//       // If you throw, the user will not be able to upload
//       if (!user) throw new Error("Unauthorized");

//       // Whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { userId: user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // This code RUNS ON YOUR SERVER after upload
//       console.log("Upload complete for userId:", metadata.userId);

//       console.log("file url", file.url);

//       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//       return { uploadedBy: metadata.userId, url: file.url };
//     }),
// } satisfies FileRouter;

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  lectureAttachment: f(["image", "text", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
