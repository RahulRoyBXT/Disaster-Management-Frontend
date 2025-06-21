import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Edit, MapPin, Package2, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export function ResourcePortal({ resource, disasterId, onClose, onEdit, onDelete }) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  // Mount the portal once component is rendered
  useEffect(() => {
    setMounted(true);

    // Prevent body scrolling when portal is open
    document.body.style.overflow = 'hidden';

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  // Get status styling
  const getStatusStyles = status => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'deployed':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'active':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
      case 'standby':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'depleted':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800';
    }
  };

  // Get type icon
  const getTypeIcon = type => {
    switch (type.toLowerCase()) {
      case 'supplies':
        return <Package2 className="h-6 w-6" />;
      case 'vehicle':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11 2 11.3V16c0 .6.4 1 1 1h2"></path>
            <circle cx="7" cy="17" r="2"></circle>
            <path d="M9 17h6"></path>
            <circle cx="17" cy="17" r="2"></circle>
          </svg>
        );
      case 'personnel':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'facility':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21h18"></path>
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
            <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
          </svg>
        );
      default:
        return <AlertCircle className="h-6 w-6" />;
    }
  };
  // Handle edit resource
  const handleEditResource = () => {
    if (onEdit) {
      onEdit(resource.id);
    } else {
      navigate(`/disasters/${disasterId}/resources/${resource.id}/edit`);
      onClose();
    }
  };

  // Handle delete resource
  const handleDeleteResource = () => {
    if (onDelete) {
      onDelete(resource.id);
    } else if (
      window.confirm('Are you sure you want to delete this resource? This action cannot be undone.')
    ) {
      console.log('Deleting resource:', resource.id);
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-full mr-4">{getTypeIcon(resource.type)}</div>
            <div>
              <h2 className="text-2xl font-bold">{resource.name}</h2>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className={cn(getStatusStyles(resource.status))}>
                  {resource.status}
                </Badge>
                <span className="ml-2 text-sm text-muted-foreground capitalize">
                  {resource.type}
                </span>
              </div>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Quantity</div>
              <div className="text-3xl font-bold">{resource.quantity}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Location</div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="font-medium">{resource.location}</span>
              </div>
            </div>
          </div>

          {/* Additional details can be added here */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Description</div>
            <p>
              {resource.description ||
                `This ${resource.type} resource is currently ${resource.status.toLowerCase()} and located at ${resource.location}.`}
            </p>
          </div>

          {/* Mock timeline or activity */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <span className="text-muted-foreground">Today at 10:30 AM:</span> Resource status
                updated to <span className="font-medium">{resource.status}</span>
              </li>
              <li className="text-sm">
                <span className="text-muted-foreground">Yesterday at 3:15 PM:</span> Resource
                quantity updated from <span className="font-medium">{resource.quantity - 50}</span>{' '}
                to <span className="font-medium">{resource.quantity}</span>
              </li>
              <li className="text-sm">
                <span className="text-muted-foreground">June 17, 2025:</span> Resource added to
                disaster response
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-between">
          <Button variant="destructive" onClick={handleDeleteResource}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Resource
          </Button>
          <Button onClick={handleEditResource}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Resource
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
