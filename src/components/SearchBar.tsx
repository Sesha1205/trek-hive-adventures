
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface SearchBarProps {
  onSearch?: (searchData: SearchData) => void;
  className?: string;
}

interface SearchData {
  destination: string;
  dates: string;
  budget: string;
  location?: { lat: number; lng: number };
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    destination: '',
    dates: '',
    budget: '',
  });
  const [isLocating, setIsLocating] = useState(false);

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
        
        // Reverse geocoding to get location name (in a real app, you'd use Google Maps API)
        console.log('User location:', location);
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

  const handleSearch = () => {
    if (!searchData.destination.trim()) {
      toast.error('Please enter a destination');
      return;
    }
    
    onSearch?.(searchData);
    toast.success('Searching for treks...');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-teal-600" />
            Destination
          </label>
          <Input
            type="text"
            placeholder="Where to?"
            value={searchData.destination}
            onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
            className="border-gray-200 focus:border-teal-500"
          />
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-teal-600" />
            Dates
          </label>
          <Input
            type="date"
            value={searchData.dates}
            onChange={(e) => setSearchData(prev => ({ ...prev, dates: e.target.value }))}
            className="border-gray-200 focus:border-teal-500"
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-teal-600" />
            Budget
          </label>
          <Input
            type="text"
            placeholder="₹5,000"
            value={searchData.budget}
            onChange={(e) => setSearchData(prev => ({ ...prev, budget: e.target.value }))}
            className="border-gray-200 focus:border-teal-500"
          />
        </div>

        {/* Search Actions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 opacity-0">Actions</label>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleLocationDetect}
              disabled={isLocating}
              className="flex-shrink-0 border-teal-200 text-teal-600 hover:bg-teal-50"
              title="Use my location"
            >
              <MapPin className={`h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
            </Button>
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
