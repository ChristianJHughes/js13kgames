import 'kontra/src/core';
// import 'kontra/src/sprite';
import 'kontra/src/gameLoop';
// import 'kontra/src/pointer';
import 'kontra/src/keyboard';
// import 'kontra/src/assets';
// import 'kontra/src/spriteSheet';
// import 'kontra/src/tileEngine';

// ===== Sprites
import postSprite from './sprites/post';

// ===== Utilities
import './utilities/debug'; // Remove for final build
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

let spritePool = [];

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
      text.drawText({
        text: 'Type the text below to win:',
        x: SCREEN_PADDING.minX,
        y: SCREEN_PADDING.minY
      });
      text.drawText({ text: textLeftToType, x: 205, y: 75 });
      text.drawText({ text: textAlreadyTyped, color: 'blue', x: 205, y: 75 });
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

  spritePool.push(postSprite());

  let loop = kontra.gameLoop({
    update: () => {
      spritePool.forEach((item) => item.render());
    },
    render: () => {
      spritePool.forEach((item) => item.render());
      renderState();
    }
  });

  loop.start();
};

startGame();
