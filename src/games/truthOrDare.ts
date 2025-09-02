export type Category = {
  id: string;
  title: string;
  premium?: boolean;
  dataFile: string; // relative to src/categories/truthOrDare
};

export type GameDef = {
  id: string;
  titleKey: string; // i18n key
  categories: Category[];
};

const categories: Category[] = [
  {id: 'family', title: 'Family', dataFile: 'family.json'},
  {id: 'friends', title: 'Friends', dataFile: 'friends.json'},
  {id: 'party', title: 'Party', premium: true, dataFile: 'party.json'},
  {id: 'daring', title: 'Daring', premium: true, dataFile: 'daring.json'}
];

export const truthOrDare: GameDef = {
  id: 'truthOrDare',
  titleKey: 'truthOrDare',
  categories,
};
