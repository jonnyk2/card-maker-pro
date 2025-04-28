import { useEffect, useState } from "react";
import EmptyState from "@/components/cards/EmptyState";
import CollectionCard from "@/components/cards/CollectionCard";
import { CardCollection } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
          alt="Trading Card Games Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background"></div>
      </div>
      
      <div className="space-y-8 animate-fade-in max-w-4xl mx-auto text-center py-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Create Epic Card Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design and build your own custom trading card games, from fantasy battles to sci-fi adventures
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 space-y-8 pb-16">
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
