import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Map, Layers, Satellite, TreePine, Droplets, Building } from "lucide-react";

interface InteractiveMapProps {
  selectedLocation: any;
  onLocationSelect: (location: any) => void;
}

const InteractiveMap = ({ selectedLocation, onLocationSelect }: InteractiveMapProps) => {
  const [mapLayers, setMapLayers] = useState({
    satellite: true,
    temperature: false,
    pollution: false,
    population: false,
    vegetation: false,
    waterBodies: false,
    urbanHeat: false
  });

  const [mapStyle, setMapStyle] = useState("satellite");

  const toggleLayer = (layer: string) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleMapClick = (event: React.MouseEvent) => {
    // Mock map click coordinates
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to approximate lat/lng (mock calculation)
    const lat = 40.7128 + (y - rect.height / 2) * 0.001;
    const lng = -74.0060 + (x - rect.width / 2) * 0.001;
    
    onLocationSelect({
      name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat,
      lng,
      type: "map-click"
    });
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5" />
          Interactive Map
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Map Style Controls */}
        <div className="flex gap-2">
          <Button
            variant={mapStyle === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle("satellite")}
          >
            <Satellite className="w-4 h-4 mr-1" />
            Satellite
          </Button>
          <Button
            variant={mapStyle === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle("terrain")}
          >
            <Map className="w-4 h-4 mr-1" />
            Terrain
          </Button>
        </div>

        {/* Map Area */}
        <div 
          className="flex-1 bg-muted rounded-lg border-2 border-dashed border-border cursor-crosshair relative overflow-hidden"
          onClick={handleMapClick}
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900">
            {/* Mock Satellite View */}
            {mapStyle === "satellite" && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 dark:from-green-800 dark:via-yellow-900 dark:to-blue-800" />
            )}
            
            {/* Selected Location Marker */}
            {selectedLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
            )}
            
            {/* Layer Overlays */}
            {mapLayers.temperature && (
              <div className="absolute inset-0 bg-red-500/20 pointer-events-none" />
            )}
            {mapLayers.pollution && (
              <div className="absolute inset-0 bg-gray-500/20 pointer-events-none" />
            )}
            {mapLayers.vegetation && (
              <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-green-500/30 pointer-events-none" />
            )}
          </div>
          
          {/* Map Click Instructions */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            Click anywhere on the map to select a location
          </div>
          
          {/* Coordinates Display */}
          {selectedLocation && (
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
              {selectedLocation.lat?.toFixed(6)}, {selectedLocation.lng?.toFixed(6)}
            </div>
          )}
        </div>

        {/* Layer Controls */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Data Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="temperature"
                  checked={mapLayers.temperature}
                  onCheckedChange={() => toggleLayer("temperature")}
                />
                <Label htmlFor="temperature" className="text-sm">Temperature</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="pollution"
                  checked={mapLayers.pollution}
                  onCheckedChange={() => toggleLayer("pollution")}
                />
                <Label htmlFor="pollution" className="text-sm">Air Quality</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="population"
                  checked={mapLayers.population}
                  onCheckedChange={() => toggleLayer("population")}
                />
                <Label htmlFor="population" className="text-sm">Population</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="vegetation"
                  checked={mapLayers.vegetation}
                  onCheckedChange={() => toggleLayer("vegetation")}
                />
                <Label htmlFor="vegetation" className="text-sm">Vegetation</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="waterBodies"
                  checked={mapLayers.waterBodies}
                  onCheckedChange={() => toggleLayer("waterBodies")}
                />
                <Label htmlFor="waterBodies" className="text-sm">Water Bodies</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="urbanHeat"
                  checked={mapLayers.urbanHeat}
                  onCheckedChange={() => toggleLayer("urbanHeat")}
                />
                <Label htmlFor="urbanHeat" className="text-sm">Heat Islands</Label>
              </div>
            </div>

            {/* Active Layers Info */}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Active layers: {Object.values(mapLayers).filter(Boolean).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </div>
  );
};

export default InteractiveMap;