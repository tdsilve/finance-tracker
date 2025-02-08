import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }).email(),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please, provide a valid email" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Must be 5 or more characters long" }),
  username: z.string().trim().min(1, { message: "Username is required" }),
});

export const RecoverPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please, provide a valid email" }),
});
