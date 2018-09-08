import '../vendor/jsfxr';

let url = window.URL || window.webkitURL;

const sounds = {
  error: jsfxr([3,,0.266,0.7839,0.2227,0.0193,,0.1627,,,,0.4397,0.8998,,,,,,1,,,,,0.5]), // prettier-ignore
  success: jsfxr([1,,0.2255,,0.1663,0.897,0.0386,-0.6306,,,,,,0.6311,-0.593,,,,1,,,,,0.5]) // prettier-ignore
};

let createPlayer = () => new Audio();

let playSound = (sound) => {
  let player = createPlayer();
  let soundEffect = sounds[sound];
  player.src = soundEffect;
  player.play();
  player.addEventListener(
    'ended',
    function(e) {
      url.revokeObjectURL(soundEffect);
    },
    false
  );
};

export default {
  playSound
};
