import fs from "fs";
import { GetStaticProps } from "next";
import path from "path";
import { BreakdownList, Head } from "../components";
import { Footer } from "../components/Footer";
import { Dench } from "../components/Logos";
import { parseCSV } from "../utils/csv";
import { formatShortDate } from "../utils/dates";

interface IndexProps {
  startedOn: string;
  lastUpdated: string;
  totalWorkouts: number;
  exercises: string;
}

export const Index = ({
  startedOn,
  lastUpdated,
  totalWorkouts,
  exercises,
}: IndexProps) => {
  const parsedData = JSON.parse(exercises);

  return (
    <div className="page">
      <Head />

      <div className="page__notice">
        A simple breakdown of {totalWorkouts} workouts since{" "}
        {formatShortDate(startedOn)}.
      </div>

      <div className="page__intro page__section">
        <Dench height={92} width={157} />

        <p className="page__intro__text">
          Last workout on {formatShortDate(lastUpdated)}
        </p>
      </div>

      <BreakdownList items={parsedData} />

      <Footer startedOn={startedOn} total={totalWorkouts} />

      <div className="page__notice">
        View on <a href="https://github.com/maisoumenos/dench">Github</a>
      </div>

      <style global jsx>{`
        html,
        body {
          background-color: #070707;
          font-size: 16px;
        }

        body {
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        a {
          color: currentColor;
          text-decoration: none;
        }
      `}</style>

      <style jsx>{`
        .page {
        }

        .page__section {
          padding: 8rem 24px;
        }

        .page__notice {
          align-items: center;
          color: #070707;
          background: #fff;
          padding: 18px 24px;
          font-size: 18px;
          text-align: center;
        }

        .page__notice > a {
          transition: box-shadow 200ms ease-in-out;
          box-shadow: inset 0 -0.4em rgba(0, 0, 0, 0.25);
        }

        .page__notice > a:hover {
          box-shadow: inset 0 -0.6em rgba(0, 0, 0, 0.35);
        }

        .page__intro {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .page__intro__text {
          margin-top: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 12px;
        }

        @media (max-width: 650px) {
          .page__notice {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

const DATA_PATH = path.join(
  process.cwd(),
  "data",
  "spreadsheet.stronglifts.csv"
);

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
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
};

export default Index;
