import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
// import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { profileEnd } from "console";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          ...profile,
          role: profile.role ? profile.role : "user",
        };
      },
    }),
    GithubProvider({
      profile(profile) {
        let userRole = "user";
        if (profile?.email === "fardeen.es7@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: profile.role ? profile.role : "user",
        };
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // let userRole = "user";
        token.role = user.role;
        token.id = user.id;
      }

      //   token.role = userRole;
      //   token.id = user.id;
      // }
      // return token;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
