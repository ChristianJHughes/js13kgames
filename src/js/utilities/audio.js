import '../vendor/jsfxr';

const sounds = {
  error: jsfxr([3,,0.266,0.7839,0.2227,0.0193,,0.1627,,,,0.4397,0.8998,,,,,,1,,,,,0.5]), // prettier-ignore
  success: jsfxr([1,,0.2255,,0.1663,0.897,0.0386,-0.6306,,,,,,0.6311,-0.593,,,,1,,,,,0.5]) // prettier-ignore
};

let createPlayer = () => new Audio();

let playSound = (sound) => {
  let player = createPlayer();
  player.src = sounds[sound];
  player.play();
};

export default {
  playSound
};
