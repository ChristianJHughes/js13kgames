let drawText = ({ text, color, size, x, y, align = 'left' }) => {
  let canvas = kontra.canvas.getContext('2d');
  canvas.font = `${size || 48}px Courier New`;
  canvas.fillStyle = color || 'black';

  if (align === 'left') {
    canvas.fillText(text, x, y);
  } else if (align === 'right') {
    let width = canvas.measureText(text).width;
    canvas.fillText(text, x - width, y);
  } else if (align === 'center') {
    let width = canvas.measureText(text).width;
    canvas.fillText(text, x - width / 2, y);
  }
};

let drawWrappedText = ({ template, correct = '', incorrect = '', x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  let correctWords = correct.split(' ');
  let words = template.split(' ').map((item, index) => ({
    template: item + ' ',
    correct: correctWords[index] ? correctWords[index] : '',
    incorrect: index === correctWords.length - 1 ? incorrect : ''
  }));

  words.map((item) => {
    if (canvas.measureText(item.template).width + x > 1920) {
      x = 0;
      y += 48;
    }
    drawValidatedWord({
      template: item.template,
      correct: item.correct,
      incorrect: item.incorrect,
      x,
      y
    });
    x += canvas.measureText(item.template).width;
  });
};

let drawValidatedWord = ({ template, correct, incorrect, x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  let xOffset = 0;

  for (let i = 0; i < template.length; i++) {
    drawText({
      text: template.charAt(i),
      x: x + xOffset,
      y: y
    });
    drawText({
      text: correct.charAt(i),
      color: 'blue',
      x: x + xOffset,
      y: y
    });
    if (incorrect && i == correct.length) {
      drawText({
        text: incorrect,
        color: 'red',
        x: x + xOffset,
        y: y
      });
    }
    xOffset += canvas.measureText(template.charAt(i)).width;
  }
};

let drawValidatedText = ({ template, correct, incorrect, x, y }) => {
  drawWrappedText({
    template,
    correct,
    incorrect,
    x,
    y,
    hWidth: 1920
  });
};

let drawPostStatus = ({ mistakes, x, y }) => {
  let text = '';

  switch (mistakes) {
    case 0:
      text = 'Perfect Post!';
      break;
    case 1 || 2:
      text = 'That was almost perfect...';
      break;
    case 3:
      text = 'You are pretty bad.';
      break;
    default:
      text = 'You are literally garbage.';
  }

  drawText({
    text,
    color: 'blue',
    size: 32,
    x: x,
    y: y,
    align: 'right'
  });
};

let drawMistakes = ({ mistakes, x, y }) => {
  drawText({
    text: mistakes + ' post mistakes made!',
    color: 'blue',
    size: 32,
    x: x,
    y: y
  });
};

export default {
  drawMistakes,
  drawPostStatus,
  drawText,
  drawValidatedText,
  drawWrappedText
};
