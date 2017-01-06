import React from 'react';

require('./FileButton.scss');

const FileButton = (props) => {
  return (
    <label className={'btn btn-primary'}>
        {props.label} <input type="file" style={{display: 'none'}} />
    </label>
  );
}

FileButton.propTypes = {
  label: React.PropTypes.string
};

export default FileButton;
