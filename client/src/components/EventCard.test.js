import EventCard from './EventCard';
import {shallow} from 'enzyme';
import React from 'react';

const event = {
  displayName: 'Foo',
  uri: 'https://songkick.com/blah',
  venue: {displayName: 'Bar Theatre'},
  videoId: '0xDEADBEEF',
};
const wrapper = shallow(<EventCard event={event} />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});