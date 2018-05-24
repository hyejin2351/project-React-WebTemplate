import React from 'react';

import Main from '../components/layouts/Main';
import withData from '../helpers/withData';

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <span>total</span>
  </Main>
));
