import { AlertTriangle, ArrowLeft, FileText, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Sample official updates data - in a real app, this would come from an API
const SAMPLE_OFFICIAL_UPDATES = [
  {
    id: 'ou1',
    source: 'FEMA',
    title: 'Manhattan Flood Response Update',
    content:
      'FEMA has deployed response teams to Manhattan. Shelters are open at the following locations: City College, PS 87, and the Armory. Residents in flood zones A and B should evacuate immediately.',
    url: 'https://fema.gov/manhattan-flood',
    disaster_ids: ['1'],
    timestamp: '2025-06-19T08:00:00Z',
    category: 'emergency',
  },
  {
    id: 'ou2',
    source: "California Governor's Office",
    title: 'State of Emergency Declared for Northern California',
    content:
      'The Governor has declared a state of emergency for five counties affected by the wildfire. National Guard units have been activated to assist with evacuations and fire control.',
    url: 'https://gov.ca.gov/emergency',
    disaster_ids: ['2'],
    timestamp: '2025-06-19T07:30:00Z',
    category: 'emergency',
  },
  {
    id: 'ou3',
    source: 'National Hurricane Center',
    title: 'Hurricane Laura Update #4',
    content:
      'Hurricane Laura has been upgraded to Category 3 with sustained winds of 115 mph. Expected to make landfall near Houston in the next 24-36 hours. Storm surge of 9-13 feet possible.',
    url: 'https://nhc.noaa.gov/laura',
    disaster_ids: ['3'],
    timestamp: '2025-06-19T09:15:00Z',
    category: 'warning',
  },
  {
    id: 'ou4',
    source: 'Chicago Department of Emergency Management',
    title: 'Winter Storm Response and Recovery',
    content:
      'City crews are working to clear major roads and emergency routes. Power restoration is underway with priority given to hospitals and warming centers. Check chicago.gov/winter for updates.',
    url: 'https://chicago.gov/winter',
    disaster_ids: ['4'],
    timestamp: '2025-06-19T06:30:00Z',
    category: 'update',
  },
  {
    id: 'ou5',
    source: 'Miami-Dade Emergency Operations',
    title: 'Tornado Warning Extended',
    content:
      'The tornado warning for Miami-Dade County has been extended until 5:00 PM. Multiple tornado touchdowns have been confirmed. Seek shelter immediately in an interior room on the lowest floor.',
    url: 'https://miamidade.gov/emergency',
    disaster_ids: ['5'],
    timestamp: '2025-06-19T10:45:00Z',
    category: 'warning',
  },
  {
    id: 'ou6',
    source: 'Seattle Public Utilities',
    title: 'Water System Update Following Earthquake',
    content:
      'Testing has confirmed contamination in parts of the water system. A boil water advisory is in effect for downtown and northern neighborhoods. Water distribution sites are being established.',
    url: 'https://seattle.gov/water',
    disaster_ids: ['6'],
    timestamp: '2025-06-19T12:00:00Z',
    category: 'advisory',
  },
  {
    id: 'ou7',
    source: 'Red Cross',
    title: 'Shelter Status Update - Manhattan Flood',
    content:
      'All Red Cross shelters in Manhattan are at capacity. Additional shelters are being opened in Brooklyn and Queens. Transportation assistance is available by calling 555-RED-CROSS.',
    url: 'https://redcross.org/shelters',
    disaster_ids: ['1'],
    timestamp: '2025-06-19T11:15:00Z',
    category: 'update',
  },
  {
    id: 'ou8',
    source: 'CalFire',
    title: 'Northern California Wildfire Containment Update',
    content:
      'The wildfire is currently 15% contained. Fire lines are holding on the eastern front, but conditions remain hazardous on the western perimeter due to high winds. Evacuation orders remain in effect.',
    url: 'https://calfire.gov/status',
    disaster_ids: ['2'],
    timestamp: '2025-06-19T09:45:00Z',
    category: 'update',
  },
];

// Get category color
const getCategoryColor = category => {
  switch (category) {
    case 'emergency':
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
    case 'warning':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300';
    case 'advisory':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
    case 'update':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
};

export default function OfficialUpdates() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch official updates (simulated)
  useEffect(() => {
    const fetchOfficialUpdates = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));

        // Sort by timestamp (newest first)
        const sortedUpdates = [...SAMPLE_OFFICIAL_UPDATES].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setUpdates(sortedUpdates);
        setFilteredUpdates(sortedUpdates);
      } catch (err) {
        setError('Failed to fetch official updates. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficialUpdates();
  }, []);

  // Filter updates when search term or category changes
  useEffect(() => {
    let filtered = updates;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        update =>
          update.title.toLowerCase().includes(term) ||
          update.content.toLowerCase().includes(term) ||
          update.source.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(update => update.category === selectedCategory);
    }

    setFilteredUpdates(filtered);
  }, [searchTerm, selectedCategory, updates]);

  // Refresh official updates
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate new data by adding a timestamp
      const refreshedUpdates = SAMPLE_OFFICIAL_UPDATES.map(update => ({
        ...update,
        refreshed: true,
        timestamp: new Date().toISOString(),
      }));

      // Sort by timestamp (newest first)
      const sortedUpdates = [...refreshedUpdates].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setUpdates(sortedUpdates);
      setFilteredUpdates(sortedUpdates);
    } catch (err) {
      setError('Failed to refresh official updates. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle category selection
  const toggleCategory = category => {
    setSelectedCategory(prev => (prev === category ? '' : category));
  };

  // Format timestamp
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate('/reports')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Button>

        <Button variant="outline" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <FileText className="mr-2 h-6 w-6 text-primary" />
          Official Updates
        </h1>
        <p className="text-muted-foreground">
          Updates from government agencies and official relief organizations
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search official updates..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="md:max-w-md"
        />

        <div className="flex flex-wrap gap-2">
          {['emergency', 'warning', 'advisory', 'update'].map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer ${selectedCategory === category ? '' : getCategoryColor(category)}`}
              onClick={() => toggleCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {loading && !updates.length ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary/70" />
          <p className="text-muted-foreground">Loading official updates...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUpdates.map(update => (
            <Card key={update.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{update.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {update.source} • {formatTimestamp(update.timestamp)}
                    </p>
                  </div>
                  <Badge className={getCategoryColor(update.category)}>
                    {update.category.charAt(0).toUpperCase() + update.category.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="mb-2 whitespace-pre-wrap">{update.content}</p>

                {update.disaster_ids && update.disaster_ids.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">Related disasters: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {update.disaster_ids.map(id => (
                        <Badge key={id} variant="outline" className="text-xs">
                          Disaster #{id}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-muted/50 border-t">
                <Button variant="outline" size="sm" asChild>
                  <a href={update.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Update
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredUpdates.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No official updates found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back later for updates'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
