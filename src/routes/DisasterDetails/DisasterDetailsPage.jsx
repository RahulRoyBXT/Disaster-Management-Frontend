import { AlertTriangle, Calendar, Edit, MapPin, Plus, Tag, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteDisaster, getDisaster } from '@/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ResourceCard } from '@/routes/Resources/ResourceCard';
import { ResourcePortal } from '@/routes/Resources/ResourcePortal';

// Sample disaster data - in a real app, this would come from an API
const SAMPLE_DISASTERS = [
  {
    id: '1',
    title: 'Manhattan Flood',
    location_name: 'Manhattan, NYC',
    description:
      'Heavy flooding in Manhattan due to sustained rainfall. Multiple neighborhoods affected with potential for water contamination.',
    tags: ['flood', 'urgent'],
    created_at: '2025-06-15T08:30:00Z',
    severity: 'high',
    resources: [
      {
        id: '1',
        name: 'Water Purification Kits',
        type: 'supplies',
        quantity: 500,
        location: 'Central Distribution Center',
        status: 'available',
      },
      {
        id: '2',
        name: 'Emergency Response Team',
        type: 'personnel',
        quantity: 25,
        location: 'Manhattan West',
        status: 'deployed',
      },
      {
        id: '3',
        name: 'Evacuation Shelters',
        type: 'facility',
        quantity: 8,
        location: 'Various Locations',
        status: 'active',
      },
    ],
  },
  {
    id: '2',
    title: 'California Wildfire',
    location_name: 'Northern California',
    description:
      'Rapidly spreading wildfire in Northern California forests. Evacuation orders in place for several communities.',
    tags: ['wildfire', 'evacuation'],
    created_at: '2025-06-16T12:15:00Z',
    severity: 'critical',
    resources: [
      {
        id: '4',
        name: 'Fire Engines',
        type: 'vehicle',
        quantity: 30,
        location: 'Fire Stations',
        status: 'deployed',
      },
      {
        id: '5',
        name: 'Firefighters',
        type: 'personnel',
        quantity: 200,
        location: 'Various Locations',
        status: 'active',
      },
      {
        id: '6',
        name: 'Aerial Water Tankers',
        type: 'vehicle',
        quantity: 5,
        location: 'County Airport',
        status: 'standby',
      },
    ],
  },
  // More disasters with resources here...
];

export default function DisasterDetailsPage() {
  const { disasterId } = useParams();
  const navigate = useNavigate();
  const [disaster, setDisaster] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResourcePortal, setShowResourcePortal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getDisaster(disasterId);
        console.log('disaster data', response);
        // Check if data exists and set it directly
        if (response && response.data) {
          setDisaster(response.data);
        } else {
          setError('Disaster data not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching disaster:', error);
        setError('Disaster not found');
        setIsLoading(false);
      }
    };

    fetchDisasters();
  }, [disasterId]);
  // Format date
  const formatDate = dateString => {
    if (!dateString) return 'No date available';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  // Handle delete disaster
  const handleDeleteDisaster = async () => {
    if (
      window.confirm('Are you sure you want to delete this disaster? This action cannot be undone.')
    ) {
      try {
        // Call the API to delete the disaster
        const response = await deleteDisaster(disasterId);
        console.log('Disaster deleted successfully:', response);
        navigate('/disasters');
      } catch (error) {
        console.error('Error deleting disaster:', error);
        setError('Failed to delete disaster. Please try again.');
      }
    }
  };
  // Handle update disaster
  const handleUpdateDisaster = () => {
    navigate(`/disasters/${disasterId}/edit`);
  };

  // Open resource portal
  const openResourcePortal = resource => {
    setSelectedResource(resource);
    setShowResourcePortal(true);
  };

  // Close resource portal
  const closeResourcePortal = () => {
    setShowResourcePortal(false);
    setSelectedResource(null);
  };

  // Determine severity styling
  const getSeverityClass = severity => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'critical':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getSeverityTextClass = severity => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'text-blue-700 dark:text-blue-400';
      case 'medium':
        return 'text-yellow-700 dark:text-yellow-400';
      case 'high':
        return 'text-orange-700 dark:text-orange-400';
      case 'critical':
        return 'text-red-700 dark:text-red-400';
      default:
        return 'text-gray-700 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
            role="progressbar"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-lg">Loading disaster details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/disasters')}>Back to Disasters</Button>
      </div>
    );
  }

  if (!disaster) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>The requested disaster could not be found.</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/disasters')}>Back to Disasters</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back navigation and action buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/disasters')}
          className="w-full md:w-auto"
        >
          Back to Disasters
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={handleUpdateDisaster} className="w-full sm:w-auto">
            <Edit className="mr-2 h-4 w-4" />
            Update Disaster
          </Button>
          <Button variant="destructive" onClick={handleDeleteDisaster} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Disaster
          </Button>
        </div>
      </div>

      {/* Disaster details card */}
      <Card className={cn('mb-8 border-l-4', getSeverityClass(disaster.severity))}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {' '}
              <CardTitle className="text-2xl md:text-3xl">{disaster.title}</CardTitle>
              <CardDescription className="mt-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>
                    {disaster.locationName || disaster.location_name || 'Unknown location'}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{formatDate(disaster.createdAt || disaster.created_at)}</span>
                </div>
              </CardDescription>
            </div>{' '}
            <div
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                getSeverityTextClass(disaster.severity)
              )}
            >
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="capitalize">{disaster.severity || 'Unknown'}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {' '}
          <div className="flex flex-wrap gap-2 mb-4">
            {disaster?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                <Tag className="h-3.5 w-3.5 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-foreground whitespace-pre-line">{disaster.description}</p>
          {/* Display coordinates if available */}
          {(disaster.latitude || disaster.longitude) && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="text-sm font-medium mb-2">Coordinates</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-muted-foreground">Latitude:</span>
                  <p className="font-mono">{disaster.latitude}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Longitude:</span>
                  <p className="font-mono">{disaster.longitude}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Resources</h2>
          <Button onClick={() => navigate(`/disasters/${disasterId}/resources/create`)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Resource
          </Button>
        </div>

        {disaster.resources && disaster.resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disaster.resources?.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onClick={() => openResourcePortal(resource)}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-center mb-4">
                No resources have been assigned to this disaster yet.
              </p>
              <Button onClick={() => navigate(`/disasters/${disasterId}/resources/create`)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Resource
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resource Portal */}
      {showResourcePortal && selectedResource && (
        <ResourcePortal
          resource={selectedResource}
          disasterId={disasterId}
          onClose={closeResourcePortal}
        />
      )}
    </div>
  );
}
