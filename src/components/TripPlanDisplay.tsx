
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, DollarSign, Star, Calendar, Backpack } from 'lucide-react';

interface Place {
  name: string;
  location: string;
  description: string;
  activities: string[];
  estimatedCost: number;
  difficulty?: string;
  bestTime?: string;
}

interface DayPlan {
  day: number;
  date: string;
  places: Place[];
  totalDayCost: number;
  tips: string;
}

interface TripPlan {
  destination: string;
  totalDays: number;
  totalBudget: number;
  days: DayPlan[];
  additionalTips?: string;
  packingList?: string[];
  rawResponse?: string;
  error?: string;
}

interface TripPlanDisplayProps {
  tripPlan: TripPlan;
}

const TripPlanDisplay: React.FC<TripPlanDisplayProps> = ({ tripPlan }) => {
  const getPlaceImage = (placeName: string) => {
    // Generate search-friendly query
    const query = `${placeName} ${tripPlan.destination} travel destination`;
    const encodedQuery = encodeURIComponent(query);
    // Using Unsplash with travel/nature related keywords as fallback
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&q=80`;
  };

  const getDifficultyColor = (difficulty: string = '') => {
    const lower = difficulty.toLowerCase();
    if (lower.includes('easy')) return 'bg-green-100 text-green-800';
    if (lower.includes('moderate')) return 'bg-yellow-100 text-yellow-800';
    if (lower.includes('hard')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (tripPlan.error && tripPlan.rawResponse) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Trip Plan Generated (Raw Response)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border">
                {tripPlan.rawResponse}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Trip Overview */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            {tripPlan.destination} Adventure
          </CardTitle>
          <div className="flex flex-wrap gap-4 text-emerald-100">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{tripPlan.totalDays} Days</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>₹{tripPlan.totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Day-wise Plans */}
      <div className="space-y-4">
        {tripPlan.days?.map((day, index) => (
          <Card key={day.day} className="overflow-hidden border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    {day.day}
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Day {day.day}</span>
                    <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-700">
                  ₹{day.totalDayCost.toLocaleString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {day.places?.map((place, placeIndex) => (
                  <div key={placeIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-32 bg-gray-200">
                      <img
                        src={getPlaceImage(place.name)}
                        alt={place.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&q=80`;
                        }}
                      />
                      {place.difficulty && (
                        <Badge className={`absolute top-2 right-2 ${getDifficultyColor(place.difficulty)}`}>
                          {place.difficulty}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{place.name}</h4>
                      <p className="text-xs text-gray-500 mb-2 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {place.location}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">{place.description}</p>
                      
                      {place.activities && place.activities.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {place.activities.slice(0, 3).map((activity, actIndex) => (
                              <Badge key={actIndex} variant="secondary" className="text-xs">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-emerald-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span className="font-medium">₹{place.estimatedCost}</span>
                        </div>
                        {place.bestTime && (
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">{place.bestTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {day.tips && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-1">💡 Day Tips</h5>
                  <p className="text-sm text-blue-800">{day.tips}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      {(tripPlan.additionalTips || tripPlan.packingList) && (
        <div className="grid gap-4 md:grid-cols-2">
          {tripPlan.additionalTips && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <Star className="h-5 w-5 mr-2" />
                  Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{tripPlan.additionalTips}</p>
              </CardContent>
            </Card>
          )}
          
          {tripPlan.packingList && tripPlan.packingList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <Backpack className="h-5 w-5 mr-2" />
                  Packing List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {tripPlan.packingList.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default TripPlanDisplay;
