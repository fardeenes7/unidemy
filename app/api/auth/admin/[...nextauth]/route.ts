import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

// export default handler;

export { handler as GET, handler as POST };
