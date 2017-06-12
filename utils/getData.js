import { csvParseRows } from 'd3';
import { parseDate, getWeekFromDate } from './dates';
import {
  compose,
  groupBy,
  pluck,
  flatten,
} from 'ramda';

const groupByExercises = compose(
  groupBy(item => item.name),
  flatten,
  pluck('exercises'),
);

const weightIsKilos = weight => weight.toLowerCase().indexOf('kg') > 0;

const convertWeightToNumber = string => parseFloat(
  string.replace(/[^\d.-]/g, '')
);

const convertKgToLbs = number => +(number * 2.20462).toFixed(2);
const convertLbsToKg = number => +(number * 0.453592).toFixed(2);

const transformBodyWeight = weight => {
  const isKilos = weightIsKilos(weight);
  const weightAsFloat = convertWeightToNumber(weight);

  if (isKilos) {
    return {
      preferredUnit: 'kilos',
      kilos: weightAsFloat,
      pounds: convertKgToLbs(weightAsFloat),
    }
  } else {
    return {
      preferredUnit: 'pounds',
      kilos: weightAsFloat,
      pounds: convertKgToLbs(weightAsFloat),
    }
  }
}

const removeEmptySets = sets => sets.filter(set => set !== null);
const filterForFailures = sets => !!sets.filter(set => set < 5).length;

const setHasFailure = compose(
  filterForFailures,
  removeEmptySets,
);

const takeAndTransformMainExercises = (row, parsedDate) => {
  const exercises = [];

  while (row.length > 0 && exercises.length < 3) {
    const exercise = row.splice(0, 8);

    const exerciseSets = [
      +exercise[3] || null,
      +exercise[4] || null,
      +exercise[5] || null,
      +exercise[6] || null,
      +exercise[7] || null,
    ];

    exercises.push({
      completedOn: parsedDate,
      name: exercise[0].toLowerCase(),
      kilos: +exercise[1],
      pounds: +exercise[2],
      hasFailure: setHasFailure(exerciseSets),
      sets: exerciseSets,
    })
  }

  return exercises;
}

// Take individual rows from csv and return a nice object;
const parseAndTransformRows = data => csvParseRows(data, ([date, note, routine, weight, ...exercises], index) => {
  // Ignore initial row with headers as Stronglifts header's
  // aren't particularly helpful to us.
  if (index === 0) return;

  // Parse date from string 'DD/MM/YY'
  const parsedDate = parseDate(date, 'DD/MM/YY');

  return {
    routine: routine,
    completedOn: parsedDate,
    weekInYear: getWeekFromDate(parsedDate),
    weightOnDay: transformBodyWeight(weight),
    exercises: takeAndTransformMainExercises(exercises, parsedDate),
  }
});

const addWeightToExercises = data => data.map(workout => {
  workout.exercises.unshift({
    ...workout.weightOnDay,
    completedOn: workout.completedOn,
    name: 'weight'
  });
  return workout
});

const addGroupedByExercises = data => ({
  raw: data,
  groupedByExercises: groupByExercises(data),
})

const addMetaData = data => ({
  ...data,
  meta: {
    unit: data.groupedByExercises.weight[0].preferredUnit,
    startedOn: data.raw[0].completedOn,
    lastUpdated: data.raw[data.raw.length - 1].completedOn,
    totalWorkouts: data.raw.length,
  },
})

export const getData = compose(
  addMetaData,
  addGroupedByExercises,
  addWeightToExercises,
  parseAndTransformRows,
);

export default getData;
