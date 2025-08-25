import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MapInterface from "@/components/Dashboard/MapInterface";
import DataPanel from "@/components/Dashboard/DataPanel";
import SearchPanel from "@/components/Dashboard/SearchPanel";

const Dashboard = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <div className="flex-1 flex">
        {/* Left Sidebar - Search & Controls */}
        <div className="w-80 border-r border-border bg-card">
          <SearchPanel 
            onAreaSelect={setSelectedArea}
            onAnalysisStart={setIsLoading}
            selectedArea={selectedArea}
          />
        </div>

        {/* Main Map View */}
        <div className="flex-1 relative">
          <MapInterface 
            selectedArea={selectedArea}
            onAreaSelect={setSelectedArea}
            analysisData={analysisData}
          />
        </div>

        {/* Right Sidebar - Data & Results */}
        <div className="w-96 border-l border-border bg-card">
          <DataPanel 
            analysisData={analysisData}
            isLoading={isLoading}
            selectedArea={selectedArea}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;