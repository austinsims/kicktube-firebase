export function playNextVideo() {
  return {
    type: 'PLAY_NEXT_VIDEO',
  }
}

export function playPrevVideo() {
  return {
    type: 'PLAY_PREV_VIDEO',
  }
}

export function stopVideoPlayback() {
  return {
    type: 'STOP_VIDEO_PLAYBACK',
  }
}

export function playVideoAtIndex(index) {
  return {
    type: 'PLAY_VIDEO_AT_INDEX',
    index,
  }
}