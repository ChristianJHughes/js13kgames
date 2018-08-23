import 'kontra/src/core';
import 'kontra/src/gameLoop';
import 'kontra/src/keyboard';
import dictionary from './dictionary';
import gameState from './game-state';
import input from './utilities/input';
import text from './utilities/text';

const SCREEN_PADDING = {
  minY: 20,
  maxY: 595,
  minX: 0,
  maxX: 798
};

let textAlreadyTyped = '';
let textLeftToType = dictionary.getParagraph(5);

let initializeInput = () => {
  let checkKeyCharacter = ({ key }) => {
    let nextCharToType = textLeftToType.replace(textAlreadyTyped, '').charAt(0);
    if (nextCharToType === key) {
      textAlreadyTyped += key;
    }
  };
  input.bindKeys(checkKeyCharacter);
};

let renderState = () => {
  gameState.stateMachine({
    playingCallback: () => {
      text.drawText({
        text: 'Type the text below to win:',
        x: SCREEN_PADDING.minX,
        y: SCREEN_PADDING.minY
      });
      text.drawText({ text: textLeftToType, x: SCREEN_PADDING.minX, y: 75 });
      text.drawText({
        text: textAlreadyTyped,
        color: 'blue',
        x: SCREEN_PADDING.minX,
        y: 75
      });
    },
    lostCallback: () => {
      text.drawText({
        text: 'You lost!',
        color: 'red',
        x: 0,
        y: 25
      });
    }
  });
};

let startGame = () => {
  kontra.init();

  initializeInput();

  kontra
    .gameLoop({
      update: () => {},
      render: () => renderState()
    })
    .start();
};

startGame();
