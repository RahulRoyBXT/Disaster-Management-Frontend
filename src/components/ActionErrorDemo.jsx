import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAction } from '@/hooks/useAction';

// Simulate an API call that might fail
const simulateApiCall = async shouldFail => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (shouldFail) {
    throw new Error('Failed to complete the action. This is a simulated error.');
  }

  return { message: 'Action completed successfully!' };
};

export default function ActionErrorDemo() {
  const navigate = useNavigate();
  const [shouldFail, setShouldFail] = useState(true);

  const { isExecuting, error, execute } = useAction(simulateApiCall);

  const handleAction = async () => {
    await execute(shouldFail);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Action Error Demo</CardTitle>
          <CardDescription>Test the error handling with the useAction hook</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="shouldFail"
              checked={shouldFail}
              onChange={() => setShouldFail(!shouldFail)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="shouldFail" className="text-sm font-medium text-foreground">
              Simulate error
            </label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={handleAction} disabled={isExecuting}>
            {isExecuting ? 'Processing...' : 'Test Action'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
