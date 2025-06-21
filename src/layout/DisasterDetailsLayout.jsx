import useAuth from '@/hooks/useAuth';
import Footer from '@/routes/Home/Footer.jsx';
import Navbar from '@/routes/Home/Navbar.jsx';
import { Outlet } from 'react-router-dom';

export const DisasterDetailsLayout = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;
  const username = user?.username || '';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
