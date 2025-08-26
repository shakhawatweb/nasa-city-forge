import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapInterfaceProps {
  selectedArea: any;
  onAreaSelect: (area: any) => void;
  analysisData: any;
}

const MapInterface = ({ selectedArea, onAreaSelect, analysisData }: MapInterfaceProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // NYC default
  const [mapZoom, setMapZoom] = useState(10);
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (selectedArea?.coordinates) {
      const { lat, lng } = selectedArea.coordinates;
      setMapCenter([lat, lng]);
      setMapZoom(12);
    }
  }, [selectedArea]);

  // Set up map click handler after map is ready
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onAreaSelect({
        name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        coordinates: { lat, lng },
        type: 'click'
      });
    };

    map.on('click', handleMapClick);
    
    return () => {
      map.off('click', handleMapClick);
    };
  }, [onAreaSelect]);

  // Mock heat island overlay
  const heatOverlays = selectedArea ? [
    { center: [selectedArea.coordinates.lat + 0.01, selectedArea.coordinates.lng + 0.01], intensity: 0.8, radius: 500 },
    { center: [selectedArea.coordinates.lat - 0.01, selectedArea.coordinates.lng - 0.01], intensity: 0.6, radius: 300 },
    { center: [selectedArea.coordinates.lat + 0.005, selectedArea.coordinates.lng - 0.005], intensity: 0.9, radius: 400 },
  ] : [];

  return (
    <div className="h-full relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Selected Area Marker */}
        {selectedArea && (
          <Marker position={[selectedArea.coordinates.lat, selectedArea.coordinates.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{selectedArea.name}</h3>
                <p className="text-sm text-gray-600">Click for detailed analysis</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Heat Island Visualization */}
        {heatOverlays.map((overlay, index) => (
          <Circle
            key={index}
            center={overlay.center as [number, number]}
            radius={overlay.radius}
            pathOptions={{
              fillColor: overlay.intensity > 0.7 ? '#FF4444' : '#FF8844',
              fillOpacity: overlay.intensity * 0.4,
              color: '#FF0000',
              weight: 2,
              opacity: 0.8,
            }}
          />
        ))}
      </MapContainer>

      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <div className="bg-background/95 backdrop-blur-md rounded-lg border border-border p-2 text-xs">
          <div className="font-semibold mb-1">Legend</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>High Heat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Medium Heat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Vegetation</span>
          </div>
        </div>
      </div>

      {/* Coordinates Display */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/95 backdrop-blur-md rounded-lg border border-border p-2 text-xs font-code">
        {selectedArea ? (
          <span>
            {selectedArea.coordinates.lat.toFixed(6)}, {selectedArea.coordinates.lng.toFixed(6)}
          </span>
        ) : (
          <span>Click map to select area</span>
        )}
      </div>
    </div>
  );
};

export default MapInterface;