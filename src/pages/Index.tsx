
import { useEffect, useState } from "react";
import EmptyState from "@/components/cards/EmptyState";
import CollectionCard from "@/components/cards/CollectionCard";
import { CardCollection } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout, Plus } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<CardCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setCollections([
        {
          id: "1",
          name: "Fantasy Battle Cards",
          description: "A strategic card game with wizards, warriors, and mythical creatures",
          gameType: "trading",
          ruleset: "Each player starts with 5 cards. Winner is first to defeat opponent's hero card.",
          cardCount: 42,
          createdAt: "2025-03-10T12:00:00Z",
          updatedAt: "2025-04-25T15:30:00Z",
        },
        {
          id: "2",
          name: "Space Explorers",
          description: "Sci-fi themed card game with spaceships, planets and alien encounters",
          gameType: "standard",
          cardCount: 86,
          createdAt: "2025-02-15T09:15:00Z",
          updatedAt: "2025-04-22T11:45:00Z",
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);
  
  return (
    <div className="relative">
      {/* Hero Section with Background */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
            alt="Trading Card Games"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
        </div>
        
        <div className="container px-4 md:px-6 z-10">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              Card Maker Pro
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-2xl">
              Create, customize, and play your own trading card games from fantasy realms to sci-fi universes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => navigate('/create')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg border-muted hover:bg-primary/20 hover:text-primary"
                onClick={() => navigate('/import')}
              >
                <Layout className="mr-2 h-5 w-5" />
                Explore Samples
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container px-4 md:px-6 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unleash Your Creativity
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design custom cards with our intuitive editor, build decks, and bring your game ideas to life
          </p>
        </div>
      </div>

      {/* Collections Tab Section */}
      <div className="container px-4 md:px-6 space-y-8 pb-16">
        <h2 className="text-3xl font-bold">Your Card Collections</h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-52 animate-pulse rounded-lg bg-muted/50" />
                ))}
              </div>
            ) : collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Card Games Yet"
                description="Create your first card game or import from CSV/Excel to get started."
                createButtonLabel="Create Card Game"
                createButtonAction={() => navigate('/create')}
                importButtonLabel="Import Cards"
                importButtonAction={() => navigate('/import')}
              />
            )}
          </TabsContent>
          
          <TabsContent value="recent">
            <EmptyState
              title="No Recent Card Games"
              description="Your recently viewed card games will appear here."
              createButtonLabel="Create Card Game"
              createButtonAction={() => navigate('/create')}
            />
          </TabsContent>
          
          <TabsContent value="favorites">
            <EmptyState
              title="No Favorite Card Games"
              description="Mark card games as favorites to see them here."
              createButtonLabel="Create Card Game"
              createButtonAction={() => navigate('/create')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

