import {Video} from './Video';
import {shallow} from 'enzyme';
import React from 'react';

const events = [{
  displayName: 'FizzBuzz at Magic Castle',
  videoIsPlaying: false,
  videoId: '0xDEADBEEF',
}];

const wrapper = shallow(
    <Video youtubeVideoId="0xDEADBEEF"
           playVideoByYoutubeId={function() {}}
           playVideoOfNextEventIfPresent={function() {}}
           events={events} />);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});