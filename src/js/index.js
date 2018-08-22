import 'kontra/src/core';
import 'kontra/src/sprite';
import 'kontra/src/gameLoop';
import 'kontra/src/pointer';
import 'kontra/src/keyboard';
import 'kontra/src/assets';
import 'kontra/src/spriteSheet';
import 'kontra/src/tileEngine';
import text from './utilities/text';
import gameState from './game-state';
import dictionary from './dictionary';
import input from './utilities/input';

let textAlreadyTyped = '';
let textLeftToType = dictionary.getParagraph(5);

let initInput = () => {
  let checkKeyCharacter = ({ key }) => {
    let nextCharToType = textLeftToType.replace(textAlreadyTyped, '').charAt(0);
    if (nextCharToType === key) {
      textAlreadyTyped += key;
      gameState.checkWinCondition(textLeftToType === textAlreadyTyped);
    }
  };
  input.bindKeys({ keys: input.validLetters, callback: checkKeyCharacter });
};

let renderState = () => {
  gameState.stateMachine({
    playingCallback: () => {
      text.drawText({ text: 'Type the text below to win:', x: 0, y: 25 });
      text.drawText({ text: textLeftToType, x: 0, y: 75 });
      text.drawText({ text: textAlreadyTyped, color: 'blue', x: 0, y: 75 });
    },
    wonCallback: () => {
      text.drawText({
        text: 'You typed the text!',
        color: 'green',
        x: 0,
        y: 25
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

  initInput();

  let loop = kontra.gameLoop({
    update: () => {},
    render: () => {
      renderState();
    }
  });

  loop.start();
};

startGame();
