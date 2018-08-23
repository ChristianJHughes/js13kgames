import 'kontra/src/core';
import 'kontra/src/gameLoop';
import 'kontra/src/keyboard';
import dictionary from './dictionary';
import gameState from './game-state';
import input from './utilities/input';
import text from './utilities/text';

const SCREEN_PADDING = {
  minY: 50,
  maxY: 595,
  minX: 0,
  maxX: 798
};

let textToType = dictionary.getParagraph(5);
let textAlreadyTyped = '';
let textTypedWrong = '';

let initializeInput = () => {
  let checkKeyCharacter = ({ key }) => {
    let nextCharToType = textToType.replace(textAlreadyTyped, '').charAt(0);
    if (nextCharToType === key) {
      textAlreadyTyped += key;
      textTypedWrong = '';
      gameState.checkWinCondition(textToType === textAlreadyTyped);
    } else {
      textTypedWrong = nextCharToType;
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
      text.drawValidatedText(
        textToType,
        textAlreadyTyped,
        textTypedWrong,
        205,
        120
      );
    },
    lostCallback: () => {
      text.drawText({
        text: 'You lost!',
        color: 'red',
        x: 0,
        y: SCREEN_PADDING.minY
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
