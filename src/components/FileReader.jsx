import React, {Component} from 'react';
import {read as readFile} from '../services/file';
import {first} from 'lodash';

import FileButton from 'components/FileButton/FileButton';

class FileImport extends Component {

  handleOnChange(event) {
    if (event.target.files.length) {
      readFile(first(event.target.files), (data) => {
        this.props.onData(data);
      });
    }
  }

  render() {
    return (
      <div>
      <FileButton />
      <input
        type="file"
        onChange={e => this.handleOnChange(e)} />
      </div>
    );
  }
}

FileImport.propTypes = {
  onData: React.PropTypes.func
};

export default FileImport;
