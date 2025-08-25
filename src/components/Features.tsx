import { MapPin, BarChart3, Zap, Download, Layers, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Interactive Mapping",
      description: "Draw polygons, click areas, or enter coordinates to analyze any location worldwide using NASA satellite data.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Get instant heat scores, pollution indices, and resilience metrics calculated from live NASA datasets.",
    },
    {
      icon: Layers,
      title: "Multi-layer Visualization", 
      description: "Overlay temperature, vegetation, soil moisture, and pollution data with customizable opacity controls.",
    },
    {
      icon: Gamepad2,
      title: "Intervention Simulator",
      description: "Gamified sandbox to test urban interventions like parks, cool roofs, and street trees with instant feedback.",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "AI-powered analysis provides actionable recommendations based on NASA Earth observation data.",
    },
    {
      icon: Download,
      title: "Export Reports",
      description: "Generate professional PDF reports with data visualizations and recommendations for stakeholders.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space">
            Powerful Features for Urban Planners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage cutting-edge NASA satellite technology to make data-driven decisions for sustainable city development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="data-card border-border/50 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 space-glow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-space">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;