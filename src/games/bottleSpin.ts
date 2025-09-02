import type {GameDef} from './truthOrDare';

const categories = [
  {id: 'classic', title: 'Classic', dataFile: 'classic.json'},
  {id: 'party', title: 'Party', premium: true, dataFile: 'party.json'}
];

export const bottleSpin: GameDef = {
  id: 'bottleSpin',
  titleKey: 'bottleSpin',
  categories,
};
