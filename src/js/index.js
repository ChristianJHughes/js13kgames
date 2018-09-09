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

let score;
let selfEsteem;

let postTemplate;
let postTypedCorrectly;
let postTypedIncorrectly;
let postMistakes;
let postStartTime; // seconds
let postEstimatedTimeToFinish;
let completePosts;

let initializeGameData = () => {
  score = 0;
  selfEsteem = 100;
  postTemplate = dictionary.getParagraph(5);
  postTypedCorrectly = '';
  postTypedIncorrectly = '';
  postMistakes = 0;
  postStartTime = getCurrentSeconds(); // seconds
  postEstimatedTimeToFinish = getEstimatedTimeToType(postTemplate);
  completePosts = [];
};

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
    startCallback: () => {
      text.drawText({
        text: 'Welcome',
        color: 'red',
        x: 1920 / 2,
        y: 1080 / 2 - 50,
        size: 100,
        align: 'center'
      });
      text.drawText({
        text: `Type posts quickly to increase your ever waning self-esteem.`,
        x: 1920 / 2,
        y: 1080 / 2 + 10,
        align: 'center'
      });
      text.drawText({
        text: 'Press enter to start',
        x: 1920 / 2,
        y: 1080 / 2 + 52,
        size: 32,
        align: 'center'
      });
    },
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
        text: 'Press enter to try again',
        x: 1920 / 2,
        y: 1080 / 2 + 52,
        size: 32,
        align: 'center'
      });
    }
  });
  ui.drawGameUi({ score, meter: selfEsteem });
};

let updateState = () => {
  gameState.stateMachine({
    startCallback: () => {
      kontra.keys.bind('enter', () => {
        kontra.keys.unbind('enter');
        gameState.setGameState('playing');
      });
    },
    playingCallback: () => {
      gameState.checkLossCondition(selfEsteem <= 0);
      selfEsteem -= 0.0833; // 5% per second
    },
    lostCallback: () => {
      kontra.keys.bind('enter', () => {
        kontra.keys.unbind('enter');
        initializeGameData();
        initializeInput();
        gameState.setGameState('playing');
      });
    }
  });
};

let startGame = () => {
  kontra.init();

  initializeGameData();
  initializeInput();

  kontra
    .gameLoop({
      update: () => updateState(),
      render: () => renderState()
    })
    .start();
};

startGame();
