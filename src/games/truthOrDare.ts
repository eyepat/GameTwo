export type Category = {
  id: string;
  title: string;
  titleKey?: string;
  premium?: boolean;
  dataFile: string; // relative to src/categories/<game>
};

export type GameDef = {
  id: string;
  titleKey: string; // i18n key
  categories: Category[];
};

const categories: Category[] = [
  {id: 'family', title: 'Family', titleKey: 'family', dataFile: 'family.json'},
  {id: 'friends', title: 'Friends', titleKey: 'friends', dataFile: 'friends.json'},
  {id: 'party', title: 'Party', titleKey: 'party', premium: true, dataFile: 'party.json'},
  {id: 'daring', title: 'Daring', titleKey: 'daring', premium: true, dataFile: 'daring.json'}
];

export const truthOrDare: GameDef = {
  id: 'truthOrDare',
  titleKey: 'truthOrDare',
  categories,
};
