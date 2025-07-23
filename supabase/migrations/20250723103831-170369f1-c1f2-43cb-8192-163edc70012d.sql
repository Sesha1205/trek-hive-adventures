-- Create adventures table
CREATE TABLE public.adventures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Hard', 'Expert')),
  duration INTEGER, -- duration in days
  price INTEGER NOT NULL, -- price in rupees
  images TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  distance INTEGER, -- distance in km
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  category TEXT,
  max_group_size INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.adventures ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to adventures
CREATE POLICY "Adventures are viewable by everyone" 
ON public.adventures 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to create adventures (admin functionality)
CREATE POLICY "Authenticated users can create adventures" 
ON public.adventures 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to update adventures (admin functionality)
CREATE POLICY "Authenticated users can update adventures" 
ON public.adventures 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Insert sample adventure data
INSERT INTO public.adventures (name, location, description, difficulty, duration, price, images, rating, distance, latitude, longitude, category, max_group_size) VALUES
('Himalayan Base Camp Trek', 'Himachal Pradesh', 'Experience the breathtaking views of the Himalayas on this challenging trek to base camp. Perfect for experienced trekkers seeking adventure.', 'Hard', 7, 15000, ARRAY['photo-1506905925346', 'photo-1469474968028-56623f02e425'], 4.8, 45, 32.2396, 78.1278, 'Trekking', 12),
('Rajasthani Desert Safari', 'Rajasthan', 'Explore the golden dunes of Thar Desert with camel safari, desert camping, and traditional Rajasthani culture.', 'Easy', 3, 8000, ARRAY['photo-1469041797191-50ace28483c3', 'photo-1452378174528-3090a4bba7b2'], 4.6, 25, 27.0238, 70.8322, 'Desert Safari', 20),
('Kerala Backwater Adventure', 'Kerala', 'Navigate through the serene backwaters of Kerala with houseboat stays, bird watching, and local cuisine.', 'Easy', 4, 12000, ARRAY['photo-1506744038136-46273834b3fb', 'photo-1500375592092-40eb2168fd21'], 4.7, 30, 9.9312, 76.2673, 'Water Sports', 15),
('Goa Beach Hopping', 'Goa', 'Discover the beautiful beaches of Goa with water sports, beach parties, and Portuguese heritage tours.', 'Easy', 2, 6000, ARRAY['photo-1500375592092-40eb2168fd21', 'photo-1518495973542-4542c06a5843'], 4.5, 15, 15.2993, 74.1240, 'Beach', 25),
('Ladakh High Altitude Trek', 'Ladakh', 'Challenge yourself with this high-altitude trek through the stunning landscapes of Ladakh and ancient monasteries.', 'Expert', 10, 25000, ARRAY['photo-1458668383970-8ddd3927deed', 'photo-1472396961693-142e6e269027'], 4.9, 65, 34.1526, 77.5771, 'Trekking', 8),
('Andaman Scuba Diving', 'Andaman Islands', 'Dive into the crystal-clear waters of Andaman and explore vibrant coral reefs and marine life.', 'Moderate', 5, 18000, ARRAY['photo-1518877593221-1f28583780b4', 'photo-1500375592092-40eb2168fd21'], 4.8, 20, 11.7401, 92.6586, 'Water Sports', 10),
('Western Ghats Wildlife Trek', 'Karnataka', 'Trek through the biodiversity hotspot of Western Ghats and spot exotic wildlife in their natural habitat.', 'Moderate', 6, 14000, ARRAY['photo-1523712999610-f77fbcfc3843', 'photo-1509316975850-ff9c5deb0cd9'], 4.6, 40, 14.5204, 75.7224, 'Wildlife', 15),
('Rishikesh River Rafting', 'Uttarakhand', 'Experience the thrill of white water rafting in the holy city of Rishikesh with yoga sessions and spiritual tours.', 'Moderate', 3, 9000, ARRAY['photo-1504893524553-b855bce32c67', 'photo-1482938289607-e9573fc25ebb'], 4.4, 35, 30.0869, 78.2676, 'Adventure Sports', 18);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_adventures_updated_at
BEFORE UPDATE ON public.adventures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();