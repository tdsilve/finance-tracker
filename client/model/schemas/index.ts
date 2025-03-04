import { z } from "zod";
import { PASSWORD_MIN } from "~/model/constants";

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
    .min(PASSWORD_MIN.min, { message: PASSWORD_MIN.message }),
  username: z.string().trim().min(1, { message: "Username is required" }),
});

export const RecoverPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please, provide a valid email" }),
});

export const ResetPasswordSchema = z.object({
  token: z.string().trim().min(1, { message: "Token is required" }),
  password: z
    .string()
    .trim()
    .min(PASSWORD_MIN.min, { message: PASSWORD_MIN.message }),
});

export const AccountSchema = z.object({
  _id: z.string(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  amount: z
    .union([z.string(), z.number()])
    .refine((v) => typeof v === "string" && !isNaN(+v), {
      message: "Amount must be a number",
    }),
});

export const NewAccountSchema = AccountSchema.pick({
  name: true,
  amount: true,
});

export const EditAccountSchema = AccountSchema;

export const TransactionSchema = z.object({
  _id: z.string(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  amount: z
    .union([z.string(), z.number()])
    .refine((v) => typeof v === "string" && !isNaN(+v), {
      message: "Amount must be a number",
    }),
  date: z.union([z.string(), z.number()]),
  notes: z.string().trim(),
  category: z.enum(["Income", "Expense"]),
});

export const NewTransactionSchema = TransactionSchema.pick({
  name: true,
  amount: true,
  date: true,
  notes: true,
  category: true,
});

export const EditTransactionSchema = TransactionSchema;
