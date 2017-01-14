import React, {Component} from 'react';

import { read } from 'services/file';
import {getDomainsFromData} from 'services/util';
import {default as clustering } from 'services/clustering/bottom-up';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: []
    };
  }

  render() {
    return <div className={'App'} data-component={'App'} />;
  }
}

App.propTypes = {
  children: React.PropTypes.object
};

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;
