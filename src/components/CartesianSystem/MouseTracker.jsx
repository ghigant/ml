import React from 'react';
import {line as d3Line} from 'd3-shape';

const MouseTracker = ({x, y, xScale, yScale}) => {
  const line = d3Line();
  const [xMin, xMax] = xScale.domain();
  const [yMin, yMax] = yScale.domain();
  // console.log(x, y);
  return (
    <g className="MouseTracker" strokeWidth={.5} stroke={'red'}>
      <path
        className={'MouseTracker__yLine'}
        stroke={'red'}
        d={line([
          [xScale(x), yScale(yMin)],
          [xScale(x), yScale(yMax)]
        ])} />
      <path
        className={'MouseTracker__xLine'}
        d={line([
          [xScale(xMin), yScale(y)],
          [xScale(xMax), yScale(y)]
        ])} />
    </g>
  )
};

MouseTracker.propTypes = {
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func,
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

export default MouseTracker;
