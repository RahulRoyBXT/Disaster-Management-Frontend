import Footer from '@/routes/Home/Footer';
import Navbar from '@/routes/Home/Navbar';
import { Outlet } from 'react-router-dom';

export const ReportLayout = () => {
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
