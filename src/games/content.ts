/* Static content mapping so Metro can bundle JSON files */

export function getCategoryContent(gameId: string, categoryId: string): string[] {
  // Truth or Dare
  if (gameId === 'truthOrDare') {
    switch (categoryId) {
      case 'family':
        return require('../categories/truthOrDare/family.json');
      case 'friends':
        return require('../categories/truthOrDare/friends.json');
      case 'party':
        return require('../categories/truthOrDare/party.json');
      case 'daring':
        return require('../categories/truthOrDare/daring.json');
    }
  }

  // Never Have I Ever
  if (gameId === 'neverHaveIEver') {
    switch (categoryId) {
      case 'family':
        return require('../categories/neverHaveIEver/family.json');
      case 'friends':
        return require('../categories/neverHaveIEver/friends.json');
      case 'daring':
        return require('../categories/neverHaveIEver/daring.json');
      case 'action':
        return require('../categories/neverHaveIEver/action.json');
      case 'drunk':
        return require('../categories/neverHaveIEver/drunk.json');
      case 'sexual':
        return require('../categories/neverHaveIEver/sexual.json');
    }
  }

  // Spin the Bottle
  if (gameId === 'bottleSpin') {
    switch (categoryId) {
      case 'classic':
        return require('../categories/bottleSpin/classic.json');
      case 'party':
        return require('../categories/bottleSpin/party.json');
    }
  }

  // Would You Rather
  if (gameId === 'wouldYouRather') {
    switch (categoryId) {
      case 'family':
        return require('../categories/wouldYouRather/family.json');
      case 'funny':
        return require('../categories/wouldYouRather/funny.json');
      case 'hard':
        return require('../categories/wouldYouRather/hard.json');
    }
  }

  return [];
}

