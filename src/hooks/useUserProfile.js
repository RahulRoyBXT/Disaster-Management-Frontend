import { fetchProfile } from '@/api';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = () => {
  const setUser = useAuthStore(s => s.setUser);
  const setError = useAuthStore(s => s.setError);
  const setLoading = useAuthStore(s => s.setLoading);

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
    onSuccess: data => {
      setUser(data);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: error => {
      setError(error);
      setLoading(false);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useUserProfile;
