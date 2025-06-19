import { AlertTriangle, Bell, MessageSquare, Siren } from 'lucide-react';
import { useEffect, useState } from 'react';

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

// Urgent keywords to flag high-priority reports
const URGENT_KEYWORDS = [
  'urgent',
  'emergency',
  'immediate',
  'critical',
  'life-threatening',
  'sos',
  'help',
  'danger',
  'severe',
  'trapped',
  'evacuate',
  'evacuation',
  'stranded',
  'medical',
  'casualty',
  'casualties',
  'wounded',
  'injured',
];

// Sample high-priority reports for demonstration
const SAMPLE_PRIORITY_ALERTS = [
  {
    id: 'p1',
    source: 'twitter',
    username: 'citizen_report',
    content:
      'URGENT: Family trapped on roof due to rising floodwaters near 5th and Main St. Need immediate boat rescue. #SOSManhattan',
    disaster_id: '1',
    timestamp: '2025-06-19T10:45:00Z',
    priority: 'critical',
    matches: ['URGENT', 'trapped', 'immediate', 'SOS'],
  },
  {
    id: 'p2',
    source: 'report',
    username: 'paramedic_1',
    content:
      'Medical emergency at evacuation center. Elderly patient with severe respiratory distress. Need oxygen supplies ASAP.',
    disaster_id: '2',
    timestamp: '2025-06-19T09:30:00Z',
    priority: 'high',
    matches: ['emergency', 'severe', 'ASAP'],
  },
  {
    id: 'p3',
    source: 'twitter',
    username: 'storm_watcher',
    content:
      'Highway 59 completely flooded with multiple vehicles stranded. At least 3 cars with people inside. Coordinates: 29.7604° N, 95.3698° W',
    disaster_id: '3',
    timestamp: '2025-06-19T11:10:00Z',
    priority: 'high',
    matches: ['stranded'],
  },
];

export function PriorityAlertSystem() {
  const [alerts, setAlerts] = useState(SAMPLE_PRIORITY_ALERTS);
  const [newAlertCount, setNewAlertCount] = useState(0);
  const [lastChecked, setLastChecked] = useState(new Date());

  // Simulate receiving new alerts periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      const shouldAddAlert = Math.random() > 0.7; // 30% chance of new alert

      if (shouldAddAlert) {
        const newAlert = {
          id: `p${Date.now()}`,
          source: Math.random() > 0.5 ? 'twitter' : 'report',
          username: `user_${Math.floor(Math.random() * 1000)}`,
          content: 'URGENT: New emergency situation reported. Immediate assistance required.',
          disaster_id: ['1', '2', '3', '4', '5'][Math.floor(Math.random() * 5)],
          timestamp: new Date().toISOString(),
          priority: Math.random() > 0.5 ? 'critical' : 'high',
          matches: ['URGENT', 'emergency', 'Immediate'],
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts
        setNewAlertCount(prev => prev + 1);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Mark all alerts as seen
  const handleMarkAllSeen = () => {
    setNewAlertCount(0);
    setLastChecked(new Date());
  };

  // Analyze text for urgent keywords
  const analyzeForUrgency = text => {
    const textLower = text.toLowerCase();
    const matches = URGENT_KEYWORDS.filter(keyword => textLower.includes(keyword.toLowerCase()));

    // Determine priority level based on matches
    let priority = 'normal';
    if (matches.length >= 3) {
      priority = 'critical';
    } else if (matches.length >= 1) {
      priority = 'high';
    }

    return { matches, priority };
  };

  // Format timestamp as relative time
  const formatRelativeTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Siren className="h-5 w-5 text-red-500 mr-2" />
            <CardTitle>Priority Alerts</CardTitle>
          </div>
          {newAlertCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {newAlertCount} New
            </Badge>
          )}
        </div>
        <CardDescription>High-priority reports requiring immediate attention</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <Alert
              key={alert.id}
              variant={alert.priority === 'critical' ? 'destructive' : 'default'}
              className={`border-l-4 ${
                alert.priority === 'critical' ? 'border-l-red-500' : 'border-l-orange-500'
              } ${new Date(alert.timestamp) > lastChecked ? 'bg-muted/50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {alert.priority === 'critical' ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Bell className="h-4 w-4 text-orange-500" />
                  )}
                  <AlertTitle className="ml-2">
                    {alert.priority === 'critical' ? 'CRITICAL ALERT' : 'HIGH PRIORITY'}
                  </AlertTitle>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatRelativeTime(alert.timestamp)}
                </div>
              </div>

              <AlertDescription className="mt-2">
                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full p-1.5 mt-1">
                    {alert.source === 'twitter' ? (
                      <MessageSquare className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{alert.username}</div>
                    <p className="text-sm mb-2">{alert.content}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {alert.matches.map(keyword => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="text-xs bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No priority alerts at this time</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Last checked: {lastChecked.toLocaleTimeString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllSeen}
            disabled={newAlertCount === 0}
          >
            Mark all as seen
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PriorityAlertSystem;
