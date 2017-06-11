import classnames from 'classnames';

const round = val => Math.round(val * 100);

const calculatePercentageChange = (start, end) => {
  const change = end - start;
  return round(change / start);
}

export const BreakdownChange = ({ first, last}) => {
  const change = last - first;
  const changeIsNegative = change < 0;

  const cx = classnames('change', {
    'is-negative': changeIsNegative,
    'is-positive': !changeIsNegative,
  });

  return (
    <div className={cx}>
      <span className="change__raw">
        <span>{!changeIsNegative && '+'}{ last - first }kg</span>
      </span>
      <span className="change__percentage">{!changeIsNegative && '+'}{ calculatePercentageChange(first, last)}%</span>
      <style jsx>{`
        .change {
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .change__raw {
          display: inline-block;
          padding: 4px 8px;
          border: 2px solid currentcolor;
          color: currentcolor;
          margin-right: 18px;
          border-radius: 3px;
        }

        .is-negative {
          color: #f93838;
        }

        .is-positive {
          color: #46CE6B;
        }

        @media (min-width: 1200px) {
          .change {
            font-size: 14px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </div>
  )
}

export default BreakdownChange
