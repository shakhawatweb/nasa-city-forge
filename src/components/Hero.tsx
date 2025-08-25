import { ArrowRight, Globe, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-earth-data.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-85" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* NASA Badge */}
          <div className="inline-flex items-center space-x-2 bg-background/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/90 text-sm font-medium">Powered by NASA Satellite Data</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-space leading-tight">
            Beat the Heat,
            <br />
            <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Clean the Air
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Combat Urban Heat Islands, Air Pollution, and Low Resilience using real NASA satellite data. 
            Professional urban planning with actionable insights.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-white/90">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Real-time NASA Data</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Climate Resilience Planning</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Global Coverage</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 space-glow font-semibold px-8">
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;