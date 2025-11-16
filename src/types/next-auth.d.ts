import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string | null;      // from Cognito sub
    roles?: string[];
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Session {
    user: {
      id?: string | null;    
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null;      
    roles?: string[];
  }
}
