import React from 'react';
import { shallow } from 'enzyme';

import Page from '../dmca';


describe('DMCA Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
