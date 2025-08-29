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
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2 hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              NASA City Forge Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="gap-2 hover:bg-accent">
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="planning" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Planning
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Data
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Simulate
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Compare
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Reports
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Location Search */}
              <div className="space-y-4">
                <LocationSearch 
                  onLocationSelect={setSelectedLocation}
                  selectedLocation={selectedLocation}
                />
              </div>
              
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card className="h-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <InteractiveMap 
                    selectedLocation={selectedLocation}
                    onLocationSelect={setSelectedLocation}
                  />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="animate-fade-in">
            <DataVisualization 
              selectedLocation={selectedLocation}
            />
          </TabsContent>

          <TabsContent value="simulation" className="animate-fade-in">
            <SimulationEngine 
              selectedLocation={selectedLocation}
              onSimulationUpdate={setSimulationData}
              simulationData={simulationData}
            />
          </TabsContent>

          <TabsContent value="comparison" className="animate-fade-in">
            <ScenarioComparison 
              simulationData={simulationData}
              selectedLocation={selectedLocation}
            />
          </TabsContent>

          <TabsContent value="reports" className="animate-fade-in">
            <ReportsPanel 
              selectedLocation={selectedLocation}
              simulationData={simulationData}
            />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;