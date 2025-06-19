import Footer from '@/routes/Home/Footer.jsx';
import Navbar from '@/routes/Home/Navbar.jsx';
import { Outlet } from 'react-router-dom';

export const ResourcesLayout = () => {
  // Mock user state - in a real app, this would come from authentication
  const isLoggedIn = false;
  const username = 'DemoUser';

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
