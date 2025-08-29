import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Satellite, 
  Database, 
  Globe, 
  Zap,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  Users,
  Cloud,
  Sparkles
} from "lucide-react";

const DataSources = () => {
  const dataSources = [
    {
      name: "NASA POWER",
      icon: Satellite,
      description: "Global meteorological and solar energy data for climate analysis and renewable energy planning.",
      features: ["40+ Years of Data", "1° Resolution", "Daily Updates", "Climate Projections"],
      status: "Active",
      gradient: "from-blue-600 to-blue-400",
      stats: { datasets: "50+", coverage: "Global", frequency: "Daily" }
    },
    {
      name: "NASA GIBS",
      icon: Globe,
      description: "High-resolution satellite imagery and earth observation data for visual analysis and monitoring.",
      features: ["Real-time Imagery", "Multiple Sensors", "Historical Archive", "Custom Layers"],
      status: "Active", 
      gradient: "from-green-600 to-green-400",
      stats: { datasets: "200+", coverage: "Global", frequency: "Real-time" }
    },
    {
      name: "SEDAC",
      icon: Users,
      description: "Socioeconomic and demographic data integrated with environmental information for comprehensive analysis.",
      features: ["Population Data", "Urban Extent", "Hazard Exposure", "Sustainability Metrics"],
      status: "Active",
      gradient: "from-purple-600 to-purple-400",
      stats: { datasets: "100+", coverage: "Global", frequency: "Annual" }
    },
    {
      name: "Local Integration",
      icon: Database,
      description: "Connect your own datasets including pollution sensors, traffic data, and municipal information.",
      features: ["API Integration", "Custom Uploads", "Data Validation", "Format Support"],
      status: "Coming Soon",
      gradient: "from-orange-600 to-orange-400",
      stats: { datasets: "Unlimited", coverage: "Custom", frequency: "Variable" }
    }
  ];

  const capabilities = [
    { icon: TrendingUp, title: "Predictive Analytics", desc: "AI-powered forecasting" },
    { icon: Cloud, title: "Real-time Processing", desc: "Instant data updates" },
    { icon: Zap, title: "High Performance", desc: "Optimized for speed" },
    { icon: CheckCircle, title: "Data Quality", desc: "Validated & verified" }
  ];

  return (
    <section id="data" className="py-24 bg-gradient-to-br from-muted/30 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 bg-accent/10 border-accent/20 text-accent"
          >
            <Database className="w-4 h-4 mr-2" />
            Data Sources
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Powered by Authoritative Data
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access premium satellite data from NASA, NOAA, and other leading space agencies. 
            Combine authoritative datasets with your local data for comprehensive urban analysis.
          </p>
        </div>

        {/* Data Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {dataSources.map((source, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${source.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${source.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <source.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge 
                    variant={source.status === "Active" ? "default" : "secondary"}
                    className={source.status === "Active" ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
                  >
                    {source.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-space group-hover:text-accent transition-colors mb-2">
                  {source.name}
                </CardTitle>
                
                <p className="text-muted-foreground leading-relaxed">
                  {source.description}
                </p>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-foreground">{source.stats.datasets}</div>
                    <div className="text-xs text-muted-foreground">Datasets</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground">{source.stats.coverage}</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground">{source.stats.frequency}</div>
                    <div className="text-xs text-muted-foreground">Updates</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {source.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full group/btn hover:bg-accent/10 hover:border-accent transition-all duration-300"
                  disabled={source.status === "Coming Soon"}
                >
                  {source.status === "Active" ? "Explore Data" : "Coming Soon"}
                  {source.status === "Active" && (
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Capabilities Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-space mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Advanced Data Processing Capabilities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines multiple data sources with advanced analytics to provide 
              unparalleled insights for urban planning and development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{capability.title}</h4>
                <p className="text-sm text-muted-foreground">{capability.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSources;