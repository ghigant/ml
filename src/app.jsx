import ReactDOM from 'react-dom';
import React from 'react';

import FileReader from './components/FileReader';

const fileAPIEnabled = !!(
  window.File && window.FileReader && window.FileList && window.Blob
);

const App = () => {
  return (
    <div className={'page'}>
      <h1>Welcome</h1>
      {
        fileAPIEnabled && (
          <FileReader />
        )
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('viewport'))
