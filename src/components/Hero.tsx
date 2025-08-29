import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, TrendingUp, Users, Globe, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-earth-data.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Globe, value: "50+", label: "Global Cities", color: "text-blue-500" },
    { icon: TrendingUp, value: "100TB+", label: "Satellite Data", color: "text-green-500" },
    { icon: Users, value: "10K+", label: "Urban Planners", color: "text-purple-500" },
    { icon: Zap, value: "AI-Powered", label: "Analysis", color: "text-orange-500" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60 dark:from-background/98 dark:via-background/90 dark:to-background/70" />
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-primary/60 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/80 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by NASA Earth Data
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-space leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Transform Cities with
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Satellite Intelligence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Harness NASA's satellite data to revolutionize urban planning. Visualize climate patterns, 
              simulate interventions, and build resilient cities with AI-powered insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 group px-8 py-6 text-lg animate-glow"
              onClick={() => navigate('/dashboard')}
            >
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300 group px-8 py-6 text-lg"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:bg-card/80"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold font-space text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center mt-16 space-x-8 opacity-60 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="text-sm text-muted-foreground font-medium">Trusted by</div>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-semibold text-muted-foreground/80">NASA</span>
              <span className="text-sm font-semibold text-muted-foreground/80">USGS</span>
              <span className="text-sm font-semibold text-muted-foreground/80">NOAA</span>
              <span className="text-sm font-semibold text-muted-foreground/80">ESA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;