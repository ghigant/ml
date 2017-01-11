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

  // onImport(file) {
  //   if (file instanceof File) {
  //     read(file, (dataset) => {
  //       // console.log(dataset);
  //       const {xDomain, yDomain} = getDomainsFromData(dataset);
  //       this.setState({
  //         dataset: dataset
  //       }, () => {
  //         this.context.router.push('/editor')
  //       });
  //     });
  //   }
  // }

  // render() {
  //   return (
  //     <div>
  //       {
  //     React.cloneElement(
  //     React.Children.only(this.props.children), {
  //       state: this.state,
  //       onImport: this.onImport
  //     }
  //   )
  // }
  // </div>
  //   )
  // }
}

App.propTypes = {
  children: React.PropTypes.object
};

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;
