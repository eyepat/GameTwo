import {create} from 'zustand';

export type SelectedCategory = {
  gameId: string;
  categoryId: string;
  title: string;
  premium?: boolean;
  dataFile: string;
};

type GameState = {
  selected?: SelectedCategory;
  purchases: Record<string, boolean>; // key by productId/category key
  setSelected: (sel?: SelectedCategory) => void;
  markPurchased: (productId: string) => void;
  isUnlocked: (key: string) => boolean;
};

export const useGameStore = create<GameState>((set, get) => ({
  selected: undefined,
  purchases: {},
  setSelected: selected => set({selected}),
  markPurchased: productId =>
    set(state => ({purchases: {...state.purchases, [productId]: true}})),
  isUnlocked: key => Boolean(get().purchases[key]),
}));

export function categoryProductId(gameId: string, categoryId: string) {
  // Adjust to your actual Play Billing product IDs
  return `${gameId}.${categoryId}`;
}

