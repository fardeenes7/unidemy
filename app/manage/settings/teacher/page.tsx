import { ReactNode } from "react";
import Form from "@/components/manage/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser, updateTeacher } from "@/lib/manage/actions";
import TeacherAlert from "../../(components)/TeacherAlert";
import SocialLinkForm from "@/components/manage/form/socialLinkForm";
import prisma from "@/lib/prisma";

const getTeacher = async (session: any) => {
  const teacher = prisma.teacher.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!teacher) {
    return null;
  }
  return teacher;
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const teacher = await getTeacher(session);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 ">
      <div className="flex flex-col space-y-6">
        <h1 className="font-display text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <TeacherAlert />
        <Form
          title="Bio"
          description="Your bio for teacher profile"
          helpText="Please use 150 characters maximum."
          inputAttrs={{
            name: "bio",
            type: "text",
            defaultValue: teacher?.bio ?? "",
            placeholder: "I love teaching!",
            maxLength: 150,
          }}
          handleSubmit={updateTeacher}
        />
        <SocialLinkForm />
        <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "panic@thedis.co",
          }}
          handleSubmit={editUser}
        />
      </div>
    </div>
  );
}
