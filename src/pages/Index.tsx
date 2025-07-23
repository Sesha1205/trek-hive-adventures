
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIAssistant from '@/components/AIAssistant';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Users, Calendar, ArrowRight, Mountain, Compass, Camera } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredTrips = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      location: "Himachal Pradesh",
      rating: 4.8,
      reviews: 124,
      duration: "7 days",
      price: "₹12,999",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      difficulty: "Moderate"
    },
    {
      id: 2,
      title: "Western Ghats Adventure",
      location: "Maharashtra",
      rating: 4.6,
      reviews: 89,
      duration: "5 days",
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Rajasthan Desert Safari",
      location: "Rajasthan",
      rating: 4.9,
      reviews: 156,
      duration: "4 days",
      price: "₹15,999",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="min-h-screen trek-cream-gradient">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 animate-float">
            <Mountain className="h-16 w-16 text-teal" />
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <Compass className="h-12 w-12 text-pink" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
            <Camera className="h-14 w-14 text-teal" />
          </div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient animate-bounce-gentle">
              Discover Your Next
              <br />
              <span className="text-pink">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Let AI plan your perfect trekking and adventure experience. 
              Get personalized recommendations, detailed itineraries, and expert guidance.
            </p>
          </div>
          
          <div className={`search-section transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
            <SearchBar className="max-w-6xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 section-gradient-1 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 animate-fade-scale">
              Why Choose TrekHive?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of AI-powered planning and adventure exploration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mountain className="h-8 w-8" />,
                title: "AI-Powered Planning",
                description: "Get personalized itineraries based on your preferences, budget, and travel dates."
              },
              {
                icon: <Compass className="h-8 w-8" />,
                title: "Expert Guidance",
                description: "Detailed information about transportation, packing lists, and safety precautions."
              },
              {
                icon: <Camera className="h-8 w-8" />,
                title: "Curated Experiences",
                description: "Discover hidden gems and popular destinations with comprehensive travel guides."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card text-center hover-lift animate-fade-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="trek-gradient p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-16 px-4 section-gradient-2 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Popular Adventures
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most loved trekking and adventure experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map((trip, index) => (
              <Card key={trip.id} className="overflow-hidden hover-lift shadow-lg animate-fade-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      trip.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trip.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-pink font-bold">{trip.price}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{trip.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{trip.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{trip.rating} ({trip.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full btn-primary group"
                    onClick={() => navigate('/explore')}
                  >
                    Explore Trip
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 section-gradient-3 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 animate-fade-scale">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of adventurers who trust TrekHive to plan their perfect getaway. 
              Start your journey today with AI-powered trip planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8 py-3 shadow-xl"
                onClick={() => {
                  const searchSection = document.querySelector('.search-section');
                  searchSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Plan My Trip
                <Mountain className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary text-lg px-8 py-3"
                onClick={() => navigate('/explore')}
              >
                Explore Destinations
                <Compass className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AIAssistant />
    </div>
  );
};

export default Index;
