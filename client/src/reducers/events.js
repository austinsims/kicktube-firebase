export default function events(state = null, action) {
  if (action.type !== 'SET_EVENTS') {
    return state;
  }
  return action.events;
}