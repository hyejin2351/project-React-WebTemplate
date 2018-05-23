import React from 'react';
import { shallow } from 'enzyme';

import Page from '../user';


describe('User Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
