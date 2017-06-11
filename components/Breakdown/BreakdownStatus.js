import { SVGIcon } from '../';

export const BreakdownStatus = ({ first, last}) => {
  return (
    <div className='current'>
      <div className="current__start">{first}kg</div>
      <SVGIcon>
        <SVGIcon.KeyRight height={36} width={36} />
      </SVGIcon>
      <div className="current__current">{last}kg</div>

      <style jsx>{`
        .current {
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .current__start,
        .current__current {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: 100%;
          font-size: 24px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .current__start {
          text-align: right;
        }

        .current__current {
          text-align: left;
        }

        .current :global(.icon) {
          opacity: 1;
          margin: 0 12px;
          flex: 0 0 auto;
        }

        @media (max-width: 650px) {
          .current {
             justify-content: flex-start;
          }

          .current__start,
          .current__current {
            flex-grow: 0;
            flex-basis: auto;
            font-size: 32px;
          }

          .current__start {
            text-align: left;
          }

          .current__current {
            text-align: right;
          }
        }

        @media (min-width: 1200px) {
          .current__start,
          .current__current {
            font-size: 36px;
            font-weight: 300;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </div>
  )
}

export default BreakdownStatus
