import { BooleanToBooleanString } from "~/model/types";
export const toString = <T>(str: T) => String(str) as BooleanToBooleanString<T>;

// lower case and remove accents/diacritics
// see: https://stackoverflow.com/a/37511463
export const sanitizeStringToCompare = (str: string) => {
    return str
       .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };
