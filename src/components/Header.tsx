import { Satellite, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Satellite className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground font-space">
            NASA City Forge
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#data" className="text-muted-foreground hover:text-foreground transition-colors">
            Data Sources
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button 
            size="sm" 
            className="space-glow"
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