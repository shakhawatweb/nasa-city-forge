import { Satellite, Menu, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg animate-glow">
            <Satellite className="w-6 h-6 text-primary-foreground animate-float" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-space bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NASA City Forge
            </h1>
            <p className="text-xs text-muted-foreground font-inter">Urban Intelligence Platform</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#data" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group">
            Data Sources
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Twitter className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="hidden md:flex hover:bg-accent/10 hover:border-accent transition-all duration-300">
            Sign In
          </Button>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
            onClick={() => navigate('/dashboard')}
          >
            Start Exploring
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;