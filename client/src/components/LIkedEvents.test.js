import {LikedEvents} from './LikedEvents';
import {failTestOnPropTypeFailure} from '../util/testUtils';
import {shallow} from 'enzyme';
import React from 'react';

failTestOnPropTypeFailure();

describe('LikedEvents component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
        <LikedEvents eventPredicate={function() {}}
                     likedEventsById={[]}/>);
    expect(wrapper).toHaveLength(1);
  });
});