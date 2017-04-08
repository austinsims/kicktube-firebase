import {Calendar} from './Calendar';
import {shallow} from 'enzyme';
import React from 'react';

const wrapper = shallow(
  <Calendar events={[{displayName: 'Foo'}, {displayName: 'Bar'}]}
            playVideoOfNextEventIfPresent={function() {}}
            stopVideoPlayback={function() {}}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});