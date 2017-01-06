import React, {Component} from 'react';

import Header from 'components/Header/Header';


class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
