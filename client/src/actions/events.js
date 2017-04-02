/**
 * @param {?Array} events 
 */
export function setEvents(events) {
  return {
    type: 'SET_EVENTS',
    events,
  }
}