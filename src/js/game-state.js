const GAME_STATES = { playing: 0, won: 1, lost: 2 };

let currentGameState = GAME_STATES.playing;

let checkWinCondition = (condition) => {
  if (currentGameState === GAME_STATES.playing && condition) {
    currentGameState = GAME_STATES.won;
    return true;
  } else {
    return false;
  }
};

let stateMachine = ({ playingCallback, wonCallback, lostCallback }) => {
  switch (currentGameState) {
    case GAME_STATES.playing:
      playingCallback();
      break;
    case GAME_STATES.won:
      wonCallback();
      break;
    case GAME_STATES.lost:
      lostCallback();
      break;
  }
};

export default {
  checkWinCondition,
  stateMachine
};
