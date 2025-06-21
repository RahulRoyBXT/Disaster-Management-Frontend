import { AlertCircle, ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getResource, updateResource } from '@/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

export function ResourceUpdateForm() {
  const { disasterId, resourceId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'supplies',
    quantity: 1,
    location: '',
    status: 'available',
    description: '',
  });

  // Load existing resource data
  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getResource(resourceId);

        if (response && response.data) {
          const resource = response.data;

          // Set form data with existing values
          setFormData({
            name: resource.name || '',
            type: resource.type || 'supplies',
            quantity: resource.quantity || 1,
            location: resource.location || '',
            status: resource.status || 'available',
            description: resource.description || '',
          });
        } else {
          setError('Resource data not found');
        }
      } catch (error) {
        console.error('Error fetching resource:', error);
        setError('Failed to load resource data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (resourceId) {
      fetchResourceData();
    }
  }, [resourceId]);

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) || 1 : value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the resource data for API
      const resourceData = {
        ...formData,
        disasterId: disasterId, // Include disaster ID
      };

      await updateResource(resourceId, resourceData);

      console.log('Resource updated successfully');

      // Navigate back to disaster resources page
      navigate(`/disasters/${disasterId}/resources`);
    } catch (err) {
      console.error('Error updating resource:', err);
      setError(err.message || 'Failed to update resource. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
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
          <p className="mt-4 text-lg">Loading resource data...</p>
        </div>
      </div>
    );
  }

  const navigateBack = () => {
    navigate(`/disasters/${disasterId}/resources`);
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button variant="outline" className="mb-6" onClick={navigateBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Resources
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Update Resource</CardTitle>
          <CardDescription>
            Update the resource details for disaster coordination and response.
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
              <Label htmlFor="name">Resource Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Water Purification Kits"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Resource Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={value => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="personnel">Personnel</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="facility">Facility</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={value => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="deployed">Deployed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="standby">Standby</SelectItem>
                    <SelectItem value="depleted">Depleted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="e.g., 100"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Central Distribution Center"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Additional details about the resource..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={navigateBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                'Updating...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Resource
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default ResourceUpdateForm;
