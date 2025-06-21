import { fetchProfile, loginUser, logoutUser, registerUser } from '@/api/index';
import { create } from 'zustand';

const useAuthStore = create(set => ({
  user: null,
  loading: true,
  error: null,

  setUser: user => set({ user }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),

  // Authentication methods
  login: async ({ username, password }) => {
    set({ loading: true, error: null });
    try {
      await loginUser({ username, password });
      await fetchProfile();
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  register: async userData => {
    set({ loading: true, error: null });
    try {
      await registerUser(userData);
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutUser();
      set({ user: null, loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  fetchUserProfile: async () => {
    set({ loading: true, error: null });
    try {
      const userData = await fetchProfile();
      set({ user: userData.data, loading: false });
      return userData;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
}));

export default useAuthStore;
