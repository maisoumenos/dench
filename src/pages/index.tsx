import fs from "fs";
import path from "path";
import {
  Bar,
  BreakdownList,
  Footer,
  Head,
  Intro,
  Page,
  ShortDate,
} from "../components";
import { parseCSV } from "../utils/csv";

export const Index = ({ startedOn, lastUpdated, totalWorkouts, exercises }) => {
  return (
    <Page>
      <Head />

      <Bar>
        <p>
          A simple breakdown of {totalWorkouts} workouts since{" "}
          <ShortDate date={startedOn} />.
        </p>
      </Bar>

      <Page.Section>
        <Intro
          startedOn={startedOn}
          total={totalWorkouts}
          lastUpdated={lastUpdated}
        />
      </Page.Section>

      <BreakdownList items={JSON.parse(exercises)} />

      <Page.Section>
        <Footer startedOn={startedOn} total={totalWorkouts} />
      </Page.Section>

      <Page.Links />
    </Page>
  );
};

const DATA_PATH = path.join(
  process.cwd(),
  "data",
  "spreadsheet.stronglifts.csv"
);

export async function getStaticProps() {
  const data = fs.readFileSync(DATA_PATH, "utf8");
  const { exercises, meta } = parseCSV(data);

  return {
    props: {
      exercises: JSON.stringify(exercises),
      startedOn: meta.startedOn.toString(),
      lastUpdated: meta.lastUpdated.toString(),
      totalWorkouts: meta.totalWorkouts,
    },
  };
}

export default Index;
