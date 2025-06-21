import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllResources } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResourceCard } from '@/routes/Resources/ResourceCard';
import { ResourcePortal } from '@/routes/Resources/ResourcePortal';

// Resource types for filtering
const RESOURCE_TYPES = ['shelter', 'supplies', 'personnel', 'vehicle', 'facility', 'medical'];

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showResourcePortal, setShowResourcePortal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load resources data
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllResources();
        console.log('resource data', response);

        // Check if data exists and is an array
        if (response && response.data) {
          const resourceData = Array.isArray(response.data) ? response.data : [];
          setResources(resourceData);
          setFilteredResources(resourceData);
        } else {
          setResources([]);
          setFilteredResources([]);
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Failed to load resources');
        setResources([]);
        setFilteredResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search term and selected types
  useEffect(() => {
    let result = resources;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        resource =>
          (resource.name?.toLowerCase() || '').includes(term) ||
          (resource.locationName?.toLowerCase() || '').includes(term) ||
          (resource.type?.toLowerCase() || '').includes(term)
      );
    }

    // Filter by types
    if (selectedTypes.length > 0) {
      result = result.filter(resource => selectedTypes.includes(resource.type));
    }

    setFilteredResources(result);
  }, [resources, searchTerm, selectedTypes]);

  // Toggle type selection
  const toggleType = type => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Resources</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link to="/resources/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Resource
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Filter by type:</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {RESOURCE_TYPES.map(type => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => toggleType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-lg">Loading resources...</p>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="text-center py-12">
          <p className="text-destructive text-lg">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {/* Results count */}
      {!isLoading && !error && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      )}

      {/* Resource cards grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={{
                ...resource,
                // Add these for backward compatibility with ResourceCard component
                location: resource.locationName || 'Unknown location',
                status: resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : '',
              }}
              onClick={() => openResourcePortal(resource)}
            />
          ))}

          {filteredResources.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Resource Portal */}
      {showResourcePortal && selectedResource && (
        <ResourcePortal
          resource={{
            ...selectedResource,
            // Add these for backward compatibility with ResourcePortal component
            location: selectedResource.locationName || 'Unknown location',
            status: selectedResource.createdAt
              ? new Date(selectedResource.createdAt).toLocaleDateString()
              : '',
          }}
          onClose={closeResourcePortal}
        />
      )}
    </div>
  );
}
