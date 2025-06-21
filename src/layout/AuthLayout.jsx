import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bgAnimation, setBgAnimation] = useState(true);
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Track mouse position for background effect
  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Toggle background animation
  const toggleAnimation = () => {
    setBgAnimation(!bgAnimation);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Animated background with gradient shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 opacity-80',
            bgAnimation ? 'animate-pulse' : ''
          )}
        />

        {/* Animated circles */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-3xl opacity-20 -top-20 -left-20"
          style={{
            transform: bgAnimation
              ? `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              : 'none',
            transition: 'transform 0.5s ease-out',
          }}
        />

        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl opacity-20 bottom-0 right-0"
          style={{
            transform: bgAnimation
              ? `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
              : 'none',
            transition: 'transform 0.5s ease-out',
          }}
        />

        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-3xl opacity-10 top-1/4 left-1/4"
          style={{
            transform: bgAnimation
              ? `translate(${mousePosition.y * 0.015}px, ${-mousePosition.x * 0.015}px)`
              : 'none',
            transition: 'transform 0.5s ease-out',
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNNDAgMzRoMXY0aC0xek0zNSA0MGg1djFoLTV6TTM1IDM3aDV2MWgtNXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      {/* Content area with glassmorphism card */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white tracking-tight">Disaster Response</h1>
          <p className="text-white/80 mb-8">
            Join our platform to help coordinate disaster response efforts and save lives.
          </p>

          {/* Auth buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <Button
              className="bg-white text-purple-900 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 font-medium text-lg py-6"
              asChild
            >
              <Link to="login">Log In</Link>
            </Button>

            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 font-medium text-lg py-6"
              asChild
            >
              <Link to="signup">Sign Up</Link>
            </Button>
          </div>

          {/* Animation toggle */}
          <button
            onClick={toggleAnimation}
            className="text-xs text-white/50 hover:text-white/80 transition-colors mt-4"
          >
            {bgAnimation ? 'Disable' : 'Enable'} animation
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
