import { AlertTriangle, FileText, Filter, Plus, Search, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllReports } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Verification status colors
const getVerificationColor = status => {
  const statusLower = status?.toLowerCase() || '';
  switch (statusLower) {
    case 'verified':
      return 'bg-green-500';
    case 'unverified':
      return 'bg-red-500';
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const getVerificationBadge = status => {
  const statusLower = status?.toLowerCase() || '';
  switch (statusLower) {
    case 'verified':
      return { variant: 'outline', className: 'border-green-500 text-green-500' };
    case 'unverified':
      return { variant: 'outline', className: 'border-red-500 text-red-500' };
    case 'pending':
      return { variant: 'outline', className: 'border-yellow-500 text-yellow-500' };
    default:
      return { variant: 'outline', className: 'border-gray-500 text-gray-500' };
  }
};

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await getAllReports();

        if (response && response.data) {
          setReports(response.data);

          // Extract all unique tags from reports metadata
          const tags = new Set();
          response.data.forEach(report => {
            if (report.metadata?.verificationResult?.detectedObjects) {
              report.metadata.verificationResult.detectedObjects.forEach(tag => {
                tags.add(tag);
              });
            }
          });
          setAllTags(Array.from(tags));
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Filter reports based on search term, selected tags, and verification status
  const filterReports = () => {
    let result = reports;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        report =>
          report.content?.toLowerCase().includes(term) ||
          report.user?.username?.toLowerCase().includes(term)
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(report =>
        report.metadata?.verificationResult?.detectedObjects?.some(tag =>
          selectedTags.includes(tag)
        )
      );
    }

    // Filter by verification status
    if (selectedStatus) {
      result = result.filter(
        report => report.verificationStatus?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredReports(result);
  };

  // Toggle tag selection
  const toggleTag = tag => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Toggle status selection
  const toggleStatus = status => {
    setSelectedStatus(prev => (prev === status ? '' : status));
  };

  // Format date
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Apply filters when any filter criteria change
  useEffect(() => {
    filterReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedTags, selectedStatus, reports]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive font-medium mb-2">Error</p>
            <p className="text-muted-foreground">{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Disaster Reports</h1>
          <p className="text-muted-foreground">View and manage disaster reports from the field</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reports..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link to="/reports/create">
              <Plus className="mr-2 h-4 w-4" />
              Submit Report
            </Link>
          </Button>
        </div>
      </div>
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card hover:bg-accent/10 transition-colors cursor-pointer">
          <Link to="/reports/social-media" className="block p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Twitter className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-foreground">Social Media Updates</h3>
                <p className="text-sm text-muted-foreground">Monitor real-time social posts</p>
              </div>
            </div>
          </Link>
        </Card>

        <Card className="bg-card hover:bg-accent/10 transition-colors cursor-pointer">
          <Link to="/reports/official-updates" className="block p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-foreground">Official Updates</h3>
                <p className="text-sm text-muted-foreground">Government and agency alerts</p>
              </div>
            </div>
          </Link>
        </Card>

        <Card className="bg-card hover:bg-accent/10 transition-colors cursor-pointer">
          <Link to="/reports/verification" className="block p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-foreground">Report Verification</h3>
                <p className="text-sm text-muted-foreground">Verify submitted reports and images</p>
              </div>
            </div>
          </Link>
        </Card>

        <Card className="bg-card hover:bg-accent/10 transition-colors cursor-pointer">
          <Link to="/reports/priority-alerts" className="block p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-foreground">Priority Alerts</h3>
                <p className="text-sm text-muted-foreground">Urgent reports requiring attention</p>
              </div>
            </div>
          </Link>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Filter by tags:</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Filter by verification status:</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {['VERIFIED', 'PENDING', 'UNVERIFIED'].map(status => (
            <Badge
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer',
                selectedStatus === status ? getVerificationBadge(status).className : ''
              )}
              onClick={() => toggleStatus(status)}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredReports.length} of {reports.length} reports
      </p>

      {/* Reports list */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <Card key={report.id} className="overflow-hidden">
            <div className="relative">
              {/* Status indicator */}
              <div
                className={`absolute top-0 left-0 w-1 h-full ${getVerificationColor(report.verificationStatus)}`}
              ></div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {report.imageUrl && (
                    <div className="md:w-1/4 flex-shrink-0">
                      <img
                        src={report.imageUrl}
                        alt="Report image"
                        className="rounded-md w-full h-auto object-cover max-h-48"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/600x400/2563eb/ffffff?text=No+Image';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-foreground">
                          @{report.user?.username || 'Unknown'}
                        </span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(report.createdAt)}
                        </span>
                      </div>
                      <Badge
                        variant={getVerificationBadge(report.verificationStatus).variant}
                        className={getVerificationBadge(report.verificationStatus).className}
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {report.verificationStatus}
                      </Badge>
                    </div>

                    <p className="mb-4">{report.content}</p>

                    <div className="flex flex-wrap gap-1">
                      {report.metadata?.verificationResult?.detectedObjects?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50 border-t px-6 py-3">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-muted-foreground">
                    Disaster ID: {report.disasterId}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/disasters/${report.disasterId}`}>View Disaster</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/reports/verification?reportId=${report.id}`}>Verify</Link>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}

        {filteredReports.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
