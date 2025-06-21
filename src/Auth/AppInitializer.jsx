import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

function AppInitializer({ children }) {
  const { fetchUserProfile } = useAuth();

  useEffect(() => {
    // Fetch the user profile when the app initializes
    const initialize = async () => {
      await fetchUserProfile();
    };
    initialize();
    return () => {
      // Optional cleanup code here
    };
  }, [fetchUserProfile]);

  return children;
}

export default AppInitializer;
