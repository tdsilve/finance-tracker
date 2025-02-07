import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string({ required_error: "Name is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const SignUpSchema = z.object({
  email: z.string({ required_error: "Name is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
  username: z.string({ required_error: "Username is required" }),
});
