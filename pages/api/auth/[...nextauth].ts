/* eslint-disable new-cap */
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const options = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      id: "credentials",
      name: "Login",
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("User with email not found");
        }
        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session(session: any, token: any) {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
    async jwt(token: any, user: any) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
