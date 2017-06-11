import {formatShortDate} from '../../utils/dates';

export const ShortDate = ({ date }) => (
  <span>{formatShortDate(date)}</span>
)

export default ShortDate;
