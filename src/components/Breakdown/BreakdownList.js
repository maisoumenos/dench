import { BreakdownItem } from "./BreakdownItem";

export const BreakdownList = ({ items }) => {
  return (
    <ul className="breakdown-list">
      <li className="breakdown-list__item">
        <BreakdownItem name="Squat" results={items.Squat} />
      </li>

      <li className="breakdown-list__item">
        <BreakdownItem
          name="Overhead Press"
          results={items["Overhead Press"]}
        />
      </li>

      <li className="breakdown-list__item">
        <BreakdownItem name="Bench Press" results={items["Bench Press"]} />
      </li>

      <li className="breakdown-list__item">
        <BreakdownItem name="Deadlift" results={items.Deadlift} />
      </li>

      <li className="breakdown-list__item">
        <BreakdownItem name="Barbell Row" results={items["Barbell Row"]} />
      </li>

      <style jsx>{`
        .breakdown-list {
          list-style: none;
        }
      `}</style>
    </ul>
  );
};

export default BreakdownList;
