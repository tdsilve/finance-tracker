import z from "zod";
import {
  RecoverPasswordSchema,
  SignInSchema,
  SignUpSchema,
  ResetPasswordSchema,
  AccountSchema,
  NewAccountSchema,
  TransactionSchema,
  NewTransactionSchema,
  EditAccountSchema,
  EditTransactionSchema,
} from "~/model/schemas";

export type Route = {
  label: string;
  href: string;
};
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Params = {
  limit: number;
  pageParam: number;
};

/**
 * --------------------------------
 *              API Types
 * --------------------------------
 **/

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type RecoverPassword = z.infer<typeof RecoverPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type User = {
  email: string;
  username: string;
  id?: string;
};
export type Account = z.infer<typeof AccountSchema>;
export type NewAccount = z.infer<typeof NewAccountSchema>;
export type EditAccount = z.infer<typeof EditAccountSchema>;
export type MutationCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
export type Transaction = z.infer<typeof TransactionSchema>;
export type NewTransaction = z.infer<typeof NewTransactionSchema>;
export type EditTransaction = z.infer<typeof EditTransactionSchema>;
export type Balance = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

/**
 * --------------------------------
 *              Helper Types
 * --------------------------------
 **/

export type TrueStringToBoolean<T> = T extends "true"
  ? Exclude<T, "true"> | true
  : T;
export type FalseStringToBoolean<T> = T extends "false"
  ? Exclude<T, "false"> | false
  : T;
export type BooleanStringToBoolean<T> = TrueStringToBoolean<
  FalseStringToBoolean<T>
>;

export type TrueBooleanToString<T> = T extends true
  ? Exclude<T, true> | "true"
  : T;
export type FalseBooleanToString<T> = T extends false
  ? Exclude<T, false> | "false"
  : T;
export type BooleanToBooleanString<T> = TrueBooleanToString<
  FalseBooleanToString<T>
>;
