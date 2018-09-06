const GAME_STATES = { playing: 0, lost: 1 };

let currentGameState = GAME_STATES.playing;

let setGameState = (state) => {
  currentGameState = GAME_STATES[state];
};

let checkLossCondition = (condition) => {
  if (currentGameState === GAME_STATES.playing && condition) {
    currentGameState = GAME_STATES.lost;
    return true;
  } else {
    return false;
  }
};

let stateMachine = ({ playingCallback, lostCallback }) => {
  switch (currentGameState) {
    case GAME_STATES.playing:
      playingCallback();
      break;
    case GAME_STATES.lost:
      lostCallback();
      break;
  }
};

export default {
  setGameState,
  checkLossCondition,
  stateMachine
};
