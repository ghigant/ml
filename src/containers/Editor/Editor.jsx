import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';

const mapStateToProps = (state) => {
  return Object.assign({}, state.editor);
}

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'editor'} style={{paddingTop: 50}}>
        <Header>
          <EditorMenu />
        </Header>
        <div className={'editor__cs'}>
            <CartesianSystem {...this.props}/>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Editor);
