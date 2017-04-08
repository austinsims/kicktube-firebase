import {LoadingMessage} from './LoadingMessage';
import {shallow} from 'enzyme';
import React from 'react';

const wrapper = shallow(<LoadingMessage loadingMessage="Loading..." />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});