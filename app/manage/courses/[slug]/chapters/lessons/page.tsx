import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/manage/analytics";
import Image from "next/image";

export default async function SiteAnalytics({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.course.findUnique({
    where: {
      slug: decodeURIComponent(params.slug),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}`;

  return (
    <>
      <div className="flex flex-col items-center justify-center sm:justify-start">
        <h1 className="font-display text-2xl">No Lesson Selected</h1>
        <Image
          alt="missing lesson"
          src="https://illustrations.popsy.co/gray/graphic-design.svg"
          width={300}
          height={300}
        />
        <p className="text-lg text-stone-500">
          Click on a lesson to view details.
        </p>
      </div>
    </>
  );
}
