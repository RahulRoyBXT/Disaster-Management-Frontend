import { AlertTriangle, FileText, Filter, Plus, Search, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Sample report data - in a real app, this would come from an API
const SAMPLE_REPORTS = [
  {
    id: '1',
    disaster_id: '1',
    user_id: 'citizen1',
    content: 'Need food and water in Lower East Side. Several buildings flooded.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Flood+Image',
    verification_status: 'verified',
    created_at: '2025-06-18T14:30:00Z',
    tags: ['food', 'water', 'urgent'],
  },
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
    id: '3',
    disaster_id: '3',
    user_id: 'houston_resident',
    content: 'Hurricane shutters needed in southwest Houston. Can anyone help?',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Hurricane+Image',
    verification_status: 'verified',
    created_at: '2025-06-16T16:45:00Z',
    tags: ['shelter', 'preparation'],
  },
  {
    id: '4',
    disaster_id: '4',
    user_id: 'chicagoHelper',
    content: 'Power outage in north side. Temperature dropping inside homes.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Winter+Storm+Image',
    verification_status: 'unverified',
    created_at: '2025-06-14T08:20:00Z',
    tags: ['power', 'heat', 'urgent'],
  },
  {
    id: '5',
    disaster_id: '5',
    user_id: 'miami_emergency',
    content: 'Public shelter open at Miami Central High School. Space for 200 people.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Tornado+Image',
    verification_status: 'verified',
    created_at: '2025-06-16T12:10:00Z',
    tags: ['shelter', 'tornado'],
  },
  {
    id: '6',
    disaster_id: '6',
    user_id: 'seattleEngineer',
    content: 'Structural damage to Fremont Bridge. Avoid crossing until inspected.',
    image_url: 'https://placehold.co/600x400/2563eb/ffffff?text=Earthquake+Image',
    verification_status: 'verified',
    created_at: '2025-06-15T22:05:00Z',
    tags: ['infrastructure', 'safety', 'urgent'],
  },
];

// Available filter tags
const ALL_TAGS = [
  'food',
  'water',
  'urgent',
  'road',
  'evacuation',
  'wildfire',
  'shelter',
  'preparation',
  'power',
  'heat',
  'tornado',
  'infrastructure',
  'safety',
];

// Verification status colors
const getVerificationColor = status => {
  switch (status) {
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
  switch (status) {
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
  const [reports, setReports] = useState(SAMPLE_REPORTS);
  const [filteredReports, setFilteredReports] = useState(SAMPLE_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Filter reports based on search term, selected tags, and verification status
  const filterReports = () => {
    let result = reports;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        report =>
          report.content.toLowerCase().includes(term) || report.user_id.toLowerCase().includes(term)
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(report => report.tags.some(tag => selectedTags.includes(tag)));
    }

    // Filter by verification status
    if (selectedStatus) {
      result = result.filter(report => report.verification_status === selectedStatus);
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
  useState(() => {
    filterReports();
  }, [searchTerm, selectedTags, selectedStatus, reports]);

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
        </div>{' '}
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
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Social Media Updates</CardTitle>
            <CardDescription>Real-time updates from social media</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/reports/social-media">
                <Twitter className="mr-2 h-4 w-4" />
                View Updates
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Official Updates</CardTitle>
            <CardDescription>Updates from government and relief agencies</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/reports/official-updates">
                <FileText className="mr-2 h-4 w-4" />
                View Updates
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Submit New Report</CardTitle>
            <CardDescription>Report a situation or offer assistance</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/reports/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Report
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Filter by tags:</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {ALL_TAGS.map(tag => (
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
          {['verified', 'pending', 'unverified'].map(status => (
            <Badge
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer',
                selectedStatus === status ? getVerificationBadge(status).className : ''
              )}
              onClick={() => toggleStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
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
                className={`absolute top-0 left-0 w-1 h-full ${getVerificationColor(report.verification_status)}`}
              ></div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {report.image_url && (
                    <div className="md:w-1/4 flex-shrink-0">
                      <img
                        src={report.image_url}
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
                        <span className="font-medium text-foreground">@{report.user_id}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(report.created_at)}
                        </span>
                      </div>
                      <Badge
                        variant={getVerificationBadge(report.verification_status).variant}
                        className={getVerificationBadge(report.verification_status).className}
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {report.verification_status}
                      </Badge>
                    </div>

                    <p className="mb-4">{report.content}</p>

                    <div className="flex flex-wrap gap-1">
                      {report.tags.map((tag, index) => (
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
                    Disaster ID: {report.disaster_id}
                  </span>
                  <div className="flex gap-2">
                    {' '}
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/disasters/${report.disaster_id}`}>View Disaster</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/reports/verification">Verify</Link>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
