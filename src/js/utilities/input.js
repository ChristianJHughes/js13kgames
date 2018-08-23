const validLetters = [
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
  validLetters.forEach((key) => kontra.keys.bind(key, callback));

export default {
  bindKeys
};
