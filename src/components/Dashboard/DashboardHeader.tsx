import { ArrowLeft, Save, Share, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-md flex items-center justify-between px-4">
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
        <h1 className="text-lg font-semibold font-space">NASA City Forge Dashboard</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save Analysis
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share className="w-4 h-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <div className="h-6 w-px bg-border mx-2" />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DashboardHeader;