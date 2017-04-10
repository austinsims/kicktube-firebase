import {failTestOnPropTypeFailure, makeEventsState} from '../util/testUtils';
import {SeeMoreButton} from './SeeMoreButton';
import {shallow} from 'enzyme';
import React from 'react';

failTestOnPropTypeFailure();

const events = makeEventsState();
const wrapper = shallow(
    <SeeMoreButton fetchEvents={function() {}}
                   events={events}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});