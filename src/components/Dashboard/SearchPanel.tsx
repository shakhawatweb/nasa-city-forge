import { useState } from "react";
import { Search, MapPin, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface SearchPanelProps {
  onAreaSelect: (area: any) => void;
  onAnalysisStart: (loading: boolean) => void;
  selectedArea: any;
}

const SearchPanel = ({ onAreaSelect, onAnalysisStart, selectedArea }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [layers, setLayers] = useState({
    temperature: true,
    vegetation: true,
    pollution: true,
    soilMoisture: false,
    population: false,
  });

  const handleSearch = async () => {
    if (searchQuery || (coordinates.lat && coordinates.lng)) {
      onAnalysisStart(true);
      // Simulate API call
      setTimeout(() => {
        onAreaSelect({
          name: searchQuery || `${coordinates.lat}, ${coordinates.lng}`,
          coordinates: coordinates.lat && coordinates.lng 
            ? { lat: parseFloat(coordinates.lat), lng: parseFloat(coordinates.lng) }
            : { lat: 40.7128, lng: -74.0060 }, // Default to NYC
          type: 'search'
        });
        onAnalysisStart(false);
      }, 1500);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 font-space">
            <Search className="w-5 h-5" />
            Search Area
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>City or Location</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter city name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button size="sm" onClick={handleSearch}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Latitude</Label>
              <Input
                placeholder="40.7128"
                value={coordinates.lat}
                onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                placeholder="-74.0060"
                value={coordinates.lng}
                onChange={(e) => setCoordinates({...coordinates, lng: e.target.value})}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleSearch}>
            <Target className="w-4 h-4 mr-2" />
            Analyze Location
          </Button>
        </CardContent>
      </Card>

      {/* Map Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 font-space">
            <MapPin className="w-5 h-5" />
            Map Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Draw Polygon
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Select Radius
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Click to Select
          </Button>
        </CardContent>
      </Card>

      {/* Data Layers */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 font-space">
            <Layers className="w-5 h-5" />
            Data Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {Object.entries(layers).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    key === 'temperature' ? 'bg-nasa-red' :
                    key === 'vegetation' ? 'bg-vegetation-green' :
                    key === 'pollution' ? 'bg-orange-500' :
                    key === 'soilMoisture' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <Label className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </Label>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => 
                    setLayers({...layers, [key]: checked})
                  }
                />
              </div>
            ))}
          </div>

          {selectedArea && (
            <div className="mt-4 pt-4 border-t border-border">
              <Badge variant="secondary" className="mb-2">
                Selected Area
              </Badge>
              <p className="text-sm text-muted-foreground">
                {selectedArea.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPanel;