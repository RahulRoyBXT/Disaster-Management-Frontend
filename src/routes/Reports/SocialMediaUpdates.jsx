import { AlertTriangle, ArrowLeft, RefreshCw, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Sample social media data - in a real app, this would come from an API
const SAMPLE_SOCIAL_MEDIA = [
  {
    id: 'sm1',
    platform: 'twitter',
    username: 'NYCEmergency',
    content:
      '#FloodAlert: Subway lines 1, 2, and 3 suspended due to flooding. Use alternate routes. #NYCFlood',
    tags: ['flood', 'transit', 'emergency'],
    verified: true,
    timestamp: '2025-06-19T08:30:00Z',
    priority: 'high',
  },
  {
    id: 'sm2',
    platform: 'twitter',
    username: 'SFFireDept',
    content:
      'Evacuation orders in place for North Bay communities. Check https://sffire.gov/evacuations for your zone. #CaliforniaWildfire',
    tags: ['wildfire', 'evacuation', 'emergency'],
    verified: true,
    timestamp: '2025-06-19T07:15:00Z',
    priority: 'high',
  },
  {
    id: 'sm3',
    platform: 'twitter',
    username: 'HoustonOEM',
    content:
      'Hurricane expected to make landfall within 36 hours. Prepare now. Shelters opening at noon today at the following locations: [list]',
    tags: ['hurricane', 'shelter', 'preparation'],
    verified: true,
    timestamp: '2025-06-19T09:45:00Z',
    priority: 'high',
  },
  {
    id: 'sm4',
    platform: 'twitter',
    username: 'citizen_reporter',
    content:
      'I can see the flood waters rising on Main St. Almost to the first floor of buildings now. #ManhattanFlood',
    tags: ['flood', 'firsthand'],
    verified: false,
    timestamp: '2025-06-19T10:20:00Z',
    priority: 'medium',
  },
  {
    id: 'sm5',
    platform: 'twitter',
    username: 'volunteer_nyc',
    content:
      'Organizing volunteer flood response at Community Center on 34th St. Need supplies and helping hands! #NYCFlood #FloodRelief',
    tags: ['flood', 'volunteer', 'aid'],
    verified: false,
    timestamp: '2025-06-19T11:05:00Z',
    priority: 'medium',
  },
  {
    id: 'sm6',
    platform: 'twitter',
    username: 'weather_alert',
    content:
      'TORNADO WARNING for Miami-Dade County until 3:45 PM. Take shelter immediately in interior room on lowest floor. #MiamiTornado',
    tags: ['tornado', 'warning', 'emergency'],
    verified: true,
    timestamp: '2025-06-19T09:30:00Z',
    priority: 'critical',
  },
  {
    id: 'sm7',
    platform: 'twitter',
    username: 'ChicagoMayor',
    content:
      'Winter storm has caused power outages across north side. Warming centers open 24/7. Check chicago.gov/warmingcenters #ChicagoStorm',
    tags: ['winter', 'power', 'shelter'],
    verified: true,
    timestamp: '2025-06-19T06:45:00Z',
    priority: 'high',
  },
  {
    id: 'sm8',
    platform: 'twitter',
    username: 'SeattlePublicUtilities',
    content:
      'Boil water advisory in effect following earthquake for zip codes 98101, 98102, 98104. Updates at seattle.gov/water #SeattleEarthquake',
    tags: ['earthquake', 'water', 'advisory'],
    verified: true,
    timestamp: '2025-06-19T12:15:00Z',
    priority: 'high',
  },
  {
    id: 'sm9',
    platform: 'twitter',
    username: 'SOS_message',
    content:
      'URGENT: Trapped in building at 45 Wall St, 4th floor. Water rising quickly. Need rescue. #SOSFlood #ManhattanFlood',
    tags: ['flood', 'sos', 'rescue'],
    verified: false,
    timestamp: '2025-06-19T10:50:00Z',
    priority: 'critical',
  },
  {
    id: 'sm10',
    platform: 'twitter',
    username: 'CalFireUpdates',
    content:
      'Fire has jumped containment line near Highway 101. New evacuation orders for West Ranch area. Check phone alerts. #CaliforniaWildfire',
    tags: ['wildfire', 'evacuation', 'emergency'],
    verified: true,
    timestamp: '2025-06-19T11:30:00Z',
    priority: 'critical',
  },
];

// Get color based on priority
const getPriorityColor = priority => {
  switch (priority) {
    case 'critical':
      return 'text-red-500 bg-red-100 dark:bg-red-900/30';
    case 'high':
      return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
    case 'medium':
      return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
    case 'low':
      return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
    default:
      return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
  }
};

export default function SocialMediaUpdates() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch social media posts (simulated)
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));

        // Sort by timestamp (newest first) and priority
        const sortedPosts = [...SAMPLE_SOCIAL_MEDIA].sort((a, b) => {
          // First sort by priority
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

          if (priorityDiff !== 0) return priorityDiff;

          // If same priority, sort by timestamp (newest first)
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (err) {
        setError('Failed to fetch social media updates. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(
      post =>
        post.content.toLowerCase().includes(term) ||
        post.username.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
    );

    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  // Refresh social media data
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate new data by adding a timestamp
      const refreshedPosts = SAMPLE_SOCIAL_MEDIA.map(post => ({
        ...post,
        refreshed: true,
        timestamp: new Date().toISOString(),
      }));

      // Sort by timestamp (newest first) and priority
      const sortedPosts = [...refreshedPosts].sort((a, b) => {
        // First sort by priority
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

        if (priorityDiff !== 0) return priorityDiff;

        // If same priority, sort by timestamp (newest first)
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
    } catch (err) {
      setError('Failed to refresh social media updates. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <Twitter className="mr-2 h-6 w-6 text-sky-500" />
          Social Media Updates
        </h1>
        <p className="text-muted-foreground">
          Real-time updates from social media platforms related to ongoing disasters
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search posts by content, username, or tags..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading && !posts.length ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary/70" />
          <p className="text-muted-foreground">Loading social media updates...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <Card
              key={post.id}
              className={`overflow-hidden border-l-4 ${
                post.priority === 'critical'
                  ? 'border-l-red-500'
                  : post.priority === 'high'
                    ? 'border-l-orange-500'
                    : post.priority === 'medium'
                      ? 'border-l-yellow-500'
                      : 'border-l-blue-500'
              }`}
            >
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mr-2">
                      <Twitter className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">@{post.username}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.verified && (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Verified
                      </Badge>
                    )}
                    <Badge className={getPriorityColor(post.priority)}>
                      {post.priority.charAt(0).toUpperCase() + post.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2 pb-4 px-4">
                <p className="mb-3 whitespace-pre-wrap">{post.content}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No social media updates found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search term' : 'Check back later for updates'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
