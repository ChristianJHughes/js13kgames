import text from './utilities/text';
import shape from './utilities/shape';

let drawMeter = (percentage) => {
  shape.drawShape({
    width: 1920,
    height: 10,
    color: 'red',
    x: 0,
    y: 0
  });
  shape.drawShape({
    width: (1920 / 100) * percentage,
    height: 10,
    color: 'green',
    x: 0,
    y: 0
  });
  text.drawText({
    text: `Self Esteem: ${Math.round(percentage)}%`,
    x: 5,
    y: 40,
    size: 30,
    color: 'white'
  });
};

let drawScore = (score) => {
  text.drawText({
    text: `Score: ${score}`,
    x: 1915,
    y: 40,
    size: 30,
    color: 'white',
    align: 'right'
  });
};

let drawGameUi = ({ score, meter }) => {
  shape.drawShape({
    width: 1920,
    height: 45,
    color: '#444',
    x: 0,
    y: 10
  });
  drawScore(score);
  drawMeter(meter);
};

export default {
  drawGameUi
};
