import { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthenticatedUser } from "types/next-auth";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    GoogleProvider({
      // profile(profile) {
      //   let userRole = "user";
      //   if (profile?.email === "fardeen.es7@gmail.com") {
      //     userRole = "admin";
      //   }
      //   return {
      //     ...profile,
      //     id: profile.sub,
      //     role: userRole,
      //   };
      // },
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      // profile(profile) {
      //   let userRole = "user";
      //   if (profile?.email === "fardeen.es7@gmail.com") {
      //     userRole = "admin";
      //   }
      //   return {
      //     ...profile,
      //     role: userRole,
      //   };
      // },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("JWT Callback Accessed");
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("Session Callback Accessed");
  //     return session;
  //   },
  // },
  callbacks: {
    async signIn(user) {
      console.log("Sign In Callback Accessed");
      let account = user?.account;
      let profile = user?.profile;

      console.log(user.user);
      console.log(account);
      console.log(profile);
      if (account?.provider === "google") {
        const { access_token, id_token } = account;
        const csrfToken = getCookie("csrftoken");
        try {
          const response = await fetch(
            `${process.env.API_ROOT}/social/login/google`,
            {
              method: "POST",
              body: JSON.stringify({ access_token, id_token }),
            },
          );
          const { token } = await response.json();
          user.accessToken = token;
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    },
    async jwt(token, user: AuthenticatedUser, account, profile, isNewUser) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // If you want to use the role in client components
    async session(session, user: AuthenticatedUser) {
      session.accessToken = user.accessToken;
      return session;
    },
  },
};
