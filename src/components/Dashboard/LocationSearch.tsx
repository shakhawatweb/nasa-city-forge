import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Target } from "lucide-react";
import { toast } from "sonner";

interface LocationSearchProps {
  onLocationSelect: (location: any) => void;
  selectedLocation: any;
}

const LocationSearch = ({ onLocationSelect, selectedLocation }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleCitySearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a city or district name");
      return;
    }

    setIsLoading(true);
    try {
      // Mock search - in real app, would use geocoding API
      const mockResults = [
        { name: "New York City", lat: 40.7128, lng: -74.0060, country: "USA" },
        { name: "London", lat: 51.5074, lng: -0.1278, country: "UK" },
        { name: "Tokyo", lat: 35.6762, lng: 139.6503, country: "Japan" },
      ];
      
      const result = mockResults.find(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || mockResults[0];
      
      onLocationSelect({
        ...result,
        type: "city",
        searchQuery
      });
      
      toast.success(`Location set to ${result.name}`);
    } catch (error) {
      toast.error("Failed to search location");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoordinateSearch = () => {
    const lat = parseFloat(coordinates.lat);
    const lng = parseFloat(coordinates.lng);
    
    if (isNaN(lat) || isNaN(lng)) {
      toast.error("Please enter valid coordinates");
      return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast.error("Coordinates out of range");
      return;
    }

    onLocationSelect({
      name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat,
      lng,
      type: "coordinates"
    });
    
    toast.success("Location set from coordinates");
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSelect({
          name: "Current Location",
          lat: latitude,
          lng: longitude,
          type: "current"
        });
        toast.success("Using current location");
        setIsLoading(false);
      },
      (error) => {
        toast.error("Failed to get current location");
        setIsLoading(false);
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* City/District Search */}
        <div className="space-y-2">
          <Label>Search City or District</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
            />
            <Button onClick={handleCitySearch} disabled={isLoading}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Coordinate Input */}
        <div className="space-y-2">
          <Label>Enter Coordinates</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Latitude"
              value={coordinates.lat}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
            />
            <Input
              placeholder="Longitude"
              value={coordinates.lng}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lng: e.target.value }))}
            />
          </div>
          <Button onClick={handleCoordinateSearch} variant="outline" className="w-full">
            <Target className="w-4 h-4 mr-2" />
            Set Location
          </Button>
        </div>

        {/* Current Location */}
        <Button 
          onClick={handleCurrentLocation} 
          variant="outline" 
          className="w-full"
          disabled={isLoading}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use Current Location
        </Button>

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium">Selected Location</h4>
            <p className="text-sm text-muted-foreground">{selectedLocation.name}</p>
            <p className="text-xs text-muted-foreground">
              {selectedLocation.lat?.toFixed(4)}, {selectedLocation.lng?.toFixed(4)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSearch;