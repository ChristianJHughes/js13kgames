const validKeys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'space'
];

document.addEventListener(
  'keydown',
  (event) => event.key === 'Backspace' && event.preventDefault()
);

let bindKeys = (callback) =>
  validKeys.forEach((key) => kontra.keys.bind(key, callback));

let unBindKeys = () => kontra.keys.unbind(validKeys);

export default {
  bindKeys,
  unBindKeys
};
