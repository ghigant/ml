import ReactDOM from 'react-dom';
import React from 'react';
import {chain, min, first, concat} from 'lodash';


import {supportFileApi} from 'services/file';
import FileReader from 'components/FileReader';

const App = () => {
  return (
    <div className={'container'}>
      <h1>ML Clustering</h1>
      {
        supportFileApi() && (
          <FileReader onData={(data) => {
            console.log(data);
            var minX = chain(data)
              .reduce((list, point) => concat(list, first(point)), [])
              .min()
              .value();

            var minY = chain(data)
              .reduce((list, point) => concat(list, point[1]), [])
              .min()
              .value();
          }}/>
        )
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('viewport'))
