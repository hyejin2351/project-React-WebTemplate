import React from 'react';
import { shallow } from 'enzyme';

import Page from '../threads';


describe('Threads Page', () => {
  it('is defined', () => {
    const app = shallow(<Page apolloState={{ apollo: {} }} />);
    expect(app).toBeDefined();
  });
});
