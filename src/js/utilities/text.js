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

let drawWrappedText = ({ template, correct, incorrect, x, y, hWidth }) => {
  let canvas = kontra.canvas.getContext('2d');
  let stringWidthOffset = 0;
  let stringHeightOffset = 48;
  let correctWords = correct.split(' ');
  let words = template.split(' ').map((item, index) => ({
    template: item + ' ',
    correct: correctWords[index] ? correctWords[index] : '',
    incorrect: index === correctWords.length - 1 ? incorrect : ''
  }));

  words.map((item) => {
    if (canvas.measureText(item.template).width + stringWidthOffset > hWidth) {
      stringWidthOffset = 0;
      stringHeightOffset += 48;
    }
    for (let i = 0; i < item.template.length; i++) {
      drawText({
        text: item.template.charAt(i),
        x: x + stringWidthOffset,
        y: y + stringHeightOffset
      });
      drawText({
        text: item.correct.charAt(i),
        color: 'blue',
        x: x + stringWidthOffset,
        y: y + stringHeightOffset
      });
      if (incorrect && i == item.correct.length) {
        drawText({
          text: item.incorrect,
          color: 'red',
          x: x + stringWidthOffset,
          y: y + stringHeightOffset
        });
      }
      stringWidthOffset += canvas.measureText(item.template.charAt(i)).width;
    }
  });
};

let drawValidatedText = ({ template, correct, incorrect, x, y, align }) => {
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
  drawText,
  drawValidatedText,
  drawPostStatus,
  drawMistakes
};
