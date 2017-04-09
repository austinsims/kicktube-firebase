import {Calendar} from './Calendar';
import {shallow} from 'enzyme';
import React from 'react';
import {makeEvent} from '../util/testUtils';

const events = [
  makeEvent({displayName: 'Foo'}),
  makeEvent({displayName: 'Bar'})
];

const wrapper = shallow(
  <Calendar events={events}
            playVideoOfNextEventIfPresent={function() {}}
            stopVideoPlayback={function() {}}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});