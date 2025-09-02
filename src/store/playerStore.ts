import {create} from 'zustand';

type PlayerState = {
  players: string[];
  currentIndex: number;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  nextPlayer: () => void;
  reset: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  players: [],
  currentIndex: 0,
  addPlayer: name =>
    set(state => ({players: [...state.players, name.trim()].filter(Boolean)})),
  removePlayer: index =>
    set(state => ({
      players: state.players.filter((_, i) => i !== index),
      currentIndex:
        state.currentIndex >= index && state.currentIndex > 0
          ? state.currentIndex - 1
          : state.currentIndex,
    })),
  nextPlayer: () =>
    set(state => ({
      currentIndex: state.players.length
        ? (state.currentIndex + 1) % state.players.length
        : 0,
    })),
  reset: () => set({players: [], currentIndex: 0}),
}));

export function getCurrentPlayerName() {
  const {players, currentIndex} = usePlayerStore.getState();
  return players.length ? players[currentIndex] : '';
}

