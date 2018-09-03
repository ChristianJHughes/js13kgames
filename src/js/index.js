import 'kontra/src/core';
import 'kontra/src/gameLoop';
import 'kontra/src/keyboard';
import audio from './utilities/audio';
import dictionary from './dictionary';
import gameState from './game-state';
import input from './utilities/input';
import text from './utilities/text';
import ui from './ui';

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

let score = 0;
let selfEsteem = 100;

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
        selfEsteem = 100;
      }
    } else {
      postMistakes++;
      postTypedIncorrectly = nextCharToType === ' ' ? '_' : nextCharToType;
      audio.playSound('error');
    }
  };
  input.bindKeys(checkKeyCharacter);
};

let renderState = () => {
  gameState.stateMachine({
    playingCallback: () => {
      completePosts.map((item, index) => {
        text.drawText({
          text: item,
          x: 5,
          y: 192 + 48 * (index + 1),
          color: 'gray'
        });
      });
      text.drawValidatedText({
        template: postTemplate,
        correct: postTypedCorrectly,
        incorrect: postTypedIncorrectly,
        x: 5,
        y: 192
      });
    },
    lostCallback: () => {
      text.drawText({
        text: 'You lost!',
        color: 'red',
        x: 1920 / 2,
        y: 1080 / 2 - 50,
        size: 100,
        align: 'center'
      });
      text.drawText({
        text: `Total Score: ${score}`,
        x: 1920 / 2,
        y: 1080 / 2 + 10,
        align: 'center'
      });
      text.drawText({
        text: 'Refresh to try again',
        x: 1920 / 2,
        y: 1080 / 2 + 52,
        size: 32,
        align: 'center'
      });
    }
  });
  ui.drawGameUi({ score, meter: selfEsteem });
};

let startGame = () => {
  kontra.init();

  initializeInput();

  kontra
    .gameLoop({
      update: () => {
        gameState.stateMachine({
          playingCallback: () => {
            gameState.checkLossCondition(selfEsteem <= 0);
            selfEsteem -= 0.0833; // 5% per second
          },
          lostCallback: () => {}
        });
      },
      render: () => renderState()
    })
    .start();
};

startGame();
