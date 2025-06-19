import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ActionErrorDemo from './components/ActionErrorDemo';
import { CreateDisasterForm } from './components/CreateDisasterForm';
import { DisasterGrid } from './components/DisasterGrid';
import ErrorPage from './components/ErrorPage';
import { ThemeProvider } from './components/ui/theme-provider';
import './index.css';
import AuthLayout from './layout/AuthLayout';
import { DisasterDetailsLayout } from './layout/DisasterDetailsLayout';
import { DisasterLayout } from './layout/DisasterLayout';
import { MainLayout } from './layout/MainLayout';
import { ReportLayout } from './layout/ReportLayout';
import { ResourcesLayout } from './layout/ResourcesLayout';
import { AboutPage } from './routes/About/AboutPage';
import LoginPage from './routes/Auth/Login/LoginPage';
import SignupPage from './routes/Auth/Signup/SignupPage';
import DisasterDetailsPage from './routes/DisasterDetails/DisasterDetailsPage';
import HeroSection from './routes/Home/HeroSection';
import { CreateReportForm } from './routes/Reports/CreateReportForm';
import OfficialUpdates from './routes/Reports/OfficialUpdates';
import PriorityAlertSystem from './routes/Reports/PriorityAlertSystem';
import ReportsPage from './routes/Reports/ReportsPage';
import ReportVerification from './routes/Reports/ReportVerification';
import SocialMediaUpdates from './routes/Reports/SocialMediaUpdates';
import { CreateResourceForm } from './routes/Resources/CreateResourceForm';
import ResourcesPage from './routes/Resources/ResourcesPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthChecker from './Auth/AuthChecker';

const queryClient = new QueryClient();

// Routes
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HeroSection />,
      },
      {
        path: 'error-test',
        loader: () => {
          throw new Response('Intentional error for testing', {
            status: 500,
            statusText: 'Internal Server Error',
          });
        },
      },
      {
        path: 'action-error-demo',
        element: <ActionErrorDemo />,
      },
    ],
  },
  {
    path: '/disasters',
    element: <DisasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DisasterGrid />,
      },
      {
        path: 'create',
        element: (
          <AuthChecker>
            <CreateDisasterForm />
          </AuthChecker>
        ),
      },
    ],
  },
  {
    path: '/disasters/:disasterId',
    element: <DisasterDetailsLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DisasterDetailsPage />,
      },
      {
        path: 'resources/create',
        element: (
          <AuthChecker>
            <CreateResourceForm />
          </AuthChecker>
        ),
      },
    ],
  },
  {
    path: '/resources',
    element: <ResourcesLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ResourcesPage />,
      },
      {
        path: 'create',
        element: (
          <AuthChecker>
            <CreateResourceForm />
          </AuthChecker>
        ),
      },
    ],
  },

  {
    path: '/reports',
    element: <ReportLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ReportsPage />,
      },
      {
        path: 'create',
        element: (
          <AuthChecker>
            <CreateReportForm />
          </AuthChecker>
        ),
      },
      {
        path: 'social-media',
        element: <SocialMediaUpdates />,
      },
      {
        path: 'official-updates',
        element: <OfficialUpdates />,
      },
      {
        path: 'verification',
        element: (
          <AuthChecker>
            <ReportVerification />
          </AuthChecker>
        ),
      },
      {
        path: 'priority-alerts',
        element: <PriorityAlertSystem />,
      },
    ],
  },
  {
    path: '/about',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
