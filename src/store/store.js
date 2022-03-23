import create from 'zustand';

const useStore = create(set => ({
  user: undefined,
  genres: undefined,
  setUser: user => set({ user }),
  setGenres: genres => set({ genres }),
}));

export default useStore;
