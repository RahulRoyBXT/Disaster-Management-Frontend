import { AlertTriangle, Calendar, MapPin, Tag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { deleteDisaster } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DisasterCard({ disaster, className, onDisasterDeleted }) {
  // Handle empty disaster object gracefully
  if (!disaster) return null;

  const {
    id,
    title,
    location_name,
    locationName,
    description,
    tags = [],
    created_at,
    createdAt,
    severity = 'medium', // low, medium, high, critical
  } = disaster;

  // Use proper location name field based on API response
  const displayLocation = locationName || location_name || 'Unknown Location';

  // Format date from proper date field
  const dateToFormat = createdAt || created_at;
  const formattedDate = dateToFormat
    ? new Date(dateToFormat).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown Date';

  // Determine severity color
  const getSeverityColor = severity => {
    switch (severity?.toLowerCase()) {
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

  // Delete disaster handler
  const handleDelete = async e => {
    e.preventDefault(); // Prevent navigation to details page
    e.stopPropagation();

    if (
      window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)
    ) {
      try {
        await deleteDisaster(id);
        console.log('Disaster deleted successfully');
        // Call the callback to refresh the parent component
        if (onDisasterDeleted) {
          onDisasterDeleted(id);
        }
      } catch (error) {
        console.error('Error deleting disaster:', error);
        alert('Failed to delete disaster. Please try again.');
      }
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
            <h3 className="text-lg font-semibold truncate mr-2">{title || 'Untitled Disaster'}</h3>
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
            <span className="truncate">{displayLocation}</span>
          </div>

          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>

          <p className="mt-3 text-sm line-clamp-3">{description || 'No description available'}</p>

          <div className="flex flex-wrap gap-1 mt-4">
            {Array.isArray(tags) &&
              tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 pt-0 border-t">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/disasters/${id}`}>Details</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to={`/disasters/${id}/resources`}>Resources</Link>
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDelete} className="ml-2">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
