import React from 'react';
import { shallow } from 'enzyme';

import Page from '../newsfaq';


describe('FAQ Page', () => {
  it('is defined', () => {
    const app = shallow(<Page apolloState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
