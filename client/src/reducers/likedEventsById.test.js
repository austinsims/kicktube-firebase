import dislikedEventsById from './dislikedEventsById';
import {types, dislikeEvent} from '../actions/dislikedEventsById';

describe("dislikedEventsById reducer", () => {
  it('adds the event id to disliked IDs list', () => {
    const initialState = [1, 2];
    const action = dislikeEvent(3);
    const expectedState = [1, 2, 3];
    expect(dislikedEventsById(initialState, action)).toEqual(expectedState);
  });
});