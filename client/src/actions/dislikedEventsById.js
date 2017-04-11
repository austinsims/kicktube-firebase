// @flow

export const types = {
  DISLIKE_EVENT: 'DISLIKE_EVENT',
}

export function dislikeEvent(eventId: number) {
  return {
    type: types.DISLIKE_EVENT,
    eventId,
  }
}
