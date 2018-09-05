let drawShape = ({ width, height, color = 'black', x, y, align = 'left' }) => {
  let canvas = kontra.canvas.getContext('2d');
  canvas.fillStyle = color;

  if (align === 'left') {
    canvas.fillRect(x, y, width, height);
  } else if (align === 'right') {
    canvas.fillRect(x - width, y, width, height);
  } else if (align === 'center') {
    canvas.fillRect(x - width / 2, y, width, height);
  }
};

export default {
  drawShape
};
