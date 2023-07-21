const { prisma } = require("@/lib/prisma");
import { hash, compare } from "bcryptjs";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if user exists
        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          // User doesn't exist, so we create a new user
          const hashedPassword = await hash(credentials.password, 12);

          user = await prisma.user.create({
            data: {
              email: credentials.email,
              hashedPassword,
              // include other data as necessary
            },
          });
        } else if (!(await compare(credentials.password, user.hashedPassword))) {
          // User exists, but provided password is incorrect
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          randomKey: user.randomKey,
        };
      }
      return token;
    },
  },
}

module.exports = {
  authOptions,
};
