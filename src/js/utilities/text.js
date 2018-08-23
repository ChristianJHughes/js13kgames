let drawText = ({ text, color, size, x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  canvas.font = `${size || 48}px Courier New`;
  canvas.fillStyle = color || 'black';
  canvas.fillText(text, x, y);
};

let drawValidatedText = (
  textToType,
  textAlreadyTyped,
  textTypedWrong,
  xCoor,
  yCoor
) => {
  let stringWidthOffset = 0;
  let canvas = kontra.canvas.getContext('2d');
  for (let i = 0; i < textToType.length; i++) {
    drawText({
      text: textToType.charAt(i),
      x: xCoor + stringWidthOffset,
      y: yCoor
    });
    drawText({
      text: textAlreadyTyped.charAt(i),
      color: 'blue',
      x: xCoor + stringWidthOffset,
      y: yCoor
    });
    if (textTypedWrong && i == textAlreadyTyped.length) {
      drawText({
        text: textTypedWrong,
        color: 'red',
        x: xCoor + stringWidthOffset,
        y: yCoor
      });
    }
    stringWidthOffset += canvas.measureText(textToType.charAt(i)).width;
  }
};

export default {
  drawText,
  drawValidatedText
};
