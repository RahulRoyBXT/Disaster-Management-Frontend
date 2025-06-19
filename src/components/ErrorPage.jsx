import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Extract error details
  const errorMessage = error?.message || 'An unexpected error occurred';
  const errorStatus = error?.status || 500;
  const errorStatusText = error?.statusText || 'Internal Server Error';

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Go home
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-lg">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            {errorStatus} - {errorStatusText}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            We encountered a problem while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="p-4 mb-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground font-mono">{errorMessage}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Please try again or contact support if the issue persists.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button size="sm" onClick={handleGoHome}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
