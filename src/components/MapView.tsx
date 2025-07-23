import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Adventure {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  latitude: number;
  longitude: number;
  difficulty: string;
  category: string;
}

interface MapViewProps {
  adventures: Adventure[];
  onAdventureSelect?: (adventure: Adventure) => void;
}

const MapView = ({ adventures, onAdventureSelect }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [77.1025, 28.7041], // India center
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for adventures
    adventures.forEach((adventure) => {
      if (adventure.latitude && adventure.longitude) {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #5ebec4, #f92c85);
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s ease;
        `;
        markerElement.textContent = '🏔️';
        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.1)';
        });
        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-sm mb-1">${adventure.name}</h3>
            <p class="text-xs text-gray-600 mb-2">${adventure.location}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs font-medium text-primary">₹${adventure.price.toLocaleString()}</span>
              <span class="text-xs text-amber-500">⭐ ${adventure.rating}</span>
            </div>
            <button 
              onclick="window.selectAdventure('${adventure.id}')" 
              class="mt-2 w-full bg-primary text-white text-xs py-1 px-2 rounded hover:bg-primary/90 transition-colors"
            >
              View Details
            </button>
          </div>
        `);

        new mapboxgl.Marker(markerElement)
          .setLngLat([adventure.longitude, adventure.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    // Global function for popup button clicks
    (window as any).selectAdventure = (adventureId: string) => {
      const adventure = adventures.find(a => a.id === adventureId);
      if (adventure && onAdventureSelect) {
        onAdventureSelect(adventure);
      }
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, adventures]);

  if (showTokenInput) {
    return (
      <div className="h-64 bg-gradient-to-br from-background via-primary/5 to-secondary/5 rounded-lg flex flex-col items-center justify-center p-6 border border-border/50">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Enable Interactive Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Mapbox public token to view adventure locations on an interactive map.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get your free token at mapbox.com
            </a>
          </p>
        </div>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => setShowTokenInput(false)}
            disabled={!mapboxToken.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 rounded-lg overflow-hidden border border-border/50">
      <div ref={mapContainer} className="absolute inset-0" />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowTokenInput(true)}
        className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm"
      >
        Change Token
      </Button>
    </div>
  );
};

export default MapView;