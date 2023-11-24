import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user.role !== "admin") {
    return <div>Access Denied</div>;
  }
  return <div>Admin Page</div>;
};

export default Page;
