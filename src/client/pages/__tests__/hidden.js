import React from 'react';
import { shallow } from 'enzyme';

import Page from '../hidden';


describe('Hidden Posts Page', () => {
  it('is defined', () => {
    const app = shallow(<Page apolloState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
