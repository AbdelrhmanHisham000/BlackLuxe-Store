import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";
import { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // for middleware
  callbacks: {
    // return true or false , auth = current session
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        // To Solve Typescript Error
        if (!user.email || !user.name) {
          console.error("Missing user email or name during sign-in.");
          return false;
        }
        const existingUser = await getUser(user.email!);
        if (!existingUser)
          await createUser({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const customer = await getUser(session.user.email);
      session.user.userId = customer.id;
      session.user.role = customer.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
