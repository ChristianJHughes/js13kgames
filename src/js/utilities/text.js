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

let drawValidatedText = ({ template, correct, incorrect, x, y, align }) => {
  let stringWidthOffset = 0;
  let canvas = kontra.canvas.getContext('2d');
  for (let i = 0; i < template.length; i++) {
    drawText({
      text: template.charAt(i),
      x: x + stringWidthOffset,
      y,
      align
    });
    drawText({
      text: correct.charAt(i),
      color: 'blue',
      x: x + stringWidthOffset,
      y,
      align
    });
    if (incorrect && i == correct.length) {
      drawText({
        text: incorrect,
        color: 'red',
        x: x + stringWidthOffset,
        y,
        align
      });
    }
    stringWidthOffset += canvas.measureText(template.charAt(i)).width;
  }
};

export default {
  drawText,
  drawValidatedText
};
