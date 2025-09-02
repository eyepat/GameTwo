import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'family', title: 'Family', titleKey: 'family', dataFile: 'family.json'},
  {id: 'friends', title: 'Friends', titleKey: 'friends', dataFile: 'friends.json'},
  {id: 'daring', title: 'Daring', titleKey: 'daring', premium: true, dataFile: 'daring.json'},
  {id: 'action', title: 'Action', titleKey: 'action', dataFile: 'action.json'},
  {id: 'drunk', title: 'Drunk', titleKey: 'drunk', premium: true, dataFile: 'drunk.json'},
  {id: 'sexual', title: '18+', titleKey: 'sexual', premium: true, dataFile: 'sexual.json'}
];

export const neverHaveIEver: GameDef = {
  id: 'neverHaveIEver',
  titleKey: 'neverHaveIEver',
  categories,
};
