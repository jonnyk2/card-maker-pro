
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
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would be a fetch from Supabase
    setTimeout(() => {
      setCollections([
        {
          id: "1",
          name: "Vocabulary Cards",
          description: "English vocabulary cards with definitions and examples",
          cardCount: 42,
          createdAt: "2025-03-10T12:00:00Z",
          updatedAt: "2025-04-25T15:30:00Z",
        },
        {
          id: "2",
          name: "Biology Flashcards",
          description: "Study cards for biology exam covering cells, genetics, and ecology",
          cardCount: 86,
          createdAt: "2025-02-15T09:15:00Z",
          updatedAt: "2025-04-22T11:45:00Z",
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Card Collections</h1>
        <p className="text-muted-foreground">Create, manage and customize your card decks</p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All Collections</TabsTrigger>
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
              title="No Collections Yet"
              description="Create your first card collection or import from CSV/Excel to get started."
              createButtonLabel="Create Collection"
              createButtonAction={() => navigate('/create')}
              importButtonLabel="Import Cards"
              importButtonAction={() => navigate('/import')}
            />
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <EmptyState
            title="No Recent Collections"
            description="Your recently viewed collections will appear here."
            createButtonLabel="Create Collection"
            createButtonAction={() => navigate('/create')}
          />
        </TabsContent>
        
        <TabsContent value="favorites">
          <EmptyState
            title="No Favorite Collections"
            description="Mark collections as favorites to see them here."
            createButtonLabel="Create Collection"
            createButtonAction={() => navigate('/create')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
