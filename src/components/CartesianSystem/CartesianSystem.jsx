import React, {Component} from 'react';
import * as d3 from 'd3';
import {size, inRange, round} from 'lodash';


import Dot from './Dot';
import CartesianGrid from './CartesianGrid';
import MouseTracker from './MouseTracker';

import {
  scaleLinear
} from 'services/util';

const SYSTEM_PADDING = 30;
const TICKS = 10;
const PRECISION = 1;

import './CartesianSystem.scss';

class CartesianSystem extends Component {
  constructor(props) {
    super(props);
    const {width, height} = props;
    this.state = {
      mousePosition: null
    };
  }

  getXAxis() {
    return d3.axisBottom(this.props.xScale).ticks(TICKS);
  }

  getYAxis() {
    return d3.axisLeft(this.props.yScale).ticks(TICKS);
  }

  getEventPosition(event) {
    const {xScale, yScale} = this.props;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = xScale.invert(event.clientX - rect.left);
    const y = yScale.invert(event.clientY - rect.top);

    return {x , y};
  }

  isInDomain(event) {
    const {x, y} = this.getEventPosition(event);
    const {xScale, yScale} = this.props;
    return inRange(x, ...xScale.domain()) && inRange(y, ...yScale.domain());
  }

  onMouseMove(event) {
    let {x, y} = this.getEventPosition(event);

    this.setState({
      mousePosition: this.isInDomain(event) ? {x, y} : null
    });
  }

  onClick(event) {
    if (this.isInDomain(event)) {
      const {x, y} = this.getEventPosition(event);
      // this.setState({
      //   dataset: [...this.state.dataset, [round(x, PRECISION), round(y, PRECISION)]]
      // });
    }
  }

  onDotMove(index, event) {
    console.log('onDotMove', index, this.getEventPosition(event));
  }

  render() {
    const {dataset} = this.props;
    const {xScale, yScale} = this.props;
    return (
      <svg
        className="CartesianSystem"
        width={this.props.width}
        height={this.props.height}
        onClick={e => this.onClick(e)}
        onMouseMove={e => this.onMouseMove(e)}>
        <g className={'CartesianSystem__Grid'} transform="translate(0.5, 0.5)">
          <CartesianGrid xScale={xScale} yScale={yScale} />
        </g>
        <g
          className={'CartesianSystem__xAxis'}
          transform={`translate(0, ${this.props.height - SYSTEM_PADDING})`}
          ref={dom => d3.select(dom).call(this.getXAxis())} />
        <g
          className={'CartesianSystem__yAxis'}
          transform={`translate(${SYSTEM_PADDING}, 0)`}
          ref={dom => d3.select(dom).call(this.getYAxis())} />
        {
          this.state.mousePosition && (
            <MouseTracker
              className={'plm'}
              xScale={xScale}
              yScale={yScale}
              {...this.state.mousePosition }/>
          )
        }
        <g className={'CartesianSystem__Points'}>
          {
            dataset.map((point, index) => {
              return (
                <Dot key={`cs-dot-${index}`}
                  cx={xScale(point[0])}
                  cy={yScale(size(point) === 1 ? 0 : point[1])}
                  r={5}
                  onDotMove={this.onDotMove.bind(this, index)}
                />
              );
            })
          }
        </g>
      </svg>
    );
  }
}

CartesianSystem.propTypes =  {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  dataset: React.PropTypes.array
};

CartesianSystem.defaultProps = {
  width: 400,
  height: 400,
  dataset: []
};

export default CartesianSystem;
