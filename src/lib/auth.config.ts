import type { NextAuthConfig } from "next-auth";

export const nextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      if (user) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
        token.email = user.email!;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.hasAccess = token.hasAccess as boolean;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
