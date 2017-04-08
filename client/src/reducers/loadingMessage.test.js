import loadingMessage from './loadingMessage';
import {types, updateLoadingMessage} from '../actions/loadingMessage';

describe("loadingMessage reducer", () => {
  it('changes the loading message', () => {
    const initialState = 'Foo Bar';
    const action = updateLoadingMessage('Baz Quux');
    expect(loadingMessage(initialState, action)).toEqual('Baz Quux');
  });
});