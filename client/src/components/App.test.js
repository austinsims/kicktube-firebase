import {App} from './App';
import {shallow} from 'enzyme';
import React from 'react';
import {makeEvent} from '../util/testUtils';

const events = [
  makeEvent({displayName: 'Foo'}),
  makeEvent({displayName: 'Bar'})
];

const wrapper = shallow(
  <App loadingMessage={'Loading...'}
       events={events}
       updateLoadingMessage={function() {}}
       appendEvents={function() {}}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});
