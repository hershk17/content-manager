import { format, formatDistanceToNow, getTime } from "date-fns";

type dateType = string | number | Date;

export function fDate(date: dateType, newFormat: string = "dd MMM yyyy") {
  return date ? format(new Date(date), newFormat) : "";
}

export function fDateTime(date: dateType, newFormat: string = "dd MMM yyyy") {
  return date ? format(new Date(date), newFormat) : "";
}

export function fTimestamp(date: dateType) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: dateType) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
