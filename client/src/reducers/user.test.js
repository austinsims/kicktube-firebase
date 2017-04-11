import user from './user';
import {types, setUser} from '../actions/user';

describe("user reducer", () => {
  it('sets the user when logging in', () => {
    const initialState = null;
    const chuck = {displayName: 'Chuck'};
    const action = setUser(chuck);
    expect(user(initialState, action)).toEqual(chuck);
  });
});