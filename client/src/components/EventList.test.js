import {EventList} from './EventList';
import {shallow} from 'enzyme';
import EventCard from './EventCard'
import React from 'react';

import {
  makeEvent,
  makeEventsState,
  failTestOnPropTypeFailure,
} from '../util/testUtils';

failTestOnPropTypeFailure();

const items = [
  makeEvent({id: 1234, displayName: 'Foo', date: "2017-4-9"}),
  makeEvent({id: 4321, displayName: 'Bar', date: "2017-4-9"})
];
const events = makeEventsState({items});

const wrapper = shallow(
    <EventList events={events}
          title="My List Title"
          eventPredicate={event => event.id === 1234} />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});

it('shows only events matching the predicate', () => {
  expect(wrapper.find(EventCard)).toHaveLength(1);
});