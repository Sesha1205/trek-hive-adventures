
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Filter, Clock, Users, Mountain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Adventure {
  id: string;
  name: string;
  location: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
  images: string[];
  rating: number;
  distance: number;
  latitude: number;
  longitude: number;
  category: string;
  max_group_size: number;
}

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    fetchAdventures();
  }, []);

  const fetchAdventures = async () => {
    try {
      setLoading(true);
      let query = supabase.from('adventures').select('*');
      
      if (filterCategory !== 'all') {
        query = query.eq('category', filterCategory);
      }
      
      if (filterDifficulty !== 'all') {
        query = query.eq('difficulty', filterDifficulty);
      }

      // Add sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'difficulty':
          query = query.order('difficulty', { ascending: true });
          break;
        default:
          query = query.order('name', { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching adventures:', error);
        toast({
          title: "Error",
          description: "Failed to load adventures. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setAdventures(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, [sortBy, filterCategory, filterDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleBookAdventure = (adventure: Adventure) => {
    navigate('/booking', { state: { adventure } });
  };

  const handleAdventureSelect = (adventure: Adventure) => {
    setSelectedAdventure(adventure);
    // Scroll to the selected adventure card
    const element = document.getElementById(`adventure-${adventure.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Explore Adventures
            </h1>
            <p className="text-muted-foreground">Discover amazing adventures across India</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Trekking">Trekking</SelectItem>
                <SelectItem value="Water Sports">Water Sports</SelectItem>
                <SelectItem value="Desert Safari">Desert Safari</SelectItem>
                <SelectItem value="Beach">Beach</SelectItem>
                <SelectItem value="Wildlife">Wildlife</SelectItem>
                <SelectItem value="Adventure Sports">Adventure Sports</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Adventures Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded w-16"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : adventures.length === 0 ? (
              <div className="text-center py-12">
                <Mountain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No adventures found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {adventures.map((adventure) => (
                  <Card 
                    key={adventure.id} 
                    id={`adventure-${adventure.id}`}
                    className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${
                      selectedAdventure?.id === adventure.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/20'
                    }`}
                    onClick={() => setSelectedAdventure(adventure)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${adventure.images[0]}?w=400&h=300&fit=crop`}
                        alt={adventure.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
                        {adventure.distance} km
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className={getDifficultyColor(adventure.difficulty)}>
                          {adventure.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {adventure.name}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1 text-primary" />
                        <span className="text-sm">{adventure.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {adventure.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {adventure.duration} days
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Max {adventure.max_group_size}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-primary fill-current mr-1" />
                          <span className="text-sm font-medium">{adventure.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({Math.floor(Math.random() * 200 + 50)} reviews)</span>
                        </div>
                        <span className="text-lg font-bold text-primary">₹{adventure.price.toLocaleString()}</span>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAdventure(adventure);
                        }}
                      >
                        Book Adventure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Map Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Adventure Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapView 
                  adventures={adventures} 
                  onAdventureSelect={handleAdventureSelect}
                />
                {selectedAdventure && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-sm text-primary mb-1">
                      {selectedAdventure.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedAdventure.location}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
