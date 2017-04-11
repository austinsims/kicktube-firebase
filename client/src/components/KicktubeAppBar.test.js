import {shallow} from 'enzyme';
import {KicktubeAppBar} from './KicktubeAppBar';
import React from 'react';

const wrapper = shallow(<KicktubeAppBar />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});
