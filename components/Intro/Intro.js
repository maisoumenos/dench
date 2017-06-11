import { compose } from 'ramda';
import { SVGIcon } from '../';
import {formatShortDate} from '../../utils/dates';

export const Intro = ({ startedOn, lastUpdated, total}) => (
  <div className='intro'>
    <SVGIcon>
      <SVGIcon.Dench height={92} width={157} />
    </SVGIcon>

    <p className='intro__last-updated'>
      Last workout on {formatShortDate(lastUpdated)}
    </p>

    <style jsx>{`
      .intro {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .intro > :global(.icon) {
        display: block;
        margin-bottom: 18px;
      }

      .intro__last-updated {
        margin-top: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 12px;
      }
    `}</style>
  </div>
)

export default Intro
