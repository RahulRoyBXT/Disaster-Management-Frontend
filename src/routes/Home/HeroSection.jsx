import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-background to-muted dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground dark:text-white">
              Disaster Response <span className="text-primary">Coordination Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-gray-300">
              Empowering communities with real-time disaster information, resource management, and
              coordination tools for faster and more effective responses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/disasters">
                  View Active Disasters
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/hero-image.svg"
              alt="Disaster response coordination illustration"
              className="w-full h-auto"
              onError={e => {
                e.target.onerror = null;

                e.target.src = 'https://placehold.co/600x400/2563eb/ffffff?text=ResponsEase';
              }}
            />
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-16 text-foreground dark:text-white">
          Key Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 9v2m0 4h.01"></path>
                <path d="M5 19h14a2 2 0 0 0 1.84-2.75L13.74 4a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 5 19z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
              Real-time Alerts
            </h3>
            <p className="text-muted-foreground dark:text-gray-400">
              Receive immediate notifications about disasters in your area with verified information
              from official sources.
            </p>
          </div>

          <div className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
              Resource Mapping
            </h3>
            <p className="text-muted-foreground dark:text-gray-400">
              Locate nearby shelters, medical facilities, and relief resources with advanced
              geospatial mapping.
            </p>
          </div>

          <div className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
              Report Submission
            </h3>
            <p className="text-muted-foreground dark:text-gray-400">
              Submit and verify reports about local conditions with AI-powered image verification
              technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
