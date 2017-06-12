import getData from '../utils/getData';
import data from '../data/spreadsheet.stronglifts.csv';

import { Bar, Footer, Head, Intro, Page, BreakdownList, ShortDate } from '../components';

export const Index = ({ startedOn, lastUpdated, totalWorkouts, exercises }) => (
  <Page>
    <Head />

    <Bar>
      <p>A simple breakdown of {totalWorkouts} workouts since <ShortDate date={startedOn} />.</p>
    </Bar>

    <Page.Section>
      <Intro
        startedOn={startedOn}
        total={totalWorkouts}
        lastUpdated={lastUpdated}
      />
    </Page.Section>

    <BreakdownList
      items={exercises}
    />

    <Page.Section>
      <Footer
        startedOn={startedOn}
        total={totalWorkouts}
      />
    </Page.Section>

    <Page.Links />
  </Page>
)

Index.getInitialProps = async () => {
  const { groupedByExercises, meta } = getData(data);

  return {
    exercises: groupedByExercises,
    startedOn: meta.startedOn,
    lastUpdated: meta.lastUpdated,
    totalWorkouts: meta.totalWorkouts,
  }
}

export default Index;
