import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";
import { nextAuthConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...nextAuthConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...nextAuthConfig.providers,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordMatch = await bcryptjs.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    ...nextAuthConfig.callbacks,
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign-in
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
        token.email = user.email!;
      }
      if (trigger === "update" && token.email) {
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }
      return token;
    },
  },
});
