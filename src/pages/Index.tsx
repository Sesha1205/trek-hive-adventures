import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, Clock, Compass, Mountain, TreePine, Sun } from 'lucide-react';

const Index = () => {
  // Mock data for popular destinations
  const popularDestinations = [
    {
      id: 1,
      name: 'Himalayan Base Camp Trek',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      price: '₹12,999',
      duration: '7 days',
      difficulty: 'Moderate',
      rating: 4.8,
      distance: '120 km from you'
    },
    {
      id: 2,
      name: 'Western Ghats Adventure',
      location: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      price: '₹8,499',
      duration: '5 days',
      difficulty: 'Easy',
      rating: 4.6,
      distance: '85 km from you'
    },
    {
      id: 3,
      name: 'Rajasthan Desert Safari',
      location: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop',
      price: '₹6,999',
      duration: '4 days',
      difficulty: 'Easy',
      rating: 4.7,
      distance: '200 km from you'
    },
    {
      id: 4,
      name: 'Kerala Backwaters Trek',
      location: 'Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
      price: '₹9,799',
      duration: '6 days',
      difficulty: 'Moderate',
      rating: 4.9,
      distance: '150 km from you'
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: 'GPS-Based Recommendations',
      description: 'Find treks near your location with real-time GPS tracking'
    },
    {
      icon: Compass,
      title: 'AI Trip Planner',
      description: 'Get personalized recommendations powered by advanced AI'
    },
    {
      icon: Mountain,
      title: 'Expert Guides',
      description: 'Professional guides for safe and memorable adventures'
    },
    {
      icon: Sun,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your trek needs'
    }
  ];

  const handleSearch = (searchData: any) => {
    console.log('Search data:', searchData);
    // Navigate to explore page with search params
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 trek-hero-bg" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Discover Your Next
              <span className="block text-yellow-400">Adventure</span>
            </h1>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto animate-slide-up">
              Find and book amazing treks with real-time GPS tracking, AI recommendations, 
              and expert guides. Your adventure awaits!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto animate-fade-scale">
              <SearchBar onSearch={handleSearch} className="glass-card" />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <TreePine className="h-8 w-8 text-green-300 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <Mountain className="h-10 w-10 text-green-200 opacity-60" />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most loved trekking destinations, handpicked for unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card 
                key={destination.id} 
                className="hover-lift overflow-hidden border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-teal-600 hover:bg-teal-700">
                    {destination.difficulty}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {destination.distance}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {destination.name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-600">
                      {destination.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-teal-600 hover:bg-teal-700"
                      asChild
                    >
                      <Link to={`/trip/${destination.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              asChild
            >
              <Link to="/explore">
                <Compass className="h-5 w-5 mr-2" />
                Explore All Destinations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose TrekHive?
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Experience the future of adventure travel with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-100">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who have discovered amazing treks with TrekHive. 
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
              asChild
            >
              <Link to="/explore">
                <Compass className="h-5 w-5 mr-2" />
                Start Exploring
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="rounded-lg bg-gradient-to-br from-green-600 to-teal-600 p-2">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">TrekHive</span>
              </div>
              <p className="text-gray-400">
                Discover amazing adventures with AI-powered recommendations and GPS tracking.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/explore" className="hover:text-white transition-colors">All Destinations</Link></li>
                <li><Link to="/explore?type=trek" className="hover:text-white transition-colors">Trekking</Link></li>
                <li><Link to="/explore?type=camping" className="hover:text-white transition-colors">Camping</Link></li>
                <li><Link to="/explore?type=adventure" className="hover:text-white transition-colors">Adventure Sports</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrekHive. All rights reserved. Made with ❤️ for adventurers.</p>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;
