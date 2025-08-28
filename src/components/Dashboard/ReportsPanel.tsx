import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Image, BarChart3, Map, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ReportsPanelProps {
  selectedLocation: any;
  simulationData: any;
}

const ReportsPanel = ({ selectedLocation, simulationData }: ReportsPanelProps) => {
  const [reportConfig, setReportConfig] = useState({
    format: "pdf",
    includeCharts: true,
    includeMaps: true,
    includeSimulation: true,
    includeComparison: true,
    includeMetadata: true
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleReportSection = (section: string) => {
    setReportConfig(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generateReport = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    setIsGenerating(true);
    try {
      // Mock report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock download
      const reportData = {
        location: selectedLocation,
        timestamp: new Date().toISOString(),
        format: reportConfig.format,
        sections: reportConfig
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
        type: reportConfig.format === 'pdf' ? 'application/pdf' : 'text/csv' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `urban-analysis-${selectedLocation.name.replace(/\s+/g, '-')}.${reportConfig.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`${reportConfig.format.toUpperCase()} report generated successfully!`);
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  const exportCharts = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    try {
      // Mock chart export
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Charts exported as PNG files");
    } catch (error) {
      toast.error("Failed to export charts");
    }
  };

  const exportMaps = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location first");
      return;
    }

    try {
      // Mock map export
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Maps exported successfully");
    } catch (error) {
      toast.error("Failed to export maps");
    }
  };

  if (!selectedLocation) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Please select a location to generate reports</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Export Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <BarChart3 className="w-8 h-8 mx-auto text-blue-600" />
              <h3 className="font-semibold">Export Charts</h3>
              <p className="text-sm text-muted-foreground">Download visualization charts as PNG</p>
              <Button onClick={exportCharts} variant="outline" size="sm" className="w-full">
                <Image className="w-4 h-4 mr-2" />
                Export Charts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Map className="w-8 h-8 mx-auto text-green-600" />
              <h3 className="font-semibold">Export Maps</h3>
              <p className="text-sm text-muted-foreground">Download map views and layers</p>
              <Button onClick={exportMaps} variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Maps
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Calendar className="w-8 h-8 mx-auto text-purple-600" />
              <h3 className="font-semibold">Scheduled Reports</h3>
              <p className="text-sm text-muted-foreground">Set up automatic report generation</p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                <Calendar className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comprehensive Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Comprehensive Report Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Report Format</Label>
            <Select 
              value={reportConfig.format} 
              onValueChange={(value) => setReportConfig(prev => ({ ...prev, format: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="csv">CSV Data Export</SelectItem>
                <SelectItem value="json">JSON Data Export</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Selection */}
          <div className="space-y-4">
            <Label>Include in Report</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCharts"
                  checked={reportConfig.includeCharts}
                  onCheckedChange={() => toggleReportSection('includeCharts')}
                />
                <Label htmlFor="includeCharts" className="text-sm">Data Visualization Charts</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMaps"
                  checked={reportConfig.includeMaps}
                  onCheckedChange={() => toggleReportSection('includeMaps')}
                />
                <Label htmlFor="includeMaps" className="text-sm">Interactive Maps</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeSimulation"
                  checked={reportConfig.includeSimulation}
                  onCheckedChange={() => toggleReportSection('includeSimulation')}
                />
                <Label htmlFor="includeSimulation" className="text-sm">Simulation Results</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeComparison"
                  checked={reportConfig.includeComparison}
                  onCheckedChange={() => toggleReportSection('includeComparison')}
                />
                <Label htmlFor="includeComparison" className="text-sm">Scenario Comparison</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMetadata"
                  checked={reportConfig.includeMetadata}
                  onCheckedChange={() => toggleReportSection('includeMetadata')}
                />
                <Label htmlFor="includeMetadata" className="text-sm">Data Sources & Metadata</Label>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Report Preview</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Location:</strong> {selectedLocation.name}</p>
              <p><strong>Format:</strong> {reportConfig.format.toUpperCase()}</p>
              <p><strong>Sections:</strong> {Object.values(reportConfig).filter(v => v === true).length - 1}</p>
              <p><strong>Generated:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateReport} 
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating Report..." : `Generate ${reportConfig.format.toUpperCase()} Report`}
          </Button>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Urban Analysis - {selectedLocation.name}</p>
                  <p className="text-sm text-muted-foreground">Generated today at 2:30 PM</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground py-4">
              Previous reports will appear here after generation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPanel;