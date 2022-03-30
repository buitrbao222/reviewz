import { STORAGE_KEYS } from 'configs/constants';
import create from 'zustand';
import jwt_decode from 'jwt-decode';

const useStore = create(set => ({
  user: undefined,
  genres: undefined,
  setUser: user => set({ user }),
  setGenres: genres => set({ genres }),
  setToken: token => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    set({
      user: jwt_decode(token),
    });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    set({
      user: undefined,
    });
  },
}));

export default useStore;
