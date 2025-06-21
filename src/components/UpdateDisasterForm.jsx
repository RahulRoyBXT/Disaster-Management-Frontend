import { AlertCircle, ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDisaster, updateDisaster } from '@/api';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Available tags for selection
const AVAILABLE_TAGS = [
  'flood',
  'wildfire',
  'hurricane',
  'earthquake',
  'tornado',
  'winter',
  'heat',
  'avalanche',
  'thunderstorm',
  'evacuation',
  'warning',
  'alert',
  'monitoring',
  'urgent',
  'plane crash',
  'death',
];

export function UpdateDisasterForm() {
  const { disasterId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    locationName: '',
    description: '',
    severity: 'MEDIUM',
    latitude: null,
    longitude: null,
  });

  // Fetch existing disaster data
  useEffect(() => {
    const fetchDisaster = async () => {
      try {
        setIsLoading(true);
        const response = await getDisaster(disasterId);

        if (response && response.data) {
          const disaster = response.data;

          // Set form data from disaster
          setFormData({
            title: disaster.title || '',
            locationName: disaster.locationName || '',
            description: disaster.description || '',
            severity: disaster.severity || 'MEDIUM',
            latitude: disaster.latitude || null,
            longitude: disaster.longitude || null,
          });

          // Set tags
          if (disaster.tags && Array.isArray(disaster.tags)) {
            setSelectedTags(disaster.tags);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching disaster:', err);
        setError('Failed to load disaster details. Please try again.');
        setIsLoading(false);
      }
    };

    if (disasterId) {
      fetchDisaster();
    }
  }, [disasterId]);

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;

    // Handle numeric fields (latitude and longitude)
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prev => ({
        ...prev,
        [name]: value ? parseFloat(value) : null,
      }));
    } else {
      // Handle text fields
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle severity selection
  const handleSeverityChange = value => {
    // Convert to uppercase for API consistency
    setFormData(prev => ({
      ...prev,
      severity: value?.toUpperCase(),
    }));
  };

  // Toggle tag selection
  const toggleTag = tag => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the disaster data for API
      const disasterData = {
        title: formData.title,
        locationName: formData.locationName,
        description: formData.description,
        severity: formData.severity,
        tags: selectedTags,
      };

      // Add coordinates if provided
      if (formData.latitude !== null && formData.longitude !== null) {
        disasterData.latitude = formData.latitude;
        disasterData.longitude = formData.longitude;
      }

      // Call the API to update the disaster
      const response = await updateDisaster(disasterId, disasterData);

      console.log('Disaster updated successfully:', response);

      // Navigate to the disaster details page
      navigate(`/disasters/${disasterId}`);
    } catch (err) {
      console.error('Error updating disaster:', err);
      setError(err.message || 'Failed to update disaster. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="text-center py-12">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
            role="progressbar"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted-foreground mt-2">Loading disaster details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate(`/disasters/${disasterId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Disaster Details
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Update Disaster</CardTitle>
          <CardDescription>
            Update the details for this disaster to keep information current.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Manhattan Flood"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationName">Location</Label>
              <Input
                disabled="true"
                id="locationName"
                name="locationName"
                placeholder="e.g., Manhattan, NYC"
                value={formData.locationName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (optional)</Label>
                <Input
                  disabled="true"
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="e.g., 40.7128"
                  value={formData.latitude || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude (optional)</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="e.g., -74.0060"
                  value={formData.longitude || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about the disaster..."
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                disabled="true"
                value={formData.severity}
                onValueChange={handleSeverityChange}
              >
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent disabled="true">
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 pt-2">
                {AVAILABLE_TAGS.map(tag => (
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
              {selectedTags.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Disaster is already Categorized
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/disasters/${disasterId}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || selectedTags.length === 0}>
              {isSubmitting ? (
                'Updating...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Disaster
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
