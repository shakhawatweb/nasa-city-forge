import { useState } from "react";
import { TrendingUp, Thermometer, Wind, Droplets, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DataPanelProps {
  analysisData: any;
  isLoading: boolean;
  selectedArea: any;
}

const DataPanel = ({ analysisData, isLoading, selectedArea }: DataPanelProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const mockScores = {
    heat: 78,
    pollution: 65,
    resilience: 45,
    population: 85
  };

  const tempData = [
    { time: '06:00', temperature: 22 },
    { time: '09:00', temperature: 26 },
    { time: '12:00', temperature: 31 },
    { time: '15:00', temperature: 34 },
    { time: '18:00', temperature: 29 },
    { time: '21:00', temperature: 25 },
  ];

  const pollutionData = [
    { name: 'PM2.5', value: 35, color: '#FF4444' },
    { name: 'NO2', value: 28, color: '#FF8844' },
    { name: 'O3', value: 42, color: '#FFAA44' },
    { name: 'CO', value: 15, color: '#44AA44' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-orange-500";
    return "text-green-500";
  };

  const getScoreVariant = (score: number) => {
    if (score >= 70) return "destructive";
    if (score >= 40) return "secondary";
    return "default";
  };

  if (!selectedArea) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-space">Select an Area</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a location on the map or use the search panel to begin analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold font-space">Analysis Results</h2>
        <p className="text-sm text-muted-foreground">{selectedArea.name}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="simulate">Simulate</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 space-y-4 mt-4">
          {/* Risk Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Heat Score</span>
                  </div>
                  <Badge variant={getScoreVariant(mockScores.heat)}>
                    {mockScores.heat}/100
                  </Badge>
                </div>
                <Progress value={mockScores.heat} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Air Quality</span>
                  </div>
                  <Badge variant={getScoreVariant(mockScores.pollution)}>
                    {mockScores.pollution}/100
                  </Badge>
                </div>
                <Progress value={mockScores.pollution} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Resilience</span>
                  </div>
                  <Badge variant={getScoreVariant(mockScores.resilience)}>
                    {mockScores.resilience}/100
                  </Badge>
                </div>
                <Progress value={mockScores.resilience} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Population Stress</span>
                  </div>
                  <Badge variant={getScoreVariant(mockScores.population)}>
                    {mockScores.population}/100
                  </Badge>
                </div>
                <Progress value={mockScores.population} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">High urban heat island effect detected in commercial district</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Air quality exceeds WHO guidelines during peak hours</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Low vegetation coverage contributes to poor resilience</p>
              </div>
            </CardContent>
          </Card>

          {/* NASA Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>• MODIS Land Surface Temperature</p>
                <p>• VIIRS Aerosol Optical Depth</p>
                <p>• SMAP Soil Moisture</p>
                <p>• OpenAQ Air Quality Stations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="flex-1 space-y-4 mt-4">
          {/* Temperature Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Temperature Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={tempData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#FF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pollution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Air Quality Index</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={pollutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {pollutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulate" className="flex-1 space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Urban Interventions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                🌳 Add Park (+5% cooling)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                🏢 Cool Roofs (+3% cooling)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                🌱 Street Trees (+2% air quality)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                💧 Green Infrastructure (+4% resilience)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-space">Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select interventions above to see projected impact on heat, air quality, and resilience scores.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataPanel;