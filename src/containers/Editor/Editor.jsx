import React, {Component} from 'react';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';



class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: []
    };
  }


  render() {
    return (
      <div className={'editor'} style={{paddingTop: 50}}>
        <Header>
          <EditorMenu />
        </Header>
        <div className={'editor__cs'}>
            <CartesianSystem {...this.state}/>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  children: React.PropTypes.object
};

export default Editor;
