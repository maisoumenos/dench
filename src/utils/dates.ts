import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);

export const getWeekFromDate = (d: dayjs.Dayjs) => {
  return d.week();
};

export const formatShortDate = (date: string | Date | dayjs.Dayjs) => {
  return dayjs(date).format("D MMMM YYYY");
};

export const parseDate = (
  date: string | Date | dayjs.Dayjs,
  format = "DD/MM/YY"
) => {
  return dayjs(date, format);
};
