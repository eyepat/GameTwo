export type GameInGroup = { id: string; titleKey: string };

export type GameGroup = {
  id: string;
  titleKey: string; // i18n key for group name
  games: GameInGroup[];
};

export const gameGroups: GameGroup[] = [
  {
    id: 'couples',
    titleKey: 'Couples',
    games: [
      {id: 'betterTogether', titleKey: 'Better Together'},
      {id: 'karleksguide', titleKey: 'Love guide'},
      {id: 'couplesChat', titleKey: 'Couples Chat'},
    ],
  },
  {
    id: 'friendsParty',
    titleKey: 'Friends Party',
    games: [
      {id: 'questionsForHumans', titleKey: 'Questions For Humans'},
      {id: 'beHonestOrGetDrunk', titleKey: 'Be Honest Or Get Drunk'},
      {id: 'drunkedApp', titleKey: 'Drunked app'},
      {id: 'neverHaveIEver', titleKey: 'Never Have I Ever'},
    ],
  },
  {
    id: 'selfGrowth',
    titleKey: 'Self Growth',
    games: [
      {id: 'discoverYourself', titleKey: 'Discover Yourself'},
      {id: 'substance', titleKey: 'substance'},
      {id: 'mindfulTalk', titleKey: 'Mind FulTalk'},
    ],
  },
  {
    id: 'familyGeneral',
    titleKey: 'Family',
    games: [
      {id: 'smileTalk', titleKey: 'Smile Talk'},
      {id: 'howWellDoYouKnowMe', titleKey: 'How Well Do You KnowMe'},
      {id: 'riddleMeThis', titleKey: 'Riddle MeThis'},
    ],
  },
];
