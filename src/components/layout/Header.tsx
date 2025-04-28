
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    toast({
      title: "Authentication Required",
      description: "Please connect Supabase to enable authentication features.",
    });
  };

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 
            onClick={() => navigate('/')} 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
          >
            ChromaCardForge
          </h1>
        </div>
        
        <div className="hidden md:flex items-center w-full max-w-sm px-4">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <Input 
            placeholder="Search collections..." 
            className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2 border-muted hover:bg-primary/20 hover:text-primary"
            onClick={() => navigate('/import')}
          >
            <FileText className="w-4 h-4" />
            Import
          </Button>
          
          <Button 
            onClick={() => navigate('/create')} 
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Create Card
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-primary hover:bg-primary/20" 
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
