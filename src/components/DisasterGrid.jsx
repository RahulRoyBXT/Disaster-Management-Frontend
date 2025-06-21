import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllDisasters } from '@/api';
import { DisasterCard } from '@/components/DisasterCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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
  },
  {
    id: '3',
    title: 'Houston Hurricane Warning',
    location_name: 'Houston, Texas',
    description:
      'Hurricane warning issued for Houston area. Expected to make landfall in 48 hours with category 3 strength.',
    tags: ['hurricane', 'warning'],
    created_at: '2025-06-17T14:45:00Z',
    severity: 'medium',
  },
  {
    id: '4',
    title: 'Chicago Winter Storm',
    location_name: 'Chicago, Illinois',
    description:
      'Severe winter storm with expected snowfall of 18-24 inches. Potential for power outages and transportation disruptions.',
    tags: ['winter', 'storm'],
    created_at: '2025-06-14T10:00:00Z',
    severity: 'high',
  },
  {
    id: '5',
    title: 'Miami Tornado Alert',
    location_name: 'Miami, Florida',
    description:
      'Tornado alert issued for Miami and surrounding areas. Take shelter immediately if warnings are issued.',
    tags: ['tornado', 'alert'],
    created_at: '2025-06-16T18:30:00Z',
    severity: 'medium',
  },
  {
    id: '6',
    title: 'Seattle Earthquake',
    location_name: 'Seattle, Washington',
    description:
      'Magnitude 5.4 earthquake reported near Seattle. Checking for structural damage and potential aftershocks.',
    tags: ['earthquake', 'monitoring'],
    created_at: '2025-06-15T23:20:00Z',
    severity: 'high',
  },
  {
    id: '7',
    title: 'Phoenix Extreme Heat Warning',
    location_name: 'Phoenix, Arizona',
    description:
      'Extreme heat warning with temperatures expected to reach 115°F. Cooling centers open throughout the city.',
    tags: ['heat', 'warning'],
    created_at: '2025-06-17T09:15:00Z',
    severity: 'medium',
  },
  {
    id: '8',
    title: 'New Orleans Flood Risk',
    location_name: 'New Orleans, Louisiana',
    description:
      'Increased flood risk due to rising river levels. Monitoring levees and preparing for potential evacuations.',
    tags: ['flood', 'monitoring'],
    created_at: '2025-06-14T16:45:00Z',
    severity: 'low',
  },
  {
    id: '9',
    title: 'Denver Avalanche Warning',
    location_name: 'Denver, Colorado',
    description:
      'Avalanche warning for mountainous regions around Denver. Avoid backcountry travel and high-risk areas.',
    tags: ['avalanche', 'warning'],
    created_at: '2025-06-16T07:30:00Z',
    severity: 'high',
  },
  {
    id: '10',
    title: 'Atlanta Severe Thunderstorm',
    location_name: 'Atlanta, Georgia',
    description:
      'Severe thunderstorm with potential for flash flooding and damaging winds. Stay indoors and avoid flooded areas.',
    tags: ['thunderstorm', 'flooding'],
    created_at: '2025-06-17T20:10:00Z',
    severity: 'medium',
  },
];

// Available filter tags
const ALL_TAGS = [
  'flood',
  'wildfire',
  'hurricane',
  'earthquake',
  'tornado',
  'winter',
  'heat',
  'avalanche',
  'thunderstorm',
];

export function DisasterGrid() {
  const [disasters, setDisasters] = useState([]);
  const [filteredDisasters, setFilteredDisasters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState('');
  // Load disasters on mount
  useEffect(() => {
    fetchDisasters();
  }, []);

  const fetchDisasters = async () => {
    try {
      const response = await getAllDisasters();
      console.log('disaster data', response);
      // Ensure response.data is an array
      const disasterArray = Array.isArray(response.data) ? response.data : [];
      setDisasters(disasterArray);
      setFilteredDisasters(disasterArray);
    } catch (error) {
      console.error('Error fetching disasters:', error);
      // Fallback to sample data if API fails
      setDisasters(SAMPLE_DISASTERS);
      setFilteredDisasters(SAMPLE_DISASTERS);
    }
  };

  // Handle disaster deletion
  const handleDisasterDeleted = deletedId => {
    // Remove the deleted disaster from both disasters and filteredDisasters
    setDisasters(prev => prev.filter(disaster => disaster.id !== deletedId));
    setFilteredDisasters(prev => prev.filter(disaster => disaster.id !== deletedId));
  };

  // Filter disasters based on search term and selected tags
  useEffect(() => {
    let result = disasters; // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        disaster =>
          disaster.title?.toLowerCase().includes(term) ||
          disaster.locationName?.toLowerCase().includes(term) ||
          disaster.location_name?.toLowerCase().includes(term) ||
          disaster.description?.toLowerCase().includes(term)
      );
    }

    // Filter by tags
    if (selectedTags?.length > 0) {
      result = result.filter(
        disaster =>
          Array.isArray(disaster.tags) && disaster.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Filter by severity
    if (selectedSeverity) {
      result = result.filter(disaster => disaster.severity === selectedSeverity);
    }

    setFilteredDisasters(result);
  }, [disasters, searchTerm, selectedTags, selectedSeverity]);

  // Toggle tag selection
  const toggleTag = tag => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Toggle severity selection
  const toggleSeverity = severity => {
    setSelectedSeverity(prev => (prev === severity ? '' : severity));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Active Disasters</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search disasters..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link to="/disasters/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Disaster
            </Link>
          </Button>
        </div>
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
          <h2 className="text-sm font-medium">Filter by severity:</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {['low', 'medium', 'high', 'critical'].map(severity => (
            <Badge
              key={severity}
              variant={selectedSeverity === severity ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer',
                severity === 'low' && 'hover:bg-blue-500 hover:text-white',
                severity === 'medium' && 'hover:bg-yellow-500 hover:text-white',
                severity === 'high' && 'hover:bg-orange-500 hover:text-white',
                severity === 'critical' && 'hover:bg-red-500 hover:text-white',
                selectedSeverity === severity && severity === 'low' && 'bg-blue-500 text-white',
                selectedSeverity === severity &&
                  severity === 'medium' &&
                  'bg-yellow-500 text-white',
                selectedSeverity === severity && severity === 'high' && 'bg-orange-500 text-white',
                selectedSeverity === severity && severity === 'critical' && 'bg-red-500 text-white'
              )}
              onClick={() => toggleSeverity(severity)}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Badge>
          ))}
        </div>
      </div>{' '}
      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredDisasters?.length || 0} of {disasters?.length || 0} disasters
      </p>
      {/* Disaster cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {' '}
        {Array.isArray(filteredDisasters) && filteredDisasters.length > 0 ? (
          filteredDisasters.map(disaster => (
            <DisasterCard
              key={disaster.id || Math.random().toString()}
              disaster={disaster}
              onDisasterDeleted={handleDisasterDeleted}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No disasters found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
