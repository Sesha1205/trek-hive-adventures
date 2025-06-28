
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, Clock, DollarSign, Star, Calendar, Backpack, 
  Car, Bus, Bike, Train, Plane, Shield, Heart, 
  Thermometer, Cloud, AlertTriangle, Phone 
} from 'lucide-react';

interface Place {
  name: string;
  location: string;
  description: string;
  activities: string[];
  estimatedCost: number;
  difficulty?: string;
  bestTime?: string;
  tips?: string;
}

interface DayPlan {
  day: number;
  date: string;
  places: Place[];
  totalDayCost: number;
  tips: string;
  meals?: string;
  accommodation?: string;
}

interface TransportationMode {
  routes?: string[];
  cost?: string;
  duration?: string;
  tips?: string;
  stations?: string[];
  airports?: string[];
}

interface Transportation {
  byBus?: TransportationMode;
  byCar?: TransportationMode;
  byBike?: TransportationMode;
  byTrain?: TransportationMode;
  byFlight?: TransportationMode;
}

interface EssentialItems {
  clothing?: string[];
  gear?: string[];
  personal?: string[];
  electronics?: string[];
  emergency?: string[];
  food?: string[];
}

interface SafetyPrecautions {
  general?: string[];
  weather?: string[];
  altitude?: string[];
  wildlife?: string[];
  medical?: string[];
  communication?: string[];
}

interface LocalInfo {
  culture?: string;
  language?: string;
  currency?: string;
  emergency?: string;
}

interface WeatherInfo {
  season?: string;
  temperature?: string;
  rainfall?: string;
  clothing?: string;
}

interface TripPlan {
  destination: string;
  totalDays: number;
  totalBudget: number;
  transportation?: Transportation;
  essentialItems?: EssentialItems;
  safetyPrecautions?: SafetyPrecautions;
  localInfo?: LocalInfo;
  weatherInfo?: WeatherInfo;
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
    const query = `${placeName} ${tripPlan.destination} travel destination`;
    const encodedQuery = encodeURIComponent(query);
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&q=80`;
  };

  const getDifficultyColor = (difficulty: string = '') => {
    const lower = difficulty.toLowerCase();
    if (lower.includes('easy')) return 'bg-green-100 text-green-800 border-green-300';
    if (lower.includes('moderate')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (lower.includes('hard')) return 'bg-red-100 text-red-800 border-red-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const TransportationIcon = ({ mode }: { mode: string }) => {
    switch (mode) {
      case 'car': return <Car className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'bike': return <Bike className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'flight': return <Plane className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  if (tripPlan.error && tripPlan.rawResponse) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 bg-amber-50 animate-fade-in">
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
      <Card className="trek-gradient text-white border-0 shadow-xl animate-gradient">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            {tripPlan.destination} Adventure
          </CardTitle>
          <div className="flex flex-wrap gap-4 text-white/90">
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

      {/* Transportation Options */}
      {tripPlan.transportation && (
        <Card className="glass-card shadow-lg hover-lift">
          <CardHeader>
            <CardTitle className="text-teal flex items-center">
              <Car className="h-5 w-5 mr-2" />
              How to Reach {tripPlan.destination}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(tripPlan.transportation).map(([mode, details]) => (
                <div key={mode} className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-teal transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-teal/10 rounded-lg mr-3">
                      <TransportationIcon mode={mode.replace('by', '').toLowerCase()} />
                    </div>
                    <h4 className="font-semibold capitalize text-gray-900">
                      {mode.replace('by', 'By ')}
                    </h4>
                  </div>
                  {details.cost && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Cost:</span> {details.cost}
                    </p>
                  )}
                  {details.duration && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Duration:</span> {details.duration}
                    </p>
                  )}
                  {details.tips && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      {details.tips}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Essential Items & Safety */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Essential Items */}
        {tripPlan.essentialItems && (
          <Card className="glass-card shadow-lg hover-lift">
            <CardHeader>
              <CardTitle className="text-pink flex items-center">
                <Backpack className="h-5 w-5 mr-2" />
                What to Pack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(tripPlan.essentialItems).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold capitalize text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-pink rounded-full mr-2"></div>
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 gap-1 ml-4">
                      {items?.map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1 h-1 bg-teal rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Safety Precautions */}
        {tripPlan.safetyPrecautions && (
          <Card className="glass-card shadow-lg hover-lift">
            <CardHeader>
              <CardTitle className="text-pink flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Safety Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(tripPlan.safetyPrecautions).map(([category, precautions]) => (
                  <div key={category}>
                    <h4 className="font-semibold capitalize text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 gap-1 ml-6">
                      {precautions?.map((precaution, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mr-2 mt-2"></div>
                          {precaution}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Weather & Local Info */}
      {(tripPlan.weatherInfo || tripPlan.localInfo) && (
        <div className="grid gap-4 md:grid-cols-2">
          {tripPlan.weatherInfo && (
            <Card className="glass-card shadow-lg hover-lift">
              <CardHeader>
                <CardTitle className="text-teal flex items-center">
                  <Thermometer className="h-5 w-5 mr-2" />
                  Weather Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tripPlan.weatherInfo.season && (
                  <p className="text-sm"><span className="font-medium">Best Season:</span> {tripPlan.weatherInfo.season}</p>
                )}
                {tripPlan.weatherInfo.temperature && (
                  <p className="text-sm"><span className="font-medium">Temperature:</span> {tripPlan.weatherInfo.temperature}</p>
                )}
                {tripPlan.weatherInfo.rainfall && (
                  <p className="text-sm"><span className="font-medium">Rainfall:</span> {tripPlan.weatherInfo.rainfall}</p>
                )}
                {tripPlan.weatherInfo.clothing && (
                  <p className="text-sm"><span className="font-medium">Clothing:</span> {tripPlan.weatherInfo.clothing}</p>
                )}
              </CardContent>
            </Card>
          )}

          {tripPlan.localInfo && (
            <Card className="glass-card shadow-lg hover-lift">
              <CardHeader>
                <CardTitle className="text-teal flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Local Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tripPlan.localInfo.culture && (
                  <p className="text-sm"><span className="font-medium">Culture:</span> {tripPlan.localInfo.culture}</p>
                )}
                {tripPlan.localInfo.language && (
                  <p className="text-sm"><span className="font-medium">Language:</span> {tripPlan.localInfo.language}</p>
                )}
                {tripPlan.localInfo.currency && (
                  <p className="text-sm"><span className="font-medium">Currency:</span> {tripPlan.localInfo.currency}</p>
                )}
                {tripPlan.localInfo.emergency && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Emergency: {tripPlan.localInfo.emergency}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Day-wise Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Daily Itinerary</h2>
        {tripPlan.days?.map((day, index) => (
          <Card key={day.day} className="overflow-hidden border-l-4 border-l-pink shadow-lg hover-lift transition-all duration-300">
            <CardHeader className="trek-cream-gradient">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="trek-gradient text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 shadow-lg">
                    {day.day}
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Day {day.day}</span>
                    <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-pink text-pink font-semibold">
                  ₹{day.totalDayCost.toLocaleString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {day.places?.map((place, placeIndex) => (
                  <div key={placeIndex} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-lg hover:border-teal transition-all duration-300">
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
                        <Badge className={`absolute top-2 right-2 border ${getDifficultyColor(place.difficulty)}`}>
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
                              <Badge key={actIndex} variant="secondary" className="text-xs bg-teal/10 text-teal">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-pink">
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

                      {place.tips && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-xs text-blue-800">{place.tips}</p>
                        </div>
                      )}
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

              {day.meals && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-1">🍽️ Meals & Restaurants</h5>
                  <p className="text-sm text-green-800">{day.meals}</p>
                </div>
              )}

              {day.accommodation && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h5 className="font-medium text-purple-900 mb-1">🏨 Accommodation</h5>
                  <p className="text-sm text-purple-800">{day.accommodation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Tips */}
      {tripPlan.additionalTips && (
        <Card className="glass-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-teal">
              <Star className="h-5 w-5 mr-2" />
              Additional Travel Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{tripPlan.additionalTips}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TripPlanDisplay;
