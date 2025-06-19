import { AlertCircle, ArrowLeft, CheckCircle, Image, Shield, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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

// Sample reports waiting for verification
const SAMPLE_UNVERIFIED_REPORTS = [
  {
    id: '2',
    disaster_id: '2',
    user_id: 'firstResponder42',
    content: 'Road blocked by fallen trees on Highway 101 north of Santa Rosa.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Wildfire+Image',
    verification_status: 'pending',
    created_at: '2025-06-17T10:15:00Z',
    tags: ['road', 'evacuation', 'wildfire'],
  },
  {
    id: '4',
    disaster_id: '4',
    user_id: 'chicagoHelper',
    content: 'Power outage in north side. Temperature dropping inside homes.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Winter+Storm+Image',
    verification_status: 'pending',
    created_at: '2025-06-14T08:20:00Z',
    tags: ['power', 'heat', 'winter'],
  },
  {
    id: '7',
    disaster_id: '7',
    user_id: 'desert_dweller',
    content: 'Cooling center at Phoenix Convention Center is full. People being turned away.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Heat+Wave+Image',
    verification_status: 'pending',
    created_at: '2025-06-16T15:10:00Z',
    tags: ['heat', 'shelter', 'urgent'],
  },
];

export function ReportVerification() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(SAMPLE_UNVERIFIED_REPORTS);
  const [activeReport, setActiveReport] = useState(null);
  const [verificationNote, setVerificationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle selecting a report to verify
  const handleSelectReport = report => {
    setActiveReport(report);
    setVerificationNote('');
    setVerificationResult(null);
    setError(null);
  };

  // Handle starting AI verification
  const handleAiVerify = async () => {
    if (!activeReport) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would call the Gemini API
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockAnalysisResult = {
        isAuthentic: Math.random() > 0.3, // 70% chance of being authentic
        confidence: Math.floor(Math.random() * 30 + 70), // 70-99%
        analysis:
          'Image appears to be authentic based on metadata and visual features. Location and time details are consistent with the reported disaster.',
        recommendations: 'Verify with additional sources if possible.',
      };

      setVerificationResult(mockAnalysisResult);
    } catch (err) {
      setError(err.message || 'Failed to verify image. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual verification
  const handleManualVerify = async status => {
    if (!activeReport) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update the reports list with the new status
      setReports(prevReports =>
        prevReports
          .map(report =>
            report.id === activeReport.id ? { ...report, verification_status: status } : report
          )
          .filter(report => report.id !== activeReport.id)
      );

      // Clear the active report
      setActiveReport(null);
      setVerificationNote('');
      setVerificationResult(null);
    } catch (err) {
      setError(err.message || 'Failed to update verification status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/reports')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Reports
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports pending verification */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Reports Pending Verification</CardTitle>
              <CardDescription>{reports.length} reports waiting to be verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.length > 0 ? (
                reports.map(report => (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-md cursor-pointer transition-colors ${
                      activeReport?.id === report.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectReport(report)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm truncate">Report #{report.id}</h3>
                      <Badge variant="outline">
                        {new Date(report.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {report.content}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {report.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No reports waiting for verification</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Verification workspace */}
        <div className="lg:col-span-2">
          {activeReport ? (
            <Card>
              <CardHeader>
                <CardTitle>Verify Report</CardTitle>
                <CardDescription>Review and verify the authenticity of this report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Report content */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">Report Content</h3>
                    <p className="text-sm mb-4">{activeReport.content}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {activeReport.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Submitted by {activeReport.user_id} on{' '}
                      {new Date(activeReport.created_at).toLocaleString()}
                    </div>
                  </div>

                  {/* Image preview */}
                  <div className="border rounded-md p-2">
                    <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                      <img
                        src={activeReport.image_url}
                        alt="Report Image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Verification notes */}
                  <div className="space-y-2">
                    <Label htmlFor="verification_note">Verification Notes</Label>
                    <Textarea
                      id="verification_note"
                      placeholder="Enter notes about the verification process..."
                      value={verificationNote}
                      onChange={e => setVerificationNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* AI Verification button */}
                  <div className="flex justify-center">
                    <Button onClick={handleAiVerify} disabled={isSubmitting} className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Analyzing...' : 'Analyze with AI'}
                    </Button>
                  </div>

                  {/* Verification result */}
                  {verificationResult && (
                    <Alert
                      variant={verificationResult.isAuthentic ? 'default' : 'destructive'}
                      className="mt-4"
                    >
                      {verificationResult.isAuthentic ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {verificationResult.isAuthentic
                          ? `Authentic (${verificationResult.confidence}% confidence)`
                          : `Potentially misleading (${verificationResult.confidence}% confidence)`}
                      </AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">{verificationResult.analysis}</p>
                        <p className="text-sm font-medium">{verificationResult.recommendations}</p>
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleManualVerify('unverified')}
                  disabled={isSubmitting}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Mark Unverified
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleManualVerify('verified')}
                  disabled={isSubmitting}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Verified
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8">
              <Image className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Report Selected</h3>
              <p className="text-center text-muted-foreground mb-6">
                Select a report from the list to verify its authenticity
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportVerification;
