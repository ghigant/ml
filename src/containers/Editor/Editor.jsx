import './Editor.scss';

import React, {Component, PropTypes} from 'react';

import Header from 'components/Header/Header';
import EditorMenu from 'components/EditorMenu';
import CartesianSystem from 'components/CartesianSystem/CartesianSystem';
import Dendrogram from 'components/Dendrogram';

import {ButtonGroup, Button} from 'react-bootstrap';

import {
  default as clustering,
  singleLinkage,
  completeLinkage,
  averageLinkage
} from 'services/clustering/bottom-up';

import {addDataset} from 'state/actions/dashboard';
import { updateClustering, clearDataset } from 'state/actions/editor';
import {size} from 'lodash';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };
  }

  componentDidMount() {
    this.props.dispatch(updateClustering(null));
  }
  componentWillUnmount() {
    const {dispatch, dataset, routeParams} = this.props;
    if (size(dataset) && !routeParams.id) {
      dispatch(addDataset(dataset));
    }
    dispatch(clearDataset());
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
      <div className={'Editor container'} data-component={'Editor'}>
        <Header>
          <EditorMenu />
        </Header>
        <div className="row">
          <div className={'Editor__CartesianSystem'}>
            <CartesianSystem {...this.props} selected={this.state.selection}/>
          </div>
        </div>
        <div className="row">
            <ButtonGroup>
              <Button
                bsStyle="info"
                onClick={() => this.handleClustering(singleLinkage)}>
                Single Linkage
              </Button>
              <Button
                bsStyle="info"
                onClick={() => this.handleClustering(completeLinkage)}>
                Complete Linkage
              </Button>
              <Button
                bsStyle="info"
                onClick={() => this.handleClustering(averageLinkage)}>
                Average Linkage
              </Button>
            </ButtonGroup>
        </div>
        {
          this.props.isDendrogramVisible && (
            <div className={'row'}>
              <Dendrogram
                clustering={this.props.clustering}
                dataset={this.props.dataset}
                onSelect={(data) => this.onSelect(data)}/>
            </div>
          )
        }
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired,
  clustering: PropTypes.array,
  dispatch: PropTypes.func,
  routeParams: PropTypes.object,
  isDendrogramVisible: PropTypes.bool
};

export default Editor;
