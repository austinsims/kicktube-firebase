// @flow

export const types = {
  UPDATE_LOADING_MESSAGE: 'UPDATE_LOADING_MESSAGE',
};

export function updateLoadingMessage(message: string) {
  return {
    type: types.UPDATE_LOADING_MESSAGE,
    message,
  };
}
