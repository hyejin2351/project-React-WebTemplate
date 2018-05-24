import React from 'react';

import Main from '../components/layouts/Main';
import withData from '../helpers/withData';

import data from '../../server/sample-data/SampleData';

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <h1>Change PW</h1>
  </Main>
));
