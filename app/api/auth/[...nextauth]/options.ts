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
    GithubProvider({
      profile(profile) {
        return {
          ...profile,
          role: profile?.email === "fardeen.es7@gmail.com" ? "admin" : "user",
        };
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email }) {
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return url.startsWith(baseUrl) ? url : baseUrl;
  //   },
  //   async session({ token, session, user }) {
  //     // if (token) {
  //     //   session.user.id = token.id;
  //     //   session.user.role = token.role;
  //     //   session.user.email = token.email;
  //     //   session.user.name = token.name;
  //     //   session.user.wtf = "wtf";
  //     // }
  //     session.user.role = token.role;
  //     session.user.name = " fardeen";
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     console.log("Token", token);
  //     if (user) {
  //       token.user = {
  //         id: user?.id,
  //         email: user?.email,
  //         name: user?.name,
  //         image: user?.image,
  //         role: user?.role,
  //       };
  //       return token;
  //     }
  //     return token;
  //     // const dbUser = await prisma.user.findFirst({
  //     //   where: { email: token?.email },
  //     // });
  //     // if (!dbUser) {
  //     //   token.id = user?.id;
  //     //   token.email = user?.email;
  //     //   token.name = user?.name;
  //     //   token.image = user?.image;
  //     //   token.role = user?.role;
  //     //   return token;
  //     // }
  //     // return {
  //     //   id: dbUser?.id,
  //     //   email: dbUser?.email,
  //     //   name: dbUser?.name,
  //     //   image: dbUser?.image,
  //     //   role: dbUser?.role,
  //     // };
  //   },
  // },
};

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
