import 'kontra/src/core';

let drawText = ({ text, color, size, x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  canvas.font = `${size || 24}px Arial`;
  canvas.fillStyle = color || 'black';
  canvas.fillText(text, x, y);
};

export default {
  drawText
};
