import React, {PropTypes} from 'react';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

import { read } from 'services/file';
import {connect} from 'react-redux';
import {size} from 'lodash';

// import {initEditor} from 'state/actions/editor';
import {addDataset, removeDataset} from 'state/actions/dashboard';

let Dashboard = ({dispatch, router, datasets}) => {
  const onImport = (file) => {
    read(file, (dataset) => {
      if (size(dataset)) {
        const action = addDataset(dataset);
        dispatch(action);
        router.push(`/editor/${action.id}`);
      }
    });
  }

  const onRemove = (datasetId) => {
    dispatch(removeDataset(datasetId));
  };

  return (
    <div className={'container'}>
      <Header>
        <Navigation onImport={onImport} />
      </Header>
      <div style={{paddingTop: "70px"}}>
        <div className={'row'}>
        {
          datasets.map((dataset, index) => (
            <div
              className={"col-xs-6 col-md-3"}
              key={`dataset-${index}-${dataset.id}`}
            >
              <div className={'thumbnail'}>
                <Link
                  to={`/editor/${dataset.id}`}>
                  <svg
                    className="placeholder"
                    width={170}
                    height={170}>
                  </svg>
                </Link>
                <div className={'caption'}>
                  <Link
                    className={'btn btn-primary'}
                    to={`/editor/${dataset.id}`}>
                    {'Open'}
                  </Link>
                  <Button
                    bsStyle={'danger'}
                    onClick={() => onRemove(dataset.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    </div>
  );
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};

Dashboard.propTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  datasets: PropTypes.array
};

const mapToStateToProps = (state) => {
  const {datasets} = state.dashboard;
  return {
    datasets
  };
}

Dashboard = connect(mapToStateToProps)(Dashboard);

export default Dashboard;
