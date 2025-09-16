/* Static content mapping per language so Metro can bundle JSON files */
import i18n from '../i18n/i18n';

type LangMap = {en: string[]; es?: string[]; sv?: string[]};

const data: Record<string, Record<string, LangMap>> = {
  truthOrDare: {
    family: {
      en: require('../categories/truthOrDare/family.json'),
      es: require('../categories/truthOrDare/family.es.json'),
      sv: require('../categories/truthOrDare/family.sv.json'),
    },
    friends: {
      en: require('../categories/truthOrDare/friends.json'),
      es: require('../categories/truthOrDare/friends.es.json'),
      sv: require('../categories/truthOrDare/friends.sv.json'),
    },
    party: {
      en: require('../categories/truthOrDare/party.json'),
      es: require('../categories/truthOrDare/party.es.json'),
      sv: require('../categories/truthOrDare/party.sv.json'),
    },
    daring: {
      en: require('../categories/truthOrDare/daring.json'),
      es: require('../categories/truthOrDare/daring.es.json'),
      sv: require('../categories/truthOrDare/daring.sv.json'),
    },
  },
  neverHaveIEver: {
    family: {
      en: require('../categories/neverHaveIEver/family.json'),
      es: require('../categories/neverHaveIEver/family.es.json'),
      sv: require('../categories/neverHaveIEver/family.sv.json'),
    },
    friends: {
      en: require('../categories/neverHaveIEver/friends.json'),
      es: require('../categories/neverHaveIEver/friends.es.json'),
      sv: require('../categories/neverHaveIEver/friends.sv.json'),
    },
    daring: {
      en: require('../categories/neverHaveIEver/daring.json'),
      es: require('../categories/neverHaveIEver/daring.es.json'),
      sv: require('../categories/neverHaveIEver/daring.sv.json'),
    },
    action: {
      en: require('../categories/neverHaveIEver/action.json'),
      es: require('../categories/neverHaveIEver/action.es.json'),
      sv: require('../categories/neverHaveIEver/action.sv.json'),
    },
    drunk: {
      en: require('../categories/neverHaveIEver/drunk.json'),
      es: require('../categories/neverHaveIEver/drunk.es.json'),
      sv: require('../categories/neverHaveIEver/drunk.sv.json'),
    },
    sexual: {
      en: require('../categories/neverHaveIEver/sexual.json'),
      es: require('../categories/neverHaveIEver/sexual.es.json'),
      sv: require('../categories/neverHaveIEver/sexual.sv.json'),
    },
  },
  bottleSpin: {
    classic: {
      en: require('../categories/bottleSpin/classic.json'),
      es: require('../categories/bottleSpin/classic.es.json'),
      sv: require('../categories/bottleSpin/classic.sv.json'),
    },
    party: {
      en: require('../categories/bottleSpin/party.json'),
      es: require('../categories/bottleSpin/party.es.json'),
      sv: require('../categories/bottleSpin/party.sv.json'),
    },
  },
  wouldYouRather: {
    family: {
      en: require('../categories/wouldYouRather/family.json'),
      es: require('../categories/wouldYouRather/family.es.json'),
      sv: require('../categories/wouldYouRather/family.sv.json'),
    },
    funny: {
      en: require('../categories/wouldYouRather/funny.json'),
      es: require('../categories/wouldYouRather/funny.es.json'),
      sv: require('../categories/wouldYouRather/funny.sv.json'),
    },
    hard: {
      en: require('../categories/wouldYouRather/hard.json'),
      es: require('../categories/wouldYouRather/hard.es.json'),
      sv: require('../categories/wouldYouRather/hard.sv.json'),
    },
  },
  // New groups' games: fallback to EN only for now
  betterTogether: {
    general: { en: require('../categories/betterTogether/general.json') },
  },
  karleksguide: {
    general: { en: require('../categories/karleksguide/general.json') },
  },
  couplesChat: {
    general: { en: require('../categories/couplesChat/general.json') },
  },
  questionsForHumans: {
    general: { en: require('../categories/questionsForHumans/general.json') },
  },
  beHonestOrGetDrunk: {
    general: { en: require('../categories/beHonestOrGetDrunk/general.json') },
  },
  drunkedApp: {
    general: { en: require('../categories/drunkedApp/general.json') },
  },
  discoverYourself: {
    general: { en: require('../categories/discoverYourself/general.json') },
  },
  substance: {
    general: { en: require('../categories/substance/general.json') },
  },
  mindfulTalk: {
    general: { en: require('../categories/mindfulTalk/general.json') },
    kanslor: { en: require('../categories/mindfulTalk/kanslor.json') },
    nyfikenhet: { en: require('../categories/mindfulTalk/nyfikenhet.json') },
    mindfulness: { en: require('../categories/mindfulTalk/mindfulness.json') },
    blandad: { en: require('../categories/mindfulTalk/blandad.json') },
  },
  smileTalk: {
    general: { en: require('../categories/smileTalk/general.json') },
  },
  howWellDoYouKnowMe: {
    general: { en: require('../categories/howWellDoYouKnowMe/general.json') },
  },
  riddleMeThis: {
    general: { en: require('../categories/riddleMeThis/general.json') },
  },
};

export function getCategoryContent(gameId: string, categoryId: string): string[] {
  const lang = (i18n.language || 'en').split('-')[0];
  const game = data[gameId];
  const category = game?.[categoryId];
  if (!category) return [];
  return category[(lang as 'en' | 'es' | 'sv')] || category.en;
}
