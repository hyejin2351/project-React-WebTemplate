import React from 'react';
import { shallow } from 'enzyme';

import Page from '../submit';


describe('Submit Page', () => {
  it('is defined', () => {
    const app = shallow(<Page apolloState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
