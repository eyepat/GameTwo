import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'family', title: 'Family', dataFile: 'family.json'},
  {id: 'friends', title: 'Friends', dataFile: 'friends.json'},
  {id: 'daring', title: 'Daring', premium: true, dataFile: 'daring.json'},
  {id: 'action', title: 'Action', dataFile: 'action.json'},
  {id: 'drunk', title: 'Drunk', premium: true, dataFile: 'drunk.json'},
  {id: 'sexual', title: '18+', premium: true, dataFile: 'sexual.json'}
];

export const neverHaveIEver: GameDef = {
  id: 'neverHaveIEver',
  titleKey: 'games.neverHaveIEver',
  categories,
};

