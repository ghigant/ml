import React, {PropTypes} from 'react';

import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import { read } from 'services/file';
import {getDomainsFromData, scaleLinear} from 'services/util';


import {initEditor} from 'state/actions/editor';

let Dashboard = ({dispatch, router}) => {
  // console.log(rest);
  const onImport = (file) => {
    read(file, (dataset) => {
      const {xDomain, yDomain} = getDomainsFromData(dataset);
      console.log(xDomain, yDomain);
      const width = 1024;
      const height = (1024) / 6;
      dispatch(initEditor(
        dataset,
        scaleLinear(xDomain, [0, width - 2 * 30]),
        scaleLinear(yDomain [0 + 30, height - 30]),
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

Dashboard = connect()(Dashboard);

export default Dashboard;
