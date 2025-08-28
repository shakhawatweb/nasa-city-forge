import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TreePine, Droplets, Home, Play, RotateCcw, Zap } from "lucide-react";
import { toast } from "sonner";

interface SimulationEngineProps {
  selectedLocation: any;
  onSimulationUpdate: (data: any) => void;
  simulationData: any;
}

const SimulationEngine = ({ selectedLocation, onSimulationUpdate, simulationData }: SimulationEngineProps) => {
  const [interventions, setInterventions] = useState({
    trees: { count: 0, coverage: 0 },
    wetlands: { area: 0, depth: 1 },
    coolRoofs: { buildings: 0, efficiency: 50 }
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);

  const updateIntervention = (type: string, field: string, value: number) => {
    setInterventions(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const runSimulation = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    setIsSimulating(true);
    try {
      // Mock simulation processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Calculate mock benefits
      const treeBenefits = {
        coolingEffect: interventions.trees.count * 0.5, // °C reduction
        co2Absorption: interventions.trees.count * 48, // lbs CO2/year
        coverage: interventions.trees.coverage
      };
      
      const wetlandBenefits = {
        floodReduction: interventions.wetlands.area * 1000, // gallons capacity
        biodiversity: interventions.wetlands.area * 0.3, // species index
        waterFiltration: interventions.wetlands.area * 500 // gallons/day
      };
      
      const roofBenefits = {
        heatReduction: interventions.coolRoofs.buildings * 0.8, // °C reduction
        energySavings: interventions.coolRoofs.buildings * interventions.coolRoofs.efficiency * 10, // kWh/year
        costSavings: interventions.coolRoofs.buildings * 500 // $/year
      };
      
      const results = {
        trees: treeBenefits,
        wetlands: wetlandBenefits,
        coolRoofs: roofBenefits,
        overall: {
          temperatureReduction: treeBenefits.coolingEffect + roofBenefits.heatReduction,
          co2Reduction: treeBenefits.co2Absorption,
          floodMitigation: wetlandBenefits.floodReduction,
          energySavings: roofBenefits.energySavings
        }
      };
      
      setSimulationResults(results);
      onSimulationUpdate({
        baseline: simulationData.baseline,
        intervention: results
      });
      
      toast.success("Simulation completed successfully!");
    } catch (error) {
      toast.error("Simulation failed");
    } finally {
      setIsSimulating(false);
    }
  };

  const resetSimulation = () => {
    setInterventions({
      trees: { count: 0, coverage: 0 },
      wetlands: { area: 0, depth: 1 },
      coolRoofs: { buildings: 0, efficiency: 50 }
    });
    setSimulationResults(null);
    toast.info("Simulation reset");
  };

  if (!selectedLocation) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Please select a location to run simulations</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Urban Interventions - {selectedLocation.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trees Intervention */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Add Trees</h3>
              <Badge variant="outline">Carbon Sequestration</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Trees</Label>
                <Input
                  type="number"
                  value={interventions.trees.count}
                  onChange={(e) => updateIntervention('trees', 'count', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Coverage Area (%)</Label>
                <div className="px-2">
                  <Slider
                    value={[interventions.trees.coverage]}
                    onValueChange={(value) => updateIntervention('trees', 'coverage', value[0])}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    {interventions.trees.coverage}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wetlands Intervention */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Add Wetlands</h3>
              <Badge variant="outline">Flood Control</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Area (acres)</Label>
                <Input
                  type="number"
                  value={interventions.wetlands.area}
                  onChange={(e) => updateIntervention('wetlands', 'area', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Average Depth (ft)</Label>
                <div className="px-2">
                  <Slider
                    value={[interventions.wetlands.depth]}
                    onValueChange={(value) => updateIntervention('wetlands', 'depth', value[0])}
                    min={0.5}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    {interventions.wetlands.depth} ft
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cool Roofs Intervention */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold">Add Cool Roofs</h3>
              <Badge variant="outline">Heat Mitigation</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Buildings</Label>
                <Input
                  type="number"
                  value={interventions.coolRoofs.buildings}
                  onChange={(e) => updateIntervention('coolRoofs', 'buildings', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Efficiency (%)</Label>
                <div className="px-2">
                  <Slider
                    value={[interventions.coolRoofs.efficiency]}
                    onValueChange={(value) => updateIntervention('coolRoofs', 'efficiency', value[0])}
                    min={10}
                    max={90}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    {interventions.coolRoofs.efficiency}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              onClick={runSimulation} 
              disabled={isSimulating}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              {isSimulating ? "Running Simulation..." : "Run Simulation"}
            </Button>
            
            <Button 
              onClick={resetSimulation} 
              variant="outline"
              disabled={isSimulating}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {simulationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {simulationResults.overall.temperatureReduction.toFixed(1)}°C
                </div>
                <div className="text-sm text-muted-foreground">Temperature Reduction</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {simulationResults.overall.co2Reduction.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">lbs CO₂/year</div>
              </div>
              
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">
                  {simulationResults.overall.floodMitigation.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">gallons flood capacity</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {simulationResults.overall.energySavings.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">kWh/year savings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationEngine;