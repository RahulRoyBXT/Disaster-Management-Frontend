import { Github, Mail, Twitter } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
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
            </Link>
            <p className="text-sm text-muted-foreground">
              Coordinating disaster response efforts efficiently and effectively through real-time
              data and collaboration.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="mailto:info@responsease.com" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-gray-100 tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/disasters"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Disasters
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-foreground text-sm">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-muted-foreground hover:text-foreground text-sm">
                  Resource Map
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-gray-100 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/guidelines"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/training"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-foreground text-sm">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-gray-100 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-800 pt-8 mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ResponsEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
