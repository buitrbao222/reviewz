import create from 'zustand';

const useGenreStore = create(set => ({
  genres: undefined,
  setGenres: genres => set({ genres }),
}));

export default useGenreStore;
