import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResourceCard } from '@/routes/Resources/ResourceCard';
import { ResourcePortal } from '@/routes/Resources/ResourcePortal';

// Sample resources data
const SAMPLE_RESOURCES = [
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
  {
    id: '7',
    name: 'Medical Supplies',
    type: 'supplies',
    quantity: 1200,
    location: 'Medical Warehouse',
    status: 'available',
  },
  {
    id: '8',
    name: 'Power Generators',
    type: 'supplies',
    quantity: 45,
    location: 'Equipment Storage',
    status: 'depleted',
  },
  {
    id: '9',
    name: 'Search and Rescue Teams',
    type: 'personnel',
    quantity: 15,
    location: 'Various Locations',
    status: 'standby',
  },
  {
    id: '10',
    name: 'Mobile Command Centers',
    type: 'facility',
    quantity: 3,
    location: 'Police HQ',
    status: 'active',
  },
];

// Resource types and statuses for filtering
const RESOURCE_TYPES = ['supplies', 'personnel', 'vehicle', 'facility'];
const RESOURCE_STATUSES = ['available', 'deployed', 'active', 'standby', 'depleted'];

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showResourcePortal, setShowResourcePortal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Load resources on mount (simulating API call)
  useEffect(() => {
    // In a real app, this would be an API call
    setResources(SAMPLE_RESOURCES);
    setFilteredResources(SAMPLE_RESOURCES);
  }, []);

  // Filter resources based on search term and selected filters
  useEffect(() => {
    let result = resources;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        resource =>
          resource.name.toLowerCase().includes(term) ||
          resource.location.toLowerCase().includes(term) ||
          resource.type.toLowerCase().includes(term)
      );
    }

    // Filter by types
    if (selectedTypes.length > 0) {
      result = result.filter(resource => selectedTypes.includes(resource.type));
    }

    // Filter by statuses
    if (selectedStatuses.length > 0) {
      result = result.filter(resource => selectedStatuses.includes(resource.status));
    }

    setFilteredResources(result);
  }, [resources, searchTerm, selectedTypes, selectedStatuses]);

  // Toggle type selection
  const toggleType = type => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Toggle status selection
  const toggleStatus = status => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
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

        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Filter by status:</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {RESOURCE_STATUSES.map(status => (
            <Badge
              key={status}
              variant={selectedStatuses.includes(status) ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => toggleStatus(status)}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredResources.length} of {resources.length} resources
      </p>

      {/* Resource cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
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

      {/* Resource Portal */}
      {showResourcePortal && selectedResource && (
        <ResourcePortal resource={selectedResource} onClose={closeResourcePortal} />
      )}
    </div>
  );
}
