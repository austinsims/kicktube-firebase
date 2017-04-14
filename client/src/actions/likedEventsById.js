// @flow

export const types = {
  LIKE_EVENT: 'LIKE_EVENT',
  UNLIKE_EVENT: 'UNLIKE_EVENT',
}

export function likeEvent(eventId: number) {
  return {
    type: types.LIKE_EVENT,
    eventId,
  }
}

export function unlikeEvent(eventId: number) {
  return {
    type: types.UNLIKE_EVENT,
    eventId,
  }
}
