
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Calendar, DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import TripPlanDisplay from './TripPlanDisplay';

interface SearchBarProps {
  onSearch?: (searchData: SearchData) => void;
  className?: string;
}

interface SearchData {
  destination: string;
  fromDate: string;
  toDate: string;
  budget: string;
  location?: { lat: number; lng: number };
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const { user } = useAuth();
  const [searchData, setSearchData] = useState<SearchData>({
    destination: '',
    fromDate: '',
    toDate: '',
    budget: '',
  });
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);

  const handleLocationDetect = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setSearchData(prev => ({ ...prev, location }));
        toast.success('Location detected successfully!');
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Unable to detect location. Please enable location services.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const handleSearch = async () => {
    if (!searchData.destination.trim()) {
      toast.error('Please enter a destination');
      return;
    }

    if (!searchData.fromDate || !searchData.toDate) {
      toast.error('Please select travel dates');
      return;
    }

    if (!searchData.budget) {
      toast.error('Please enter your budget');
      return;
    }

    const fromDate = new Date(searchData.fromDate);
    const toDate = new Date(searchData.toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      toast.error('From date cannot be in the past');
      return;
    }

    if (toDate <= fromDate) {
      toast.error('To date must be after from date');
      return;
    }

    if (!user) {
      toast.error('Please sign in to get personalized trip recommendations');
      return;
    }

    setIsSearching(true);
    setTripPlan(null);

    try {
      console.log('Calling trip planner with:', searchData);
      
      const { data, error } = await supabase.functions.invoke('trip-planner', {
        body: {
          destination: searchData.destination,
          fromDate: searchData.fromDate,
          toDate: searchData.toDate,
          budget: parseInt(searchData.budget.replace(/[^0-9]/g, '')),
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast.error('Failed to generate trip plan. Please try again.');
        return;
      }

      console.log('Trip planner response:', data);

      if (data.tripPlan) {
        setTripPlan(data.tripPlan);
        
        // Save to database
        const { error: saveError } = await supabase
          .from('trip_recommendations')
          .insert({
            user_id: user.id,
            destination: searchData.destination,
            from_date: searchData.fromDate,
            to_date: searchData.toDate,
            budget: parseInt(searchData.budget.replace(/[^0-9]/g, '')),
            recommendation_data: data.tripPlan,
          });

        if (saveError) {
          console.error('Error saving trip plan:', saveError);
        }

        toast.success('Comprehensive trip plan generated successfully!');
        onSearch?.(searchData);
        
        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('trip-results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const formatBudget = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers) {
      return `₹${parseInt(numbers).toLocaleString()}`;
    }
    return '';
  };

  return (
    <div className="space-y-8">
      <div className={`glass-card rounded-2xl shadow-xl p-6 animate-fade-scale hover-teal-glow ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-teal" />
              Destination
            </label>
            <Input
              type="text"
              placeholder="Where to explore?"
              value={searchData.destination}
              onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
              className="border-2 border-gray-200 focus:border-pink focus:ring-pink/20 transition-all duration-300"
            />
          </div>

          {/* From Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-teal" />
              From Date
            </label>
            <Input
              type="date"
              value={searchData.fromDate}
              onChange={(e) => setSearchData(prev => ({ ...prev, fromDate: e.target.value }))}
              className="border-2 border-gray-200 focus:border-pink focus:ring-pink/20 transition-all duration-300"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-teal" />
              To Date
            </label>
            <Input
              type="date"
              value={searchData.toDate}
              onChange={(e) => setSearchData(prev => ({ ...prev, toDate: e.target.value }))}
              className="border-2 border-gray-200 focus:border-pink focus:ring-pink/20 transition-all duration-300"
              min={searchData.fromDate || new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-teal" />
              Budget
            </label>
            <Input
              type="text"
              placeholder="₹10,000"
              value={searchData.budget}
              onChange={(e) => setSearchData(prev => ({ ...prev, budget: formatBudget(e.target.value) }))}
              className="border-2 border-gray-200 focus:border-pink focus:ring-pink/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Search Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            variant="outline"
            onClick={handleLocationDetect}
            disabled={isLocating}
            className="flex-shrink-0 btn-secondary"
          >
            <MapPin className={`h-4 w-4 mr-2 ${isLocating ? 'animate-pulse' : ''}`} />
            {isLocating ? 'Detecting...' : 'Use My Location'}
          </Button>
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 sm:flex-none btn-primary px-8 py-2.5 shadow-lg"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Plan My Adventure
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Trip Plan Results */}
      {tripPlan && (
        <div id="trip-results" className="animate-slide-up">
          <TripPlanDisplay tripPlan={tripPlan} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
