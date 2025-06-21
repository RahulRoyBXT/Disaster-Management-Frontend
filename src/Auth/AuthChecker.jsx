import useAuth from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthChecker = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthChecker;
