import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'family', title: 'Family', titleKey: 'family', dataFile: 'family.json'},
  {id: 'funny', title: 'Funny', titleKey: 'funny', dataFile: 'funny.json'},
  {id: 'hard', title: 'Hard', titleKey: 'hard', premium: true, dataFile: 'hard.json'}
];

export const wouldYouRather: GameDef = {
  id: 'wouldYouRather',
  titleKey: 'wouldYouRather',
  categories,
};
