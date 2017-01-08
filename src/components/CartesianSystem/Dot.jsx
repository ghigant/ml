import React, {Component} from 'react';
import './Dot.scss';

class Dot extends Component {
  constructor(props) {
    super(props);
    this.mouseIsPressed = false;
  }

  onMouseMove(event) {
    if (this.mouseIsPressed) {
      this.props.onDotMove(event);
    }
  }

  onMouseUp(event) {
    event.stopPropagation();
    this.mouseIsPressed = false;
  }

  onMouseDown(event) {
    event.stopPropagation();
    this.mouseIsPressed = true;
  }

  render() {
    return (
      <circle
        className={'Dot'}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseUp={(e) => this.onMouseUp(e)}
        onMouseDown={e => this.onMouseDown(e)}
        {...this.props}>
      </circle>
    );

  }
}

Dot.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  r: React.PropTypes.number,
  onDotMove: React.PropTypes.func
}

export default Dot;
