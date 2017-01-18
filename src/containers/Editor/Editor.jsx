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

import {
  updateClustering,
  initEditor
} from 'state/actions/editor';

import {
  getDomainsFromData,
  scaleLinear,
  getBoardSize
} from 'services/util';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };
  }

  componentDidMount() {
    const {xDomain, yDomain} = getDomainsFromData(this.props.dataset);
    let {width, height} = getBoardSize(xDomain, yDomain);
    width += 60;
    height += 60;
    this.props.dispatch(initEditor(
      this.props.dataset,
      scaleLinear(xDomain, [30, width - 30]),
      scaleLinear(yDomain.reverse(), [30, height - 30]),
      width,
      height
    ));
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
        <div className={'grid'}>
          {
            this.props.isDendrogramVisible && (
              <Dendrogram onSelect={(data) => this.onSelect(data)}/>
            )
          }
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dataset: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  isDendrogramVisible: PropTypes.bool
};

export default Editor;
