// lower case and remove accents/diacritics
// see: https://stackoverflow.com/a/37511463
export const sanitizeStringToCompare = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
