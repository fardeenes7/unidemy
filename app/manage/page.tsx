import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="font-display text-3xl">Welcome, {session?.user?.name}</h1>
    </div>
  );
};

export default Page;
