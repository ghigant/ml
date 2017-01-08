import React, {Component} from 'react';
import {size, first} from 'lodash';

require('./FileButton.scss');

class FileButton extends Component {

  onChange(event) {
    if (size(event.target.files) > 0) {
      this.props.onFileSelected(first(event.target.files));
    }
  }

  render() {
    const {label, className} = this.props;
    return (
      <label className={className}>
          {label}
          <input
            type="file"
            onChange={e => this.onChange(e)}
            style={{display: 'none'}} />
      </label>
    );
  }
}

// const FileButton = ({className, label}) => {
//   return (
//     <label className={className}>
//         {label} <input type="file" style={{display: 'none'}} />
//     </label>
//   );
// }

FileButton.propTypes = {
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  onFileSelected: React.PropTypes.func
};

export default FileButton;
