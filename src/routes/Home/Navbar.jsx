import { LogOut, Menu, Settings, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logoutUser } from '@/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Navbar = ({ isLoggedIn = false, username = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitials = name => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return name.substring(0, 2).toUpperCase();
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  };

  return (
    <nav className="bg-background border-b border-border shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2Z"></path>
                <path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8"></path>
                <path d="M10 14v4"></path>
                <path d="M14 14v4"></path>
                <path d="M12 14v4"></path>
              </svg>
              <span className="ml-2 text-xl font-bold tracking-tight text-foreground dark:text-gray-100">
                ResponsEase
              </span>
              <span className="sr-only">Disaster Management System</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/disasters"
                className="text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium"
              >
                Disasters
              </Link>
              <Link
                to="/resources"
                className="text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>

          {/* Authentication and theme toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${username}.png`}
                        alt={username}
                      />

                      <AvatarFallback>{getUserInitials(username)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal">{username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="auth/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="auth/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background dark:bg-gray-900 border-b border-border dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-foreground hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/disasters"
              className="block text-foreground hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Disasters
            </Link>
            <Link
              to="/resources"
              className="block text-foreground hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="block text-foreground hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
          </div>

          {/* Mobile authentication */}
          <div className="pt-4 pb-3 border-t border-border dark:border-gray-800">
            <div className="px-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${username}.png`}
                          alt={username}
                        />
                        <AvatarFallback>{getUserInitials(username)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-foreground dark:text-white">
                        {username}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile" onClick={toggleMenu}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/change-password" onClick={toggleMenu}>
                      <Settings className="mr-2 h-4 w-4" />
                      Change Password
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
                    <Link onClick={logoutUser}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth/login" onClick={toggleMenu}>
                      Log in
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/auth/signup" onClick={toggleMenu}>
                      Sign up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
