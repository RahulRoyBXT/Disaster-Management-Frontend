import {
  AlertTriangle,
  Check,
  ExternalLink,
  Github,
  Globe,
  Heart,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Shield,
  Twitter,
} from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export function AboutPage() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        setLoading(true);
        // Fetch data for both contributors
        const usernames = ['RahulRoyBXT', 'codedip47'];
        const fetchPromises = usernames.map(username =>
          fetch(`https://api.github.com/users/${username}`).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch GitHub data for ${username}`);
            }
            return response.json();
          })
        );

        const results = await Promise.all(fetchPromises);

        // Add additional info that's not in the GitHub API
        const enrichedData = [
          {
            ...results[0],
            role: 'Frontend Developer',
            skills: ['Frontend Developer', 'React', 'Full Stack'],
            shortBio:
              'Frontend Developer with a B. Tech in Information Technology. Proficient in React, JavaScript, CSS, and Tailwind, with hands-on experience building and delivering multiple projects.',
            social: {
              twitter: 'https://twitter.com/rahulroycob',
              linkedin: 'https://linkedin.com/in/rahul-roy-bak',
              email: 'rahul.roybak@gmail.com',
              website: 'https://www.rahulroy.live/',
            },
          },
          {
            ...results[1],
            role: 'Full Stack Developer',
            skills: ['Full Stack Developer', 'JavaScript', 'Backend'],
            shortBio:
              'A passionate Full Stack Developer based in India. Currently working at Levon Techno Solutions pvt ltd. Specializes in building robust web applications with modern JavaScript frameworks.',
            social: {
              linkedin: 'https://www.linkedin.com/in/dip-saha18/',
            },
          },
        ];

        setContributors(enrichedData);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About ResponsEase</h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive disaster response coordination platform
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              ResponsEase is designed to coordinate disaster response efforts by aggregating
              real-time data from multiple sources. We aim to empower communities, first responders,
              and disaster management professionals with accurate, timely information and tools for
              faster, more effective responses during emergencies.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Disaster Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create, track, and manage disaster records with detailed information including
                    location, descriptions, and tags. All actions are tracked with a comprehensive
                    audit trail.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Location Intelligence</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Advanced location extraction from descriptions and geocoding capabilities.
                    Coordinates are used for geospatial resource mapping and location-based queries.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Social Media Monitoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Real-time monitoring of social media for emergency reports, requests for help,
                    and resource offers. Prioritization system flags urgent reports for immediate
                    attention.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Image Verification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    AI-powered analysis of user-uploaded disaster images to verify authenticity,
                    detect manipulated content, and validate disaster context.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>React for component-based UI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Tailwind CSS for styling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>shadcn/ui for UI components</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>React Router for navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>WebSocket integration for real-time updates</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Node.js and Express for REST APIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Supabase (PostgreSQL) for data storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Geospatial queries for location-based lookups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Google Gemini API for AI-powered features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Socket.IO for real-time communication</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold">External Integrations</h2>
            <p className="text-lg text-muted-foreground mb-6">
              ResponsEase integrates with multiple external services to provide comprehensive
              disaster management capabilities:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-min">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Google Gemini API</h3>
                  <p className="text-muted-foreground">
                    Used for location extraction from disaster descriptions and image verification.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-min">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Mapping Services</h3>
                  <p className="text-muted-foreground">
                    Integration with mapping services (Google Maps, Mapbox, or OpenStreetMap) for
                    geocoding and visualization.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-min">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Social Media Monitoring</h3>
                  <p className="text-muted-foreground">
                    Integration with social media APIs to monitor disaster-related posts and
                    requests for help.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-min">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Relief Agency Updates</h3>
                  <p className="text-muted-foreground">
                    Aggregation of official updates from government and relief agencies like FEMA
                    and Red Cross.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="space-y-4 mt-12 bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Get Involved</h2>
            <p className="text-lg">
              ResponsEase is committed to improving disaster response coordination. If you'd like to
              contribute or learn more about our platform, please contact us at{' '}
              <a href="mailto:info@responsease.com" className="text-primary hover:underline">
                info@responsease.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold">Contributors</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Meet the talented developers behind ResponsEase who have contributed to this disaster
              management platform:
            </p>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <span className="ml-2 text-lg">Loading contributor data...</span>
              </div>
            ) : error ? (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  Error loading contributor data: {error}. Using fallback information.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contributors.map(contributor => (
                  <Card key={contributor.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarImage
                            src={contributor.avatar_url}
                            alt={contributor.name || contributor.login}
                          />
                          <AvatarFallback>
                            {contributor.login.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">
                            {contributor.name || contributor.login}
                          </CardTitle>
                          <CardDescription className="text-base font-medium">
                            @{contributor.login}
                          </CardDescription>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {contributor.skills.map(skill => (
                              <Badge key={skill} variant="outline" className="bg-primary/10">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground mb-4">
                        {contributor.bio || contributor.shortBio}
                      </p>
                      {contributor.location && (
                        <p className="text-sm text-muted-foreground mb-4">
                          <Globe className="h-4 w-4 inline mr-1" /> {contributor.location}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        <a
                          href={contributor.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        {contributor.social?.twitter && (
                          <a
                            href={contributor.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {contributor.social?.linkedin && (
                          <a
                            href={contributor.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {contributor.social?.email && (
                          <a
                            href={`mailto:${contributor.social.email}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        )}
                        {contributor.social?.website || contributor.blog ? (
                          <a
                            href={contributor.social?.website || contributor.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
