import 'kontra/src/core';

let wrapText = ({ text, x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  let words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let lineWidth = canvas.measureText(testLine).width;

    if (x + lineWidth > 798 && i > 0) {
      canvas.fillText(line, x, currentY);
      line = words[i] + ' ';
      currentY += 24;
    } else {
      line = testLine;
    }
  }

  canvas.fillText(line, x, currentY);
};

let drawText = ({ text, color, size, x, y }) => {
  let canvas = kontra.canvas.getContext('2d');
  canvas.font = `${size || 24}px Arial`;
  canvas.fillStyle = color || 'black';
  wrapText({ text, x, y });
};

export default {
  drawText
};
