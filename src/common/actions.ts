"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { CredentialsProps } from "@/common/types";

export async function handleCredentialsSignIn({
  email,
  password,
}: CredentialsProps) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid Credentials",
          };

        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function handleGithubSignIn() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
