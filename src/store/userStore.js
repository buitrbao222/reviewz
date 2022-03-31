import { STORAGE_KEYS } from 'configs/constants';
import create from 'zustand';
import jwt_decode from 'jwt-decode';

const useUserStore = create(set => ({
  user: undefined,

  setUser: user => set({ user }),

  getToken: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    set({
      user: token ? jwt_decode(token) : undefined,
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
