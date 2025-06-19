import { AlertTriangle, Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DisasterCard({ disaster, className }) {
  const {
    id,
    title,
    location_name,
    description,
    tags = [],
    created_at,
    severity = 'medium', // low, medium, high, critical
  } = disaster;

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Determine severity color
  const getSeverityColor = severity => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'bg-blue-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col h-full',
        className
      )}
    >
      <div className="relative">
        {/* Severity indicator */}
        <div className={`absolute top-0 left-0 w-2 h-full ${getSeverityColor(severity)}`}></div>

        <div className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold truncate mr-2">{title}</h3>
            <AlertTriangle
              className={cn(
                'h-5 w-5',
                severity === 'low' && 'text-blue-500',
                severity === 'medium' && 'text-yellow-500',
                severity === 'high' && 'text-orange-500',
                severity === 'critical' && 'text-red-500'
              )}
            />
          </div>

          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location_name}</span>
          </div>

          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>

          <p className="mt-3 text-sm line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-1 mt-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 pt-0 border-t">
        <div className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/disasters/${id}`}>Details</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to={`/disasters/${id}/resources`}>Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
