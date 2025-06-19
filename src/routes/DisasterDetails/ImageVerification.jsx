import { AlertCircle, CheckCircle, Loader2, Shield, X } from 'lucide-react';
import { useState } from 'react';

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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ImageVerification({ imageUrl, onResult }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState('');

  // Handle AI verification
  const handleVerify = async () => {
    if (!imageUrl) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // In a real app, this would call the Gemini API
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response from Gemini API
      const mockAnalysisResult = {
        isAuthentic: Math.random() > 0.3, // 70% chance of being authentic
        confidence: Math.floor(Math.random() * 30 + 70), // 70-99%
        analysis:
          'Image appears to be authentic based on metadata and visual features. Location and time details are consistent with the reported disaster.',
        recommendations: 'Verify with additional sources if possible.',
      };

      setResult(mockAnalysisResult);

      // Pass result to parent component if callback provided
      if (onResult) {
        onResult(mockAnalysisResult);
      }
    } catch (err) {
      setError(err.message || 'Failed to verify image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Clear results
  const handleClear = () => {
    setResult(null);
    setError(null);
    setNotes('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Verification</CardTitle>
        <CardDescription>Use AI to verify the authenticity of the image</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image preview */}
        {imageUrl && (
          <div className="border rounded-md p-2 mb-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <img src={imageUrl} alt="Image to verify" className="object-cover w-full h-full" />
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="verification_notes">Analysis Notes</Label>
          <Textarea
            id="verification_notes"
            placeholder="Add notes about the image verification..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            disabled={isAnalyzing}
            rows={3}
          />
        </div>

        {/* Results */}
        {result && (
          <Alert variant={result.isAuthentic ? 'default' : 'destructive'} className="mt-4">
            {result.isAuthentic ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {result.isAuthentic
                ? `Authentic (${result.confidence}% confidence)`
                : `Potentially misleading (${result.confidence}% confidence)`}
            </AlertTitle>
            <AlertDescription>
              <p className="mb-2">{result.analysis}</p>
              <p className="text-sm font-medium">{result.recommendations}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isAnalyzing || (!result && !notes)}
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button type="button" onClick={handleVerify} disabled={isAnalyzing || !imageUrl}>
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Verify with AI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ImageVerification;
