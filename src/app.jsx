import ReactDOM from 'react-dom';
import React from 'react';
// import {chain, min, first, concat} from 'lodash';

import App from 'containers/App/App';

//
// import {supportFileApi} from 'services/file';
// import FileReader from 'components/FileReader';
// import FileButton from 'components/FileButton/FileButton.jsx';
// import CartesianSystem from 'components/CartesianSystem/CartesianSystem';

// const App = () => {
//   return (
//     <div className={'container'}>
//       <h1>ML Clustering</h1>
//       <FileButton label={'Browse'} />
//       <CartesianSystem />
//       {
//         supportFileApi() && (
//           <FileReader onData={(data) => {
//             console.log(data);
//             var minX = chain(data)
//               .reduce((list, point) => concat(list, first(point)), [])
//               .min()
//               .value();
//
//             var minY = chain(data)
//               .reduce((list, point) => concat(list, point[1]), [])
//               .min()
//               .value();
//           }}/>
//         )
//       }
//     </div>
//   );
// };

ReactDOM.render(<App />, document.getElementById('viewport'));
