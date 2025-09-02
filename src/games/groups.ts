export type GameInGroup = { id: string; titleKey: string };

export type GameGroup = {
  id: string;
  titleKey: string; // i18n key for group name
  games: GameInGroup[];
};

export const gameGroups: GameGroup[] = [
  {
    id: 'couples',
    titleKey: 'couples',
    games: [
      {id: 'betterTogether', titleKey: 'betterTogether'},
      {id: 'karleksguide', titleKey: 'karleksguide'},
      {id: 'couplesChat', titleKey: 'couplesChat'},
    ],
  },
  {
    id: 'friendsParty',
    titleKey: 'friendsParty',
    games: [
      {id: 'questionsForHumans', titleKey: 'questionsForHumans'},
      {id: 'beHonestOrGetDrunk', titleKey: 'beHonestOrGetDrunk'},
      {id: 'drunkedApp', titleKey: 'drunkedApp'},
      {id: 'neverHaveIEver', titleKey: 'neverHaveIEver'},
    ],
  },
  {
    id: 'selfGrowth',
    titleKey: 'selfGrowth',
    games: [
      {id: 'discoverYourself', titleKey: 'discoverYourself'},
      {id: 'substance', titleKey: 'substance'},
      {id: 'mindfulTalk', titleKey: 'mindfulTalk'},
    ],
  },
  {
    id: 'familyGeneral',
    titleKey: 'familyGeneral',
    games: [
      {id: 'smileTalk', titleKey: 'smileTalk'},
      {id: 'howWellDoYouKnowMe', titleKey: 'howWellDoYouKnowMe'},
      {id: 'riddleMeThis', titleKey: 'riddleMeThis'},
    ],
  },
];
