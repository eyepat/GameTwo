import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'classic', title: 'Classic', titleKey: 'classic', dataFile: 'classic.json'},
  {id: 'party', title: 'Party', titleKey: 'party', premium: true, dataFile: 'party.json'}
];

export const bottleSpin: GameDef = {
  id: 'bottleSpin',
  titleKey: 'bottleSpin',
  categories,
};
