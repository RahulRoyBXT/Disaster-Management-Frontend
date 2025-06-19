import { AlertCircle, ArrowLeft, Image, Save } from 'lucide-react';
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
  'food',
  'water',
  'urgent',
  'road',
  'evacuation',
  'wildfire',
  'shelter',
  'preparation',
  'power',
  'heat',
  'tornado',
  'infrastructure',
  'safety',
];

// Sample disaster data for the dropdown
const SAMPLE_DISASTERS = [
  { id: '1', title: 'Manhattan Flood' },
  { id: '2', title: 'California Wildfire' },
  { id: '3', title: 'Houston Hurricane Warning' },
  { id: '4', title: 'Chicago Winter Storm' },
  { id: '5', title: 'Miami Tornado Alert' },
  { id: '6', title: 'Seattle Earthquake' },
];

export function CreateReportForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    disaster_id: '',
    content: '',
    image_url: '',
  });

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle disaster selection
  const handleDisasterChange = value => {
    setFormData(prev => ({
      ...prev,
      disaster_id: value,
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

      // Create new report object
      const newReport = {
        ...formData,
        tags: selectedTags,
        created_at: new Date().toISOString(),
        user_id: 'DemoUser', // Would come from authentication in a real app
        verification_status: 'pending',
        id: Math.random().toString(36).substring(2, 9), // Random ID for demo
      };

      console.log('New report:', newReport);

      // In a real app, you would send this to your API
      // For now, we'll just redirect back to the reports page
      navigate('/reports');
    } catch (err) {
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/reports')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Reports
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Report</CardTitle>
          <CardDescription>
            Share information about a disaster situation or offer assistance
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
              <Label htmlFor="disaster_id">Related Disaster</Label>
              <Select value={formData.disaster_id} onValueChange={handleDisasterChange}>
                <SelectTrigger id="disaster_id">
                  <SelectValue placeholder="Select related disaster" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_DISASTERS.map(disaster => (
                    <SelectItem key={disaster.id} value={disaster.id}>
                      {disaster.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Report Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Describe the situation, needs, or assistance you can offer..."
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="flex-grow"
                />
                <Button type="button" variant="outline" size="icon">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Add a URL to an image that shows the current situation
              </p>
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
              <p className="text-sm text-muted-foreground mt-2">
                Select tags to categorize your report
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/reports')}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.disaster_id || !formData.content}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
