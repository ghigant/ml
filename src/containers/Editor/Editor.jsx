import './Editor.scss';

import React, {Component, PropTypes} from 'react';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';
import Dendrogram from 'components/Dendrogram';

import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

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
    this.state = {
      selection: []
    };
  }

  componentDidMount() {
    // this.props.dispatch()
  }

  onSelect(selection) {
    this.setState({
      selection: [...selection]
    });
  }

  handleClustering(simFn) {
    const clusters = clustering(this.props.dataset, simFn)
    this.props.dispatch(updateClustering(clusters));
  }

  render() {
    return (
      <div className={'Editor'} data-component={'Editor'}>
        <Header>
          <EditorMenu />
        </Header>
        <div className={'Editor__CartesianSystem grid'}>
          <CartesianSystem {...this.props} selected={this.state.selection}/>
        </div>
        <div className="grid">
          <ButtonToolbar>
            <DropdownButton bsStyle={'danger'} title={'Clustering'} id={'clusteringTypes'}>
              <MenuItem
                eventKey="1"
                onClick={() => this.handleClustering(singleLinkage)}>
                {'Single Linkage'}
              </MenuItem>
              <MenuItem
                eventKey="1"
                onClick={() => this.handleClustering(completeLinkage)}>
                {'Complete Linkage'}
              </MenuItem>
              <MenuItem
                eventKey="1"
                onClick={() => this.handleClustering(averageLinkage)}>
                {'Average Linkage'}
              </MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
        <div className={'grid'}>
          <Dendrogram onSelect={(data) => this.onSelect(data)}/>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired,
  dispatch: PropTypes.func
};

export default Editor;
