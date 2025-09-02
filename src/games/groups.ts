export type GameInGroup = { id: string; titleKey: string };

export type GameGroup = {
  id: string;
  titleKey: string; // i18n key for group name
  games: GameInGroup[];
};

export const gameGroups: GameGroup[] = [
  {
    id: 'couples',
    titleKey: 'groups.couples',
    games: [
      {id: 'betterTogether', titleKey: 'games.betterTogether'},
      {id: 'karleksguide', titleKey: 'games.karleksguide'},
      {id: 'couplesChat', titleKey: 'games.couplesChat'},
    ],
  },
  {
    id: 'friendsParty',
    titleKey: 'groups.friendsParty',
    games: [
      {id: 'questionsForHumans', titleKey: 'games.questionsForHumans'},
      {id: 'beHonestOrGetDrunk', titleKey: 'games.beHonestOrGetDrunk'},
      {id: 'drunkedApp', titleKey: 'games.drunkedApp'},
      {id: 'neverHaveIEver', titleKey: 'games.neverHaveIEver'},
    ],
  },
  {
    id: 'selfGrowth',
    titleKey: 'groups.selfGrowth',
    games: [
      {id: 'discoverYourself', titleKey: 'games.discoverYourself'},
      {id: 'substance', titleKey: 'games.substance'},
      {id: 'mindfulTalk', titleKey: 'games.mindfulTalk'},
    ],
  },
  {
    id: 'familyGeneral',
    titleKey: 'groups.familyGeneral',
    games: [
      {id: 'smileTalk', titleKey: 'games.smileTalk'},
      {id: 'howWellDoYouKnowMe', titleKey: 'games.howWellDoYouKnowMe'},
      {id: 'riddleMeThis', titleKey: 'games.riddleMeThis'},
    ],
  },
];

