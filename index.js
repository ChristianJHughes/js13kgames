import 'kontra/src/core';
import 'kontra/src/sprite';
import 'kontra/src/gameLoop';
import 'kontra/src/pointer';
import 'kontra/src/keyboard';
import 'kontra/src/assets';
import 'kontra/src/spriteSheet';
import 'kontra/src/tileEngine';

let main = () => {
  kontra.init();

  let box = kontra.sprite({
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    color: 'black'
  });

  let loop = kontra.gameLoop({
    update: () => {},
    render: () => {
      box.render();
    }
  });

  loop.start();
};

main();
