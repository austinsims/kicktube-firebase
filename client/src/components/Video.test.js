import {Video} from './Video';
import {shallow} from 'enzyme';
import React from 'react';
import {makeEvent} from '../util/testUtils';

const events = [makeEvent({
  displayName: 'FizzBuzz at Magic Castle',
  videoIsPlaying: false,
  videoId: '0xDEADBEEF',
})];

it('renders without crashing', () => {
  const wrapper = shallow(
      <Video youtubeVideoId="0xDEADBEEF"
            playVideoByYoutubeId={function() {}}
            playVideoOfNextEventIfPresent={function() {}}
            events={events} />);
  expect(wrapper).toHaveLength(1);
});

it('crashes if given an invalid id', () => {
  expect(() => {
    shallow(<Video youtubeVideoId="invalid"
                   playVideoByYoutubeId={function() {}}
                   playVideoOfNextEventIfPresent={function() {}}
                   events={events} />);
  }).toThrow();
});