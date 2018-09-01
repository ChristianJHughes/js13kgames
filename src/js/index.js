import 'kontra/src/core';
import 'kontra/src/gameLoop';
import 'kontra/src/keyboard';
import audio from './utilities/audio';
import dictionary from './dictionary';
import gameState from './game-state';
import input from './utilities/input';
import text from './utilities/text';

let getCurrentSeconds = () => Math.round(performance.now() / 1000);

let getEstimatedTimeToType = (text) => Math.round(text.length / 2);

let getEarnedScore = ({ estTime, startTime, text, mistakes }) => {
  return Math.max(
    0,
    Math.round(
      (estTime / (getCurrentSeconds() - startTime)) * text.length - mistakes * 2
    )
  );
};

const SCREEN_BOUNDS = {
  minY: 40,
  maxY: 1080,
  minX: 0,
  maxX: 1920
};

let score = 0;

let postTemplate = dictionary.getParagraph(5);
let postTypedCorrectly = '';
let postTypedIncorrectly = '';
let postMistakes = 0;
let postStartTime = getCurrentSeconds(); // seconds
let postEstimatedTimeToFinish = getEstimatedTimeToType(postTemplate);
let completePosts = [];

let initializeInput = () => {
  let checkKeyCharacter = ({ key }) => {
    let nextCharToType = postTemplate.replace(postTypedCorrectly, '').charAt(0);
    if (nextCharToType === key) {
      postTypedCorrectly += key;
      postTypedIncorrectly = '';
      audio.playSound('success');

      if (postTemplate === postTypedCorrectly) {
        score += getEarnedScore({
          estTime: postEstimatedTimeToFinish,
          startTime: postStartTime,
          text: postTemplate,
          mistakes: postMistakes
        });
        completePosts.unshift(postTypedCorrectly);
        postStartTime = getCurrentSeconds();
        postTypedCorrectly = '';
        postMistakes = 0;
        postTemplate = dictionary.getParagraph(5);
        postEstimatedTimeToFinish = getEstimatedTimeToType(postTemplate);
      }
    } else {
      postMistakes++;
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
        x: SCREEN_BOUNDS.minX,
        y: SCREEN_BOUNDS.minY
      });
      text.drawValidatedText(
        postTemplate,
        postTypedCorrectly,
        postTypedIncorrectly,
        205,
        120
      );
      text.drawText({
        text: `Score: ${score}`,
        x: SCREEN_BOUNDS.maxX,
        y: SCREEN_BOUNDS.minY,
        color: 'green',
        align: 'right'
      });
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
        y: SCREEN_BOUNDS.minY
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
