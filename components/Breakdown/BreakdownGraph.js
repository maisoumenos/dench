import { Component } from 'react';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { AreaClosed, LinePath } from '@vx/shape';
import { PatternLines } from '@vx/pattern';
import { extent, min, max } from 'd3-array';

const xAccessor = d => new Date(d.completedOn);
const yAccessor = d => d.kilos;

export const BreakdownGraph = ({ name, width, height, data }) => {
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, xAccessor),
  });

  const yScale = scaleLinear({
    range: [height, 12],
    domain: [min(data, yAccessor) - 20, max(data, yAccessor) + 20],
  });

  return (
    <svg width={width} height={height}>
      <PatternLines
        id='dLines'
        height={6}
        width={6}
        stroke='rgba(255, 255, 255, 0.2)'
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <Group>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={xAccessor}
          y={yAccessor}
          strokeWidth="0"
          fill={`url(#dLines)`}
        />

        {data.map((d, i) => {
          return (
            <Group key={`${data.name}_${i}`}>
              <GlyphDot
                cx={xScale(xAccessor(d))}
                cy={yScale(yAccessor(d))}
                r={4}
                fill={'#070707'}
              />

              <GlyphDot
                cx={xScale(xAccessor(d))}
                cy={yScale(yAccessor(d))}
                r={2}
                fill={d.hasFailure ? '#f93838' : 'rgba(255, 255, 255, 0.5)'}
              />
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export default BreakdownGraph;
