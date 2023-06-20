import { prisma } from "@/lib/prismadb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedpassword) {
          throw new Error("No user found");
        }
        const isValidCredentials = await compare(
          credentials.password,
          user.hashedpassword
        );

        if (!isValidCredentials) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // adapter: PrismaAdapter(prisma),
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("jwt token", token);
  //     console.log("jwt user", user);

  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  //   async session({ session, user, token }) {
  //     console.log("session token", token);
  //     console.log("session user", user);
  //     session.user = user;
  //     // session.accessToken = token.accessToken;

  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
