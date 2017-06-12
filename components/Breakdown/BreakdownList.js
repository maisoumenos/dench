import { BreakdownItem } from './BreakdownItem';

export const BreakdownList = ({ items }) => {
  return (
    <ul className='breakdown-list'>
      <li className='breakdown-list__item'>
        <BreakdownItem name="Weight" results={items.weight} />
      </li>

      <li className='breakdown-list__item'>
        <BreakdownItem name="Squat" results={items.squat} />
      </li>

      <li className='breakdown-list__item'>
        <BreakdownItem name="Overhead Press" results={items["overhead press"]} />
      </li>

      <li className='breakdown-list__item'>
        <BreakdownItem name="Bench Press" results={items["bench press"]} />
      </li>

      <li className='breakdown-list__item'>
        <BreakdownItem name="Deadlift" results={items.deadlift} />
      </li>

      <li className='breakdown-list__item'>
        <BreakdownItem name="Barbell Row" results={items["barbell row"]} />
      </li>

      <style jsx>{`
        .breakdown-list {
          list-style: none;
        }
      `}</style>
    </ul>
  )
}

export default BreakdownList
