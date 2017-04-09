import {Date} from './Date';
import {shallow} from 'enzyme';
import React from 'react';

import {
  makeEvent,
  makeEventsState,
  failTestOnPropTypeFailure,
} from '../util/testUtils';

failTestOnPropTypeFailure();

const items = [
  makeEvent({displayName: 'Foo', date: "2017-4-9"}),
  makeEvent({displayName: 'Bar', date: "2017-4-9"})
];
const events = makeEventsState({items});

const wrapper = shallow(<Date events={events} date="2017-4-9" />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});