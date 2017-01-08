import React, {Component} from 'react';
import {reduce} from 'lodash';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';

import { read } from 'services/file';
import {default as clustering } from 'services/clustering/bottom-up';


class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <Header>
          <Navigation onImport={(file) => {
            if (file instanceof File) {
              read(file, function readDone(dataset) {
                console.log(dataset);

                var sizes = reduce(dataset, (size, point) => {
                  console.log(arguments);
                  const [x, y] = point;

                  if (x < size.x.min) {
                    size.x.min = x;
                  }
                  if (x > size.x.max) {
                    size.x.max = x;
                  }
                }, {
                  x: {min: 0, max: 0},
                  y: {min: 0, max: 0}
                });
                console.log(sizes);
              });


            }

          }}/>
        </Header>
        <div style={{paddingTop: "50px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
