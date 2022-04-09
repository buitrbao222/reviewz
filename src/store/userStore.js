import { STORAGE_KEYS } from 'configs/constants';
import jwt_decode from 'jwt-decode';
import create from 'zustand';

const useUserStore = create(set => ({
  user: undefined,
  loadingFromToken: true,
  setUser: user => set({ user, loadingFromToken: false }),

  loadFromToken: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    set({
      user: token ? jwt_decode(token) : undefined,
      loadingFromToken: false,
    });
  },

  setToken: token => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);

    set(state => ({
      user: {
        ...(state.user || {}),
        ...jwt_decode(token),
      },
    }));
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);

    set({
      user: undefined,
    });
  },
}));

export default useUserStore;
