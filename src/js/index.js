import 'kontra/src/core';
import 'kontra/src/gameLoop';
import 'kontra/src/keyboard';
import audio from './utilities/audio';
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

let postTemplate = dictionary.getParagraph(5);
let postTypedCorrectly = '';
let postTypedIncorrectly = '';
let completePosts = [];

let initializeInput = () => {
  let checkKeyCharacter = ({ key }) => {
    let nextCharToType = postTemplate.replace(postTypedCorrectly, '').charAt(0);
    if (nextCharToType === key) {
      postTypedCorrectly += key;
      postTypedIncorrectly = '';
      audio.playSound('success');

      if (postTemplate === postTypedCorrectly) {
        completePosts.unshift(postTypedCorrectly);
        postTypedCorrectly = '';
        postTemplate = dictionary.getParagraph(5);
      }
    } else {
      postTypedIncorrectly = nextCharToType;
      audio.playSound('error');
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
      text.drawValidatedText(
        postTemplate,
        postTypedCorrectly,
        postTypedIncorrectly,
        205,
        120
      );
      completePosts.map((item, index) => {
        text.drawText({
          text: item,
          x: 205,
          y: 120 + 60 * (index + 1),
          color: 'gray'
        });
      });
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
