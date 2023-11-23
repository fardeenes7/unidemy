import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   profile(profile) {
    //     return {
    //       ...profile,
    //       id: profile.sub,
    //       role: "user",
    //     };
    //   },
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    GithubProvider({
      profile(profile) {
        let userRole = "user";
        if (profile?.email === "fardeen.es7@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        return token;
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);

// export default handler;

export { handler as GET, handler as POST };
