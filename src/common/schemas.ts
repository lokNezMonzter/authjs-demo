import * as z from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be 8 or more characters")
    .max(32, "Password must be less than 32 characters"),
});
