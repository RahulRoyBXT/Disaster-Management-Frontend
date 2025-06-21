import useAuthStore from '@/store/authStore';

/**
 * Custom hook for authentication functionality
 *
 * Provides access to user data and authentication methods
 * including login, logout, registration and profile fetching
 */
const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);

  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const register = useAuthStore(state => state.register);
  const fetchUserProfile = useAuthStore(state => state.fetchUserProfile);

  const isAuthenticated = user !== null;

  return {
    // State
    user,
    loading,
    error,
    isAuthenticated,

    // Methods
    login,
    logout,
    register,
    fetchUserProfile,
  };
};

export default useAuth;
