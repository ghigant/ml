import React, {Component, PropTypes} from 'react';

import {range, size, first, last} from 'lodash';
import * as d3 from 'd3';

import {scaleLinear} from 'services/util';

class Dendrogram extends Component {
  constructor(props) {
    super(props);
  }

  onRootClick(index, event) {
    this.props.onSelect(this.props.clustering[index].v)
  }

  render() {
    const {dataset} = this.props;
    let {clustering} = this.props;

    const xScale = scaleLinear(
      [0, size(dataset)],
      [20, this.props.width - 40]
    );

    const yScale = scaleLinear(
      [0, Math.ceil(last(clustering) ? last(clustering).h : 0)],
      [this.props.height - 20, 40]
    );

    const line = d3.line()
      .x((d) => xScale(first(d)))
      .y((d) => yScale(last(d)))

    clustering = clustering || [];
    console.log(clustering);
    // const maxHeight =  last(clustering).h;
    // // console.log('maxHeight', maxHeight);
    // const sH = maxHeight / size(clustering);
    // console.log('maxHeight', maxHeight, sH);
    // clustering = clustering.map((step, index) => {
    //   return Object.assign({}, step, {
    //     h: sH * (index + 1)
    //   })
    // });
    return (
      <svg
        className={'Dendrogram'}
        width={this.props.width}
        height={this.props.height}>
        {
          clustering.map((step, i) => {
            return (
              <g key={`path-${i}`}>
                <path
                  key={`path-${i}`}
                  d={line(step.path)}
                  stroke={'#000'}
                  fill="none"
                  strokeWidth={1}
                  transform={`translate(${(this.props.size) / 2}, 0)`}
                />
              <circle
                cx={xScale(step.c)}
                cy={yScale(step.h)}
                r={this.props.size / 1.5}
                transform={`translate(${this.props.size / 1.5}, 0)`}
                onClick={e => this.onRootClick(i, e)}
              />
              </g>
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
  width: 1980,
  height: 1080,
  size: 6
}

export default Dendrogram;
