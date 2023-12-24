import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
// import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

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
    }),
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
    async jwt({ token, user, account }) {
      if (user) {
        let userRole = "user";
        if (
          user.email === "fardeen.es7@gmail.com" ||
          user.email === "bilboyz-7352@pages.plusgoogle.com"
        ) {
          userRole = "admin";
          user.role = userRole;
        }

        token.role = userRole;
        token.id = user.id;
      }
      if (account?.access_token) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
      }

      return token;
    },
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role

    // If you want to use the role in client components
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.accessToken = token.access_token;
        session.idToken = token.id_token;
      }
      return session;
    },
    // async signIn({ user, account, profile }) {
    //   if (user) {
    //     let userRole = "user";
    //     if (user.email === "fardeen.es7@gmail.com") {
    //       userRole = "admin";
    //       user.role = userRole;
    //     }
    //   }
    //   if (user.role === "admin" && account?.provider === "google") {
    //     console.log("Admin signing in with Google");
    //     // Redirect for additional scope
    //     const redirectUrl = `/api/admin-scope`;
    //     return redirectUrl;
    //   }
    //   return true;
    // },
  },
};
