import { Component } from 'react';
import { BreakdownStatus } from './BreakdownStatus';
import { BreakdownGraph } from './BreakdownGraph';
import { BreakdownChange } from './BreakdownChange';

export class BreakdownItem extends Component {
  state = {
    height: 0,
    width: 0,
  }

  getGraphContainerHeight = () => {
    if (this.graphContainer) {
      this.setState({
        height: this.graphContainer.clientHeight,
        width: this.graphContainer.clientWidth,
      });
    }
  }

  componentDidMount() {
    this.getGraphContainerHeight();
    window.addEventListener('resize', this.getGraphContainerHeight)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getGraphContainerHeight)
  }

  render () {
    const { name, results } = this.props;
    const { height, width } = this.state;

    const firstValue = results[0];
    const lastValue = results[results.length-1];

    return (
      <div className="breakdown">
        <div className="breakdown__container">
          <div className="breakdown__name">{name}</div>
          <div className="breakdown__current">
            <BreakdownStatus first={firstValue.kilos} last={lastValue.kilos} />
          </div>
          <div className="breakdown__change">
            <BreakdownChange
              first={firstValue.kilos}
              last={lastValue.kilos}
            />
          </div>
        </div>
        <div className="breakdown__graph" ref={ref => this.graphContainer = ref}>
          <BreakdownGraph
            name={name}
            height={height}
            width={width}
            data={results}
          />
        </div>

        <style jsx>{`
          .breakdown {
            position: relative;
            box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
          }

          .breakdown__container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 3rem 24px;
            min-height: 120px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .breakdown div {
            position: relative;
            flex-basis: 33.333%;
            z-index: 1;
          }

          .breakdown__name {
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
          }

          .breakdown__change {
            text-align: right;
          }

          .breakdown__current {
            text-align: center;
          }

          .breakdown .breakdown__graph {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 0;
          }

          @media (max-width: 650px) {
            .breakdown__container {
              flex-wrap: wrap;
              height: auto;
              padding: 48px 24px;
            }

            .breakdown__container > div {
              flex-basis: auto;
            }

            .breakdown__container .breakdown__current {
              order: 3;
              flex-basis: 100%;
              padding-top: 36px;
            }
          }

          @media (min-width: 1200px) {
            .breakdown__name {
              letter-spacing: 0.2em;
              font-size: 14px;
            }

            .breakdown__container {
              padding: 5rem 24px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default BreakdownItem;
