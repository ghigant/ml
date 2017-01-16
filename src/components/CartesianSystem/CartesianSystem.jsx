import React, {Component} from 'react';
import * as d3 from 'd3';
import {size, inRange, pick} from 'lodash';


import Dot from './Dot';
import CartesianGrid from './CartesianGrid';
import MouseTracker from './MouseTracker';

import {
  addPointToDataset
} from  'state/actions/editor';

const SYSTEM_PADDING = 30;
const TICKS = 10;

import './CartesianSystem.scss';

class CartesianSystem extends Component {
  constructor(props) {
    super(props);

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
      this.props.dispatch(addPointToDataset([x, y]));
    }
  }

  onDotMove(index, event) {
    console.log('onDotMove', index, this.getEventPosition(event));
  }

  onMouseLeave() {
    this.setState({
      mousePosition: null
    });
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
        onMouseMove={e => this.onMouseMove(e)}
        onMouseLeave={e => this.onMouseLeave(e)}>
        {/*
          Renders Cartesian System
        */}
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
              className={'MouseTracker'}
              xScale={xScale}
              yScale={yScale}
              {...this.state.mousePosition }/>
          )
        }
        <g className={'CartesianSystem__Dots'}>
          {
            dataset.map((point, index) => {
              const isSelected = _.findIndex(this.props.selected, (sel) => {
                return point[0] === sel[0] && point[1] === sel[1];
              }) !== -1;
              return (
                <Dot
                  key={`cs-dot-${index}`}
                  cx={xScale(point[0])}
                  cy={yScale(size(point) === 1 ? 0 : point[1])}
                  r={5}
                  isSelected={isSelected}
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
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func,
  dataset: React.PropTypes.array,
  dispatch: React.PropTypes.func
};

CartesianSystem.defaultProps = {
  width: 400,
  height: 400,
  dataset: []
};

export default CartesianSystem;
