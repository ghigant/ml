import React, {PropTypes} from 'react';

import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import { read } from 'services/file';
import {getDomainsFromData, scaleLinear} from 'services/util';
import {max} from 'lodash';

import {initEditor} from 'state/actions/editor';

let Dashboard = ({dispatch, router}) => {
  const onImport = (file) => {
    read(file, (dataset) => {
      const {xDomain, yDomain} = getDomainsFromData(dataset);
      let width = 1024;
      let height = (1024) / (max(xDomain) / max(yDomain));
      if (height === 0) {
        height = 2 * 30;
      }

      if (width === height) {
        width = height = 400;
      }

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
      </div>
    </div>
  );
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};

Dashboard.propTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func
}

Dashboard = connect()(Dashboard);

export default Dashboard;
