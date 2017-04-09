import {createStore} from 'redux';
import rootReducer from './reducers/index';
import {defaultEventsState} from './reducers/events';

const defaultState = {
  loadingMessage: '',
  events: defaultEventsState,
};

const store = createStore(rootReducer, defaultState);

export default store;
