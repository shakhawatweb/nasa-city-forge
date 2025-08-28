import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Database, Satellite, Users } from "lucide-react";
import { toast } from "sonner";

interface DataVisualizationProps {
  selectedLocation: any;
}

const DataVisualization = ({ selectedLocation }: DataVisualizationProps) => {
  const [activeDataSource, setActiveDataSource] = useState("nasa");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({
    temperature: [],
    pollution: [],
    population: []
  });

  // Mock data generation
  const generateMockData = (type: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      value: Math.floor(Math.random() * 50) + (type === 'temperature' ? 15 : type === 'pollution' ? 100 : 1000),
      baseline: Math.floor(Math.random() * 40) + (type === 'temperature' ? 20 : type === 'pollution' ? 80 : 1200)
    }));
  };

  const temperatureData = generateMockData('temperature');
  const pollutionData = generateMockData('pollution');
  const populationData = [
    { category: 'Residential', value: 45, color: '#8884d8' },
    { category: 'Commercial', value: 25, color: '#82ca9d' },
    { category: 'Industrial', value: 20, color: '#ffc658' },
    { category: 'Green Space', value: 10, color: '#ff7300' }
  ];

  const fetchNASAData = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call to NASA POWER API
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("NASA POWER data loaded");
    } catch (error) {
      toast.error("Failed to fetch NASA data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGIBSData = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call to NASA GIBS
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("NASA GIBS imagery data loaded");
    } catch (error) {
      toast.error("Failed to fetch GIBS data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSEDACData = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call to SEDAC
      await new Promise(resolve => setTimeout(resolve, 1800));
      toast.success("SEDAC population data loaded");
    } catch (error) {
      toast.error("Failed to fetch SEDAC data");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedLocation) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Please select a location to view data visualization</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Data Source Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources & APIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Satellite className="w-4 h-4" />
                NASA POWER
              </h4>
              <p className="text-sm text-muted-foreground">Climate & weather data</p>
              <Button 
                onClick={fetchNASAData} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                Fetch Data
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Satellite className="w-4 h-4" />
                NASA GIBS
              </h4>
              <p className="text-sm text-muted-foreground">Satellite imagery</p>
              <Button 
                onClick={fetchGIBSData} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                Fetch Imagery
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                SEDAC
              </h4>
              <p className="text-sm text-muted-foreground">Population & demographics</p>
              <Button 
                onClick={fetchSEDACData} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                Fetch Demographics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Tabs defaultValue="temperature" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="temperature" className="flex items-center gap-2">
            <LineChartIcon className="w-4 h-4" />
            Temperature
          </TabsTrigger>
          <TabsTrigger value="pollution" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Air Quality
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Demographics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends - {selectedLocation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Current Temperature (°C)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="baseline" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeDasharray="5 5"
                      name="Historical Average (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pollution">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Index - {selectedLocation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pollutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))"
                      name="Current AQI"
                    />
                    <Bar 
                      dataKey="baseline" 
                      fill="hsl(var(--muted))"
                      name="Baseline AQI"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Land Use Distribution - {selectedLocation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={populationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {populationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataVisualization;