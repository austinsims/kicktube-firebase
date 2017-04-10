import App from './App';
import {shallow} from 'enzyme';
import React from 'react';

const wrapper = shallow(<App />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});
