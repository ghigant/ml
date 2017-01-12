import './Editor.scss';

import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';

import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

import {
  default as clustering,
  singleLinkage,
  completeLinkage,
  averageLinkage
} from 'services/clustering/bottom-up';

const mapStateToProps = (state) => {
  return Object.assign({}, state.editor);
}

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  handleClustering(event) {
    const {dataset} = this.props;
    const cluster = clustering(dataset, singleLinkage);
  }

  render() {
    return (
      <div className={'Editor'}>
        <Header>
          <EditorMenu />
        </Header>
        <div className={'Editor__CartesianSystem grid'}>
          <CartesianSystem {...this.props}/>
        </div>
        <div className="grid">
          <ButtonToolbar>

            <DropdownButton bsStyle={'danger'} title={'Clustering'}>
              <MenuItem
                eventKey="1"
                onClick={(event) => this.handleClustering(event)}>
                {'Action'}
              </MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
        <div className={'Editor__Dendrogram grid'}>
          <div className="row">

          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Editor);
