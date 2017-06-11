import parseStrongliftsData from '../utils/parseStrongliftsData';
import data from '../data/spreadsheet.stronglifts.csv';

import { Bar, Footer, Head, Intro, Page, BreakdownList, ShortDate } from '../components';

export const Index = ({ startedOn, lastUpdated, totalWorkouts, days, breakdown }) => (
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
      items={breakdown}
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
  const { breakdown, lastUpdated, days, startedOn, totalWorkouts } = parseStrongliftsData(data);
  return {
    startedOn,
    lastUpdated,
    totalWorkouts,
    days,
    breakdown,
  }
}

export default Index;
