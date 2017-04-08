import {App} from './App';
import {shallow} from 'enzyme';
import React from 'react';

const wrapper = shallow(
  <App loadingMessage={'Loading...'}
       events={[{displayName: 'Foo'}, {displayName: 'Bar'}]}
       updateLoadingMessage={function() {}}
       appendEvents={function() {}}/>);

it('renders without crashing', () => {
  expect(wrapper).toHaveLength(1);
});
