const dictionary = [
  'clean',
  'effect',
  'expand',
  'understood',
  'unfasten',
  'right',
  'flow',
  'count',
  'resonant',
  'dress',
  'spade',
  'confuse',
  'fear',
  'supply',
  'different',
  'diligent',
  'fantastic',
  'gifted',
  'lace',
  'synonymous',
  'hover',
  'grin',
  'mindless',
  'launch',
  'riddle',
  'stretch',
  'mean',
  'match',
  'baby',
  'minister',
  'colorful',
  'miscreant',
  'deserve',
  'ladybug',
  'shrug',
  'hair',
  'billowy',
  'defiant',
  'signal',
  'yell',
  'capable',
  'promise',
  'payment',
  'separate',
  'lazy',
  'suspect',
  'decisive',
  'line',
  'slow',
  'smiling',
  'known',
  'field',
  'aloof',
  'oranges',
  'furtive',
  'irritate',
  'greet',
  'reward',
  'scrub',
  'assorted',
  'icicle',
  'bomb',
  'flood',
  'breathe',
  'force',
  'airplane',
  'clever',
  'famous',
  'protest',
  'moon',
  'tax',
  'ceaseless',
  'abortive',
  'present',
  'overt',
  'motion',
  'childlike',
  'workable',
  'spell',
  'love',
  'nail',
  'butter',
  'flame',
  'skin',
  'wistful',
  'proud',
  'absent',
  'vagabond',
  'queen',
  'coach',
  'craven',
  'dam',
  'unpack',
  'baseball',
  'back',
  'jeans',
  'magenta',
  'scarf',
  'violet',
  'guess'
];

let getParagraph = (length) => {
  let paragraph = [];

  for (let i = 0; i < length; i++) {
    paragraph.push(dictionary[Math.round(Math.random() * dictionary.length)]);
  }
  return paragraph.join(' ');
};

export default {
  getParagraph
};
