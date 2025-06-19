import { AlertCircle, ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
];

export function CreateDisasterForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location_name: '',
    description: '',
    severity: 'medium',
  });

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle severity selection
  const handleSeverityChange = value => {
    setFormData(prev => ({
      ...prev,
      severity: value,
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
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new disaster object
      const newDisaster = {
        ...formData,
        tags: selectedTags,
        created_at: new Date().toISOString(),
        id: Math.random().toString(36).substring(2, 9), // Random ID for demo
      };

      console.log('New disaster:', newDisaster);

      // In a real app, you would send this to your API
      // For now, we'll just redirect back to the disasters page
      navigate('/disasters');
    } catch (err) {
      setError(err.message || 'Failed to create disaster. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/disasters')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Disasters
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Disaster</CardTitle>
          <CardDescription>
            Add a new disaster to the system for coordination and response.
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
              <Label htmlFor="location_name">Location</Label>
              <Input
                id="location_name"
                name="location_name"
                placeholder="e.g., Manhattan, NYC"
                value={formData.location_name}
                onChange={handleInputChange}
                required
              />
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
              <Select value={formData.severity} onValueChange={handleSeverityChange}>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
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
                  Select at least one tag to categorize the disaster
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/disasters')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || selectedTags.length === 0}>
              {isSubmitting ? (
                'Creating...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Disaster
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
