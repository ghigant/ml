import React, {PropTypes} from 'react';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import {Link} from 'react-router';

import { read } from 'services/file';
import {connect} from 'react-redux';

import {
  getDomainsFromData,
  scaleLinear,
  getBoardSize
} from 'services/util';

import {initEditor} from 'state/actions/editor';
import {addDataset} from 'state/actions/dashboard';

let Dashboard = ({dispatch, router, datasets}) => {
  const onImport = (file) => {
    read(file, (dataset) => {
      const {xDomain, yDomain} = getDomainsFromData(dataset);
      const {width, height} = getBoardSize(xDomain, yDomain);

      dispatch(addDataset(dataset));

      dispatch(initEditor(
        dataset,
        scaleLinear(xDomain, [30, width - 30]),
        scaleLinear(yDomain.reverse(), [30, height - 30]),
        width,
        height
      ));
      router.push('/editor');
    });
  }

  return (
    <div className={'container'}>
      <Header>
        <Navigation onImport={onImport} />
      </Header>
      <div style={{paddingTop: "50px"}}>
        <h1>Dashboard</h1>
        <ul>
        {
          datasets.map((dataset, index) => (
            <li key={`dataset-${index}-${dataset.id}`}>
              <Link to={`/editor/${dataset.id}`}>{dataset.id}</Link>
            </li>
          ))
        }
        </ul>
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
  return {
    datasets: state.dashboard.datasets
  };
}

Dashboard = connect(mapToStateToProps)(Dashboard);

export default Dashboard;
