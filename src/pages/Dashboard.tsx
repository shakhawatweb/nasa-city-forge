import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import LocationSearch from "@/components/Dashboard/LocationSearch";
import DataVisualization from "@/components/Dashboard/DataVisualization";
import InteractiveMap from "@/components/Dashboard/InteractiveMap";
import SimulationEngine from "@/components/Dashboard/SimulationEngine";
import ScenarioComparison from "@/components/Dashboard/ScenarioComparison";
import ReportsPanel from "@/components/Dashboard/ReportsPanel";
import ProfileSettings from "@/components/Dashboard/ProfileSettings";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeScenario, setActiveScenario] = useState("baseline");
  const [simulationData, setSimulationData] = useState({
    baseline: {},
    intervention: {}
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold">Urban Planning Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Tabs defaultValue="planning" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="visualization">Data</TabsTrigger>
            <TabsTrigger value="simulation">Simulate</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
              {/* Location Search */}
              <div className="space-y-4">
                <LocationSearch 
                  onLocationSelect={setSelectedLocation}
                  selectedLocation={selectedLocation}
                />
              </div>
              
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <InteractiveMap 
                    selectedLocation={selectedLocation}
                    onLocationSelect={setSelectedLocation}
                  />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visualization">
            <DataVisualization 
              selectedLocation={selectedLocation}
            />
          </TabsContent>

          <TabsContent value="simulation">
            <SimulationEngine 
              selectedLocation={selectedLocation}
              onSimulationUpdate={setSimulationData}
              simulationData={simulationData}
            />
          </TabsContent>

          <TabsContent value="comparison">
            <ScenarioComparison 
              simulationData={simulationData}
              selectedLocation={selectedLocation}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel 
              selectedLocation={selectedLocation}
              simulationData={simulationData}
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;