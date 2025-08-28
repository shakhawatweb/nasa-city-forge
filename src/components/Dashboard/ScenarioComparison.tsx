import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Minus, GitCompare } from "lucide-react";

interface ScenarioComparisonProps {
  simulationData: any;
  selectedLocation: any;
}

const ScenarioComparison = ({ simulationData, selectedLocation }: ScenarioComparisonProps) => {
  if (!selectedLocation) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Please select a location and run simulations to compare scenarios</p>
        </div>
      </Card>
    );
  }

  if (!simulationData?.intervention || Object.keys(simulationData.intervention).length === 0) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Run a simulation to see scenario comparisons</p>
        </div>
      </Card>
    );
  }

  // Mock baseline data for comparison
  const baselineData = {
    temperature: 28.5,
    co2Emissions: 5000,
    floodRisk: 75,
    energyConsumption: 8500,
    airQuality: 65,
    biodiversity: 40
  };

  const interventionData = {
    temperature: baselineData.temperature - (simulationData.intervention.overall?.temperatureReduction || 0),
    co2Emissions: baselineData.co2Emissions - (simulationData.intervention.overall?.co2Reduction || 0),
    floodRisk: Math.max(0, baselineData.floodRisk - (simulationData.intervention.overall?.floodMitigation || 0) / 100),
    energyConsumption: baselineData.energyConsumption - (simulationData.intervention.overall?.energySavings || 0),
    airQuality: Math.min(100, baselineData.airQuality + 15),
    biodiversity: Math.min(100, baselineData.biodiversity + 25)
  };

  const comparisonData = [
    {
      metric: 'Temperature (°C)',
      baseline: baselineData.temperature,
      intervention: interventionData.temperature,
      improvement: baselineData.temperature - interventionData.temperature
    },
    {
      metric: 'CO₂ Emissions (tons/year)',
      baseline: baselineData.co2Emissions,
      intervention: interventionData.co2Emissions,
      improvement: baselineData.co2Emissions - interventionData.co2Emissions
    },
    {
      metric: 'Flood Risk (%)',
      baseline: baselineData.floodRisk,
      intervention: interventionData.floodRisk,
      improvement: baselineData.floodRisk - interventionData.floodRisk
    },
    {
      metric: 'Energy Use (kWh/year)',
      baseline: baselineData.energyConsumption,
      intervention: interventionData.energyConsumption,
      improvement: baselineData.energyConsumption - interventionData.energyConsumption
    }
  ];

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (improvement < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return "text-green-600";
    if (improvement < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Scenario Comparison - {selectedLocation.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Side-by-side Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Key Metrics Comparison</h3>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      {getImprovementIcon(item.improvement)}
                      <span className={`text-sm font-medium ${getImprovementColor(item.improvement)}`}>
                        {item.improvement > 0 ? '-' : '+'}{Math.abs(item.improvement).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Baseline</div>
                      <div className="font-semibold">{item.baseline.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">With Intervention</div>
                      <div className="font-semibold text-green-600">{item.intervention.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Comparison Chart */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Visual Comparison</h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="metric" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="baseline" fill="hsl(var(--muted-foreground))" name="Baseline" />
                    <Bar dataKey="intervention" fill="hsl(var(--primary))" name="With Intervention" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Air Quality</span>
              <Badge variant="outline" className="text-green-600">+15% Better</Badge>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Biodiversity</span>
              <Badge variant="outline" className="text-green-600">+25% Better</Badge>
            </div>
            <Progress value={65} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Climate Resilience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Heat Mitigation</span>
              <Badge variant="outline" className="text-green-600">
                -{(simulationData.intervention.overall?.temperatureReduction || 0).toFixed(1)}°C
              </Badge>
            </div>
            <Progress value={75} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Flood Protection</span>
              <Badge variant="outline" className="text-green-600">+35% Better</Badge>
            </div>
            <Progress value={80} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Economic Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Energy Savings</span>
              <Badge variant="outline" className="text-green-600">
                ${((simulationData.intervention.overall?.energySavings || 0) * 0.12).toLocaleString()}/year
              </Badge>
            </div>
            <Progress value={70} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Health Benefits</span>
              <Badge variant="outline" className="text-green-600">$50K/year</Badge>
            </div>
            <Progress value={60} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioComparison;