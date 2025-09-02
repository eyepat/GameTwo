import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'family', title: 'Family', dataFile: 'family.json'},
  {id: 'funny', title: 'Funny', dataFile: 'funny.json'},
  {id: 'hard', title: 'Hard', premium: true, dataFile: 'hard.json'}
];

export const wouldYouRather: GameDef = {
  id: 'wouldYouRather',
  titleKey: 'games.wouldYouRather',
  categories,
};

