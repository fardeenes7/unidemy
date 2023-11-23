import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: string;
    };
    role: string;
  }

  interface User {
    id: string;
    role: string;
  }
}
