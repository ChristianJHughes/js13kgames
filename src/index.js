import 'kontra/src/core';
import 'kontra/src/sprite';
import 'kontra/src/gameLoop';
import 'kontra/src/pointer';
import 'kontra/src/keyboard';
import 'kontra/src/assets';
import 'kontra/src/spriteSheet';
import 'kontra/src/tileEngine';
import text from './text/';

const GAME_STATES = { playing: 0, won: 1, lost: 2 };
let currentGameState = GAME_STATES.playing;
let validLetters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(
  ','
);
let textAlreadyTyped = '';
let textLeftToType = 'watermelon';

let checkWin = () => {
  if (
    textLeftToType === textAlreadyTyped &&
    currentGameState === GAME_STATES.playing
  ) {
    currentGameState = GAME_STATES.won;
  }
};

let initKeyboardInput = () => {
  let keyCallback = ({ key }) => {
    let nextCharToType = textLeftToType.replace(textAlreadyTyped, '').charAt(0);
    if (nextCharToType === key) {
      textAlreadyTyped += key;
      checkWin();
    }
  };
  validLetters.forEach((key) => {
    kontra.keys.bind(key, keyCallback);
  });
};

let main = () => {
  kontra.init();

  initKeyboardInput();

  let loop = kontra.gameLoop({
    update: () => {},
    render: () => {
      // Game State Machine
      switch (currentGameState) {
        case GAME_STATES.playing:
          text.drawText({ text: 'Type the text below to win:', x: 0, y: 25 });
          text.drawText({ text: textLeftToType, x: 0, y: 75 });
          text.drawText({ text: textAlreadyTyped, color: 'blue', x: 0, y: 75 });
          break;
        case GAME_STATES.won:
          text.drawText({
            text: 'You typed a word!',
            color: 'green',
            x: 0,
            y: 25
          });
          break;
        case GAME_STATES.lost:
          text.drawText({
            text: 'You lost!',
            color: 'red',
            x: 0,
            y: 25
          });
          break;
      }
    }
  });

  loop.start();
};

main();
