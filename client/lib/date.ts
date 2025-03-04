import { parse, getTime } from "date-fns";

export function getDateStringToTimestamp(dateString: string) {
  const parsedDate = parse(dateString, "yyyy/MM/dd", new Date());
  const timestamp = getTime(parsedDate);
  return timestamp;
}

export function getStringOrNumberToDate(timestamp: number | string): Date {
  const date = new Date(timestamp);
  return date;
}
