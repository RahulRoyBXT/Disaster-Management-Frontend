import { AlertCircle, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { deleteResource, getDisaster, getDisasterResources } from '@/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ResourceCard } from '@/routes/Resources/ResourceCard';
import { ResourcePortal } from '@/routes/Resources/ResourcePortal';

export default function DisasterResourcesPage() {
  const { disasterId } = useParams();
  const navigate = useNavigate();
  const [disaster, setDisaster] = useState(null);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResourcePortal, setShowResourcePortal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Load disaster and resources data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch disaster details
        const disasterResponse = await getDisaster(disasterId);
        if (disasterResponse && disasterResponse.data) {
          setDisaster(disasterResponse.data);
        }

        // Fetch resources for this disaster
        const resourcesResponse = await getDisasterResources(disasterId);
        if (resourcesResponse && resourcesResponse.data) {
          const resourceArray = Array.isArray(resourcesResponse.data) ? resourcesResponse.data : [];
          setResources(resourceArray);
          setFilteredResources(resourceArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load disaster resources. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (disasterId) {
      fetchData();
    }
  }, [disasterId]);

  // Filter resources based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredResources(resources);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = resources.filter(
        resource =>
          resource.name?.toLowerCase().includes(term) ||
          resource.type?.toLowerCase().includes(term) ||
          resource.location?.toLowerCase().includes(term) ||
          resource.status?.toLowerCase().includes(term)
      );
      setFilteredResources(filtered);
    }
  }, [resources, searchTerm]);

  // Handle resource deletion
  const handleDeleteResource = async resourceId => {
    if (
      window.confirm('Are you sure you want to delete this resource? This action cannot be undone.')
    ) {
      try {
        await deleteResource(resourceId);
        // Remove the deleted resource from state
        setResources(prev => prev.filter(resource => resource.id !== resourceId));
        setFilteredResources(prev => prev.filter(resource => resource.id !== resourceId));
        closeResourcePortal();
      } catch (error) {
        console.error('Error deleting resource:', error);
        setError('Failed to delete resource. Please try again.');
      }
    }
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

  // Handle resource update navigation
  const handleEditResource = resourceId => {
    navigate(`/disasters/${disasterId}/resources/${resourceId}/edit`);
    closeResourcePortal();
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
          <p className="mt-4 text-lg">Loading disaster resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/disasters')}>Back to Disasters</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with disaster info and navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button
            variant="outline"
            onClick={() => navigate(`/disasters/${disasterId}`)}
            className="mb-4 md:mb-0"
          >
            ← Back to Disaster Details
          </Button>
          <h1 className="text-3xl font-bold">Resources</h1>
          {disaster && (
            <p className="text-muted-foreground mt-1">
              Managing resources for: <span className="font-medium">{disaster.title}</span>
            </p>
          )}
        </div>

        <Button asChild>
          <Link to={`/disasters/${disasterId}/resources/create`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredResources?.length || 0} of {resources?.length || 0} resources
      </p>

      {/* Resources grid */}
      {filteredResources && filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="relative group">
              <ResourceCard resource={resource} onClick={() => openResourcePortal(resource)} />
              {/* Quick action buttons */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  onClick={e => {
                    e.stopPropagation();
                    handleEditResource(resource.id);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-500/90 hover:bg-red-500"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteResource(resource.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm
                ? 'No resources match your search criteria. Try adjusting your search.'
                : "This disaster doesn't have any resources assigned yet."}
            </p>
            <Button asChild>
              <Link to={`/disasters/${disasterId}/resources/create`}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Resource
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resource Portal */}
      {showResourcePortal && selectedResource && (
        <ResourcePortal
          resource={selectedResource}
          disasterId={disasterId}
          onClose={closeResourcePortal}
          onEdit={handleEditResource}
          onDelete={handleDeleteResource}
        />
      )}
    </div>
  );
}
