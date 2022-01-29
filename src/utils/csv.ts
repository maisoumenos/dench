import { csvParseRows } from "d3-dsv";
import { parseDate } from "./dates";

function isKilos(weight: string): boolean {
  return weight.includes("kg");
}

function convertWeightStringToNumber(weight: string): number {
  return parseFloat(weight.replace(/[^\d.-]/g, ""));
}

function convertKilosToPounds(weight: number): number {
  return weight * 2.20462;
}

function convertPoundsToKilos(weight: number): number {
  return weight / 2.20462;
}

interface Bodyweight {
  preferredUnit: "kilos" | "pounds";
  kilos: number;
  pounds: number;
}

function transformBodyweight(weight: string): Bodyweight {
  const preferredUnit = isKilos(weight) ? "kilos" : "pounds";
  const weightNumber = convertWeightStringToNumber(weight);

  if (preferredUnit === "kilos") {
    return {
      preferredUnit,
      kilos: weightNumber,
      pounds: convertKilosToPounds(weightNumber),
    };
  } else {
    return {
      preferredUnit,
      kilos: convertPoundsToKilos(weightNumber),
      pounds: weightNumber,
    };
  }
}

function removeEmptySets(sets: number[]): number[] {
  return sets.filter((set) => set !== null);
}

function hasFailedSets(sets: number[]): boolean {
  return !!removeEmptySets(sets).filter((set) => set < 5).length;
}

interface Exercise {
  name: string;
  kilos: number;
  pounds: number;
  hasFailure: boolean;
  completedOn: string;
}

function transformExercises(row: string[], completedOn: string): Exercise[] {
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
      name: exercise[0],
      kilos: +exercise[1],
      pounds: +exercise[2],
      hasFailure: hasFailedSets(exerciseSets),
      completedOn,
    });
  }

  return exercises;
}

interface Workout {
  routine: string;
  completedOn: string;
  bodyweight: Bodyweight;
  exercises: Exercise[];
}

export function parseCSV(csv: string): any {
  const rows = csvParseRows(csv);

  rows.shift();

  const parsedRows = rows.map((row) => {
    const [date, _note, routine, weight, ...exercises] = row;

    const parsedDate = parseDate(date);

    return {
      routine,
      completedOn: parsedDate.format(),
      bodyweight: transformBodyweight(weight),
      exercises: transformExercises(exercises, parsedDate.format()),
    };
  });

  const grouped = {};

  parsedRows.forEach(({ exercises }) => {
    exercises.forEach((row) => {
      if (grouped[row.name]) {
        grouped[row.name].push(row);
      } else {
        grouped[row.name] = [row];
      }
    });
  });

  return {
    exercises: grouped,
    meta: {
      unit: parsedRows[0].bodyweight.preferredUnit,
      startedOn: parsedRows[0].completedOn,
      lastUpdated: parsedRows[parsedRows.length - 1].completedOn,
      totalWorkouts: parsedRows.length,
    },
  };
}
