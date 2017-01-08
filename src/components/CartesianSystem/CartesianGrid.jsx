import React from 'react';
import {range} from 'lodash';
import {line as d3line} from 'd3-shape';

const CartesianGrid = ({xScale, yScale}) => {
  const line = d3line();
  const [xMin, xMax] = xScale.domain();
  const [yMin, yMax] = yScale.domain();
  return (
    <g className={'CartesianGrid'}>
      <g className={'CartesianGrid__yLines'}>
        {
          range(...xScale.domain()).map(x => {
            return (
              <path
                key={`grid-yLine-${x}`}
                className={'CartesianSystem__yLine'}
                d={line([
                  [xScale(x + 1), yScale(yMin)],
                  [xScale(x + 1), yScale(yMax)]
                ])}>
              </path>
            );
          })
        }
      </g>
      <g className={'CartesianGrid__xLines'}>
        {
          range(...yScale.domain()).map((y) => {
            return (
              <path
                key={`grid-xLine-${y}`}
                className={'CartesianSystem__xLine'}
                d={line([
                  [xScale(xMin), yScale(y)],
                  [xScale(xMax), yScale(y)]
                ])}>
              </path>
            );
          })
        }
      </g>
  </g>
  );
}

CartesianGrid.propTypes = {
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

export default CartesianGrid;
