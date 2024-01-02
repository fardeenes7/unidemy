import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

const ifComplete = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const teacher = await prisma.teacher.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (!teacher || (!teacher.bio && !teacher.image)) {
    return false;
  }

  return true;
};

export default async function TeacherAlert() {
  const complete = await ifComplete();
  if (complete) {
    return null;
  }
  return (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="font-display">
        Teacher Profile Incomplete
      </AlertTitle>
      <AlertDescription>
        <Link
          href="/manage/settings/teacher"
          className="font-bold hover:underline"
        >
          Click here
        </Link>{" "}
        to Complete your teacher profile to start creating courses.
      </AlertDescription>
    </Alert>
  );
}
