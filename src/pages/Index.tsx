
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, Clock, Compass, Mountain, TreePine, Sparkles, Shield, Zap, Globe } from 'lucide-react';

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
      icon: Sparkles,
      title: 'AI Trip Planner',
      description: 'Get personalized day-wise itineraries powered by advanced AI',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'GPS-Based Recommendations',
      description: 'Find amazing destinations near your location with real-time GPS',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Expert Guides',
      description: 'Professional guides for safe and memorable adventures',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your trek needs',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleSearch = (searchData: any) => {
    console.log('Search data:', searchData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-teal-600/85 to-cyan-600/90" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='nonzero'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Discover Your Next
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed">
              Find and plan amazing treks with AI-powered recommendations, real-time GPS tracking, 
              and expert guides. Your personalized adventure awaits!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-6xl mx-auto animate-fade-scale">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <TreePine className="h-8 w-8 text-emerald-300 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <Mountain className="h-10 w-10 text-emerald-200 opacity-60" />
        </div>
        <div className="absolute top-1/2 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <Globe className="h-6 w-6 text-teal-300 opacity-50" />
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
                className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                    {destination.difficulty}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                    {destination.distance}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
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
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {destination.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md"
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
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 px-8"
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TrekHive?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of adventure travel with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`bg-gradient-to-br ${feature.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of adventurers who have discovered amazing treks with TrekHive. 
            Start your personalized journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 shadow-lg"
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
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 px-8 py-3"
              asChild
            >
              <Link to="/auth">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Link>
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
                <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">TrekHive</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
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
