import React, {Component} from 'react';
import {parse} from '../services/file';

class FileImport extends Component {
  constructor(props) {
    super(props);
    this._reader = null;
  }

  onFileLoaded(event) {
    const content = this._reader.result;
    console.log(parse(content));
    // console.log(this._reader.result);
    this._reader = null;
  }

  handleOnChange(event) {

    console.log(event.target.files);
    this._reader = new window.FileReader();
    this._reader.onload = this.onFileLoaded.bind(this);
    if (event.target.files.length) {
      console.time('readfile');
      this._reader.readAsBinaryString(event.target.files[0])
    }
  }
  render() {
    return (
      <input
        type="file"
        onChange={e => this.handleOnChange(e)} />
    );
  }
}

export default FileImport;
