import {Date} from './Date';
import {failTestOnPropTypeFailure} from '../util/testUtils';
import {shallow} from 'enzyme';
import React from 'react';

failTestOnPropTypeFailure();

describe('Date component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Date date={"2017-4-4"}
                                  eventPredicate={function() {}}
                                  dislikedEventsById={[]}/>);
    expect(wrapper).toHaveLength(1);
  });
});