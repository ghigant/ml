import './Editor.scss';

import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';
import Dendrogram from 'components/Dendrogram';

import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

// import {}

import {
  default as clustering,
  singleLinkage,
  completeLinkage,
  averageLinkage
} from 'services/clustering/bottom-up';

import {
  updateClustering
} from 'state/actions/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch()
  }

  handleClustering() {
    const clusters = clustering(this.props.dataset, singleLinkage)
    this.props.dispatch(updateClustering(clusters));
  }

  render() {
    return (
      <div className={'Editor'} data-component={'Editor'}>
        <Header>
          <EditorMenu />
        </Header>
        <div className={'Editor__CartesianSystem grid'}>
          <CartesianSystem {...this.props}/>
        </div>
        <div className="grid">
          <ButtonToolbar>
            <DropdownButton bsStyle={'danger'} title={'Clustering'} id={'clusteringTypes'}>
              <MenuItem
                eventKey="1"
                onClick={event => this.handleClustering(event)}>
                {'Action'}
              </MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
        <div className={'grid'}>
          <Dendrogram />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired
};

export default Editor;
