import React, {Component, PropTypes} from 'react';
import {range, size} from 'lodash';

import {scaleLinear} from 'services/util';

class Dendrogram extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      dataset,
      clustering,
      xScale
    } = this.props;

    return (
      <svg
        className={'Dendrogram'}
        width={this.props.width}
        height={this.props.height}>
        {

          (clustering || []).map((step, i) => {
            return (
              <path
                key={`path-${i}`}

              />
            );
          })
        }
        <g
          className={'Dendrogram__Items'}
          transform={`translate(0, ${this.props.height - this.props.size - 20})`}
        >
          {
            range(0, size(dataset)).map(index => (
              <g
                key={`item-${index}`}
                className={'Dendrogram__Item'}>
                <rect
                  x={xScale(index)}
                  y={0}
                  width={this.props.size}
                  height={this.props.size}
                />
              </g>
            ))
          }
        </g>
      </svg>
    );
  }
}

Dendrogram.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  dataset: PropTypes.array,
  clustering: PropTypes.array,
  dispatch: PropTypes.func
};

Dendrogram.defaultProps = {
  width: 1024,
  height: 400,
  xScale: scaleLinear([0, 8], [20, 1004]),
  yScale: scaleLinear([0, 8], [20, 380]),
  size: 8
}

export default Dendrogram;
