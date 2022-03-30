import { STORAGE_KEYS } from 'configs/constants';
import create from 'zustand';
import jwt_decode from 'jwt-decode';

const useUserStore = create((set, get) => ({
  user: undefined,

  initialized: false,

  setUser: user => set({ user }),

  parseUserFromToken: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (token) {
      set({
        user: jwt_decode(token),
      });
    }

    set({
      initialized: true,
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
