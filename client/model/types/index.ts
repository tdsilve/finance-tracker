import z from "zod";
import { SignInSchema } from "~/model/schemas";

export type SignIn = z.infer<typeof SignInSchema>;
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TrueStringToBoolean<T> = T extends "true" ? Exclude<T, "true"> | true : T;
export type FalseStringToBoolean<T> = T extends "false" ? Exclude<T, "false"> | false : T;
export type BooleanStringToBoolean<T> = TrueStringToBoolean<FalseStringToBoolean<T>>;

export type TrueBooleanToString<T> = T extends true ? Exclude<T, true> | "true" : T;
export type FalseBooleanToString<T> = T extends false ? Exclude<T, false> | "false" : T;
export type BooleanToBooleanString<T> = TrueBooleanToString<FalseBooleanToString<T>>;



