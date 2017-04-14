import {EventCard} from './EventCard';
import {shallow} from 'enzyme';
import React from 'react';

import {
  makeEvent,
  makeEventsState,
  failTestOnPropTypeFailure
} from '../util/testUtils';

failTestOnPropTypeFailure();

const eventId = 1234;
const items = [makeEvent({id: eventId})];
const events = makeEventsState({items});

describe('EventCard component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
        <EventCard eventId={eventId}
                   events={events}
                   dislikeEvent={function() {}}
                   likeEvent={function() {}}
                   unlikeEvent={function() {}}
                   dislikedEventsById={[]}
                   likedEventsById={[]} />);
    expect(wrapper).toHaveLength(1);
  });
});