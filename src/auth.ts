import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import { signInFormSchema } from "@/common/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Pasword",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        // validate credentials using zod (signInFormSchema is zod object - refer schemas.ts)
        const parsedCredentials = signInFormSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(
            "Invalid credentials: ",
            parsedCredentials.error.errors,
          );
          return null;
        }

        // fetch data from database against validated credentials
        user = {
          id: "1",
          name: "John Doe",
          email: "jdoe42@email.com",
          role: "admin",
        };

        // if no matching data is found
        if (!user) {
          console.log("invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = auth?.user.role || "user";

      if (pathname === "/" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (
        (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) &&
        !isLoggedIn
      ) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      if (isLoggedIn && pathname.startsWith("/admin") && role !== "admin") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
