import { BooleanToBooleanString } from "~/model/types";
export const toString = <T>(str: T) => String(str) as BooleanToBooleanString<T>;
