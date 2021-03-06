import {Calendar} from './Calendar';
import {shallow} from 'enzyme';
import React from 'react';

import {
  makeEvent,
  makeEventsState,
  failTestOnPropTypeFailure
} from '../util/testUtils';

failTestOnPropTypeFailure();

const items = [
  makeEvent({displayName: 'Foo'}),
  makeEvent({displayName: 'Bar'})
];
const events = makeEventsState({items});

const wrapper = shallow(
  <Calendar events={events}
            playVideoOfNextEventIfPresent={function() {}}
            stopVideoPlayback={function() {}}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});