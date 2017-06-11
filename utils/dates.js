import * as Fecha from 'fecha';

export const getWeekFromDate = d => {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

  const firstWeekOfYear = new Date(date.getFullYear(), 0, 4);

  return 1 + Math.round(((date.getTime() - firstWeekOfYear.getTime()) / 86400000 - 3 + (firstWeekOfYear.getDay() + 6 ) % 7) / 7);
}

export const formatShortDate = date => {
  return Fecha.format(new Date(date), 'mediumDate');
};

export const parseDate = (date, format) => {
  return Fecha.parse(date, format);
}
