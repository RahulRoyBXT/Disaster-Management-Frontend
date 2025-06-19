import useAuthStore from '@/store/authStore';
import { Navigate, useLocation } from 'react-router-dom';

const AuthChecker = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore(s => s.user !== null);

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthChecker;
