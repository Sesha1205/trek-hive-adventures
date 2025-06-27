
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Users, Calendar } from 'lucide-react';

const TripDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                  alt="Trip"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 left-4 bg-teal-600">Moderate</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Himalayan Base Camp Trek</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Himachal Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>4.8 (124 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>7 days</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Max 12 people</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Experience the breathtaking beauty of the Himalayas on this 7-day trek to the base camp. 
                  Perfect for adventure enthusiasts looking for a moderate challenge with stunning mountain views.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">What's Included</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Professional guide and porter services</li>
                      <li>All meals during the trek</li>
                      <li>Camping equipment and accommodation</li>
                      <li>Transportation to/from base point</li>
                      <li>First aid and emergency support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book This Trip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-teal-600">₹12,999</span>
                  <span className="text-gray-600 block text-sm">per person</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Select Date</label>
                    <input type="date" className="w-full p-2 border rounded-lg mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Number of People</label>
                    <select className="w-full p-2 border rounded-lg mt-1">
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3 People</option>
                      <option>4+ People</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this trip? Our AI assistant can help!
                </p>
                <Button variant="outline" className="w-full">
                  Ask AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
