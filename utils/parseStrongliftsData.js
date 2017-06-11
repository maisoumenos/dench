import { v1 }                 from 'uuid';
import { csvParseRows }       from 'd3';
import { parseDate, getWeekFromDate } from './dates';
import { groupBy, slice }     from 'ramda';
import slug                   from 'slug';

const groupByWeek = groupBy((day) => {
  return getWeekFromDate(day.date);
});

const coerceRowsIntoDays = (row, i) => {
  if (i === 0) return; // Ignore headers

  const day = row.splice(0, 4);
  const parsedDate = parseDate(day[0], 'DD/MM/YY');

  let obj = {
    id: v1({ msecs: parsedDate.getTime() }),
    date: parsedDate,
    workout: day[2],
    weight: day[3],
    exercises: [],
  }

  // Only take first three sets of exercises.
  // Not going to really pay attention to the optional
  // additional exercises.
  while (row.length > 0 && obj.exercises.length < 3) {
    const exercise = row.splice(0, 8);
    obj.exercises.push({
      name: exercise[0],
      kilos: +exercise[1],
      pounds: +exercise[2],
      sets: [
        +exercise[3] || false,
        +exercise[4] || false,
        +exercise[5] || false,
        +exercise[6] || false,
        +exercise[7] || false,
      ]
    })
  }

  return obj;
}

const transformDaysToBreakdown = listOfDays => {
  const breakdown = {};

  const addOrPushToBreakdown = (name, stat) => {
    if (typeof breakdown[name] === 'undefined') {
      breakdown[name] = [stat];
    } else {
      breakdown[name].push(stat);
    }
  }

  listOfDays.map(day => {
    const weightIsKilos = day.weight.indexOf('kg') > 0;
    const weightWithoutSymbols = day.weight.substring(0, day.weight.length - 2);

    let weightInKilos = weightIsKilos ? weightWithoutSymbols : weightWithoutSymbols;

    addOrPushToBreakdown('weight', {
      id: `weight_${day.id}`,
      date: day.date,
      kilos: weightInKilos,
      pounds: weightInKilos,
    });

    day.exercises.map(({ name, ...rest }) => {
      addOrPushToBreakdown(name, {
        id: `${slug(name)}_${day.id}`,
        date: day.date,
        ...rest,
      });
    });
  });

  return breakdown;
}

export const parseStrongliftsData = data => {
  const days = csvParseRows(data, coerceRowsIntoDays);
  const breakdown = transformDaysToBreakdown(days);

  return {
    startedOn: days[0].date,
    lastUpdated: days[days.length - 1].date,
    totalWorkouts: days.length,
    days,
    breakdown
  }
}

export default parseStrongliftsData;
