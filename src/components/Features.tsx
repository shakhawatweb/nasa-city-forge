import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  BarChart3, 
  Cpu, 
  FileText, 
  Layers,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Brain,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Map,
      title: "Interactive Mapping",
      description: "Explore satellite imagery with advanced layering capabilities and real-time data visualization.",
      gradient: "from-blue-500 to-cyan-500",
      badge: "Core Feature",
      stats: "50+ Map Layers"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Transform complex satellite data into intuitive charts, graphs, and interactive dashboards.",
      gradient: "from-green-500 to-emerald-500",
      badge: "Analytics",
      stats: "Real-time Updates"
    },
    {
      icon: Brain,
      title: "AI Simulation Engine",
      description: "Predict urban development impacts using machine learning models trained on satellite data.",
      gradient: "from-purple-500 to-violet-500",
      badge: "AI-Powered",
      stats: "95% Accuracy"
    },
    {
      icon: TrendingUp,
      title: "Scenario Comparison",
      description: "Compare different urban planning scenarios side-by-side with detailed impact analysis.",
      gradient: "from-orange-500 to-red-500",
      badge: "Planning Tool",
      stats: "Multi-scenario"
    },
    {
      icon: FileText,
      title: "Smart Reports",
      description: "Generate comprehensive reports with automated insights and actionable recommendations.",
      gradient: "from-teal-500 to-blue-500",
      badge: "Automation",
      stats: "PDF/CSV Export"
    },
    {
      icon: Shield,
      title: "Climate Resilience",
      description: "Assess climate risks and plan adaptive measures using NASA's climate data models.",
      gradient: "from-indigo-500 to-purple-500",
      badge: "Climate Focus",
      stats: "Future Projections"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 bg-primary/10 border-primary/20 text-primary"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Comprehensive Urban Intelligence
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to analyze, simulate, and optimize urban environments using 
            cutting-edge satellite technology and AI-powered insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-muted/50">
                    {feature.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl font-space group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-primary">
                    {feature.stats}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-bold font-space mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to revolutionize urban planning?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of urban planners already using NASA City Forge to build smarter, 
              more resilient cities with satellite-powered insights.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started Free
              <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;