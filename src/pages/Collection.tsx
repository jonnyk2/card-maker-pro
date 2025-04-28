
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardCollection } from "@/types";
import { Button } from "@/components/ui/button";
import CardPreview from "@/components/cards/CardPreview";
import EmptyState from "@/components/cards/EmptyState";
import { Edit, Plus } from "lucide-react";

export default function Collection() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState<CardCollection | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would fetch from Supabase
    setTimeout(() => {
      if (id === "1") {
        setCollection({
          id: "1",
          name: "Vocabulary Cards",
          description: "English vocabulary cards with definitions and examples",
          cardCount: 42,
          createdAt: "2025-03-10T12:00:00Z",
          updatedAt: "2025-04-25T15:30:00Z",
        });
        
        setCards([
          {
            id: "v1",
            name: "Ephemeral",
            fields: [
              {
                id: "f1",
                type: "text",
                content: "Ephemeral",
                x: 10,
                y: 10,
                width: 80,
                height: 15,
                fontSize: 24,
                fontFamily: "Arial",
                color: "white",
              },
              {
                id: "f2",
                type: "text",
                content: "Lasting for a very short time.",
                x: 10,
                y: 30,
                width: 80,
                height: 30,
                fontSize: 16,
                fontFamily: "Arial",
                color: "#e2e8f0",
              },
              {
                id: "f3",
                type: "text",
                content: "The ephemeral nature of fashion trends.",
                x: 10,
                y: 70,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: "Arial",
                color: "#93c5fd",
              },
            ],
            collectionId: "1",
            createdAt: "2025-04-10T12:00:00Z",
            updatedAt: "2025-04-25T15:30:00Z",
          },
          {
            id: "v2",
            name: "Serendipity",
            fields: [
              {
                id: "f1",
                type: "text",
                content: "Serendipity",
                x: 10,
                y: 10,
                width: 80,
                height: 15,
                fontSize: 24,
                fontFamily: "Arial",
                color: "white",
              },
              {
                id: "f2",
                type: "text",
                content: "The occurrence of events by chance in a beneficial way.",
                x: 10,
                y: 30,
                width: 80,
                height: 30,
                fontSize: 16,
                fontFamily: "Arial",
                color: "#e2e8f0",
              },
              {
                id: "f3",
                type: "text",
                content: "Finding a perfect book by serendipity.",
                x: 10,
                y: 70,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: "Arial",
                color: "#d8b4fe",
              },
            ],
            collectionId: "1",
            createdAt: "2025-04-12T12:00:00Z",
            updatedAt: "2025-04-25T15:30:00Z",
          },
        ]);
      } else if (id === "2") {
        setCollection({
          id: "2",
          name: "Biology Flashcards",
          description: "Study cards for biology exam covering cells, genetics, and ecology",
          cardCount: 86,
          createdAt: "2025-02-15T09:15:00Z",
          updatedAt: "2025-04-22T11:45:00Z",
        });
        
        setCards([
          {
            id: "b1",
            name: "Mitochondria",
            fields: [
              {
                id: "f1",
                type: "text",
                content: "Mitochondria",
                x: 10,
                y: 10,
                width: 80,
                height: 15,
                fontSize: 24,
                fontFamily: "Arial",
                color: "white",
              },
              {
                id: "f2",
                type: "text",
                content: "Organelle that generates most of the cell's supply of ATP.",
                x: 10,
                y: 30,
                width: 80,
                height: 30,
                fontSize: 16,
                fontFamily: "Arial",
                color: "#e2e8f0",
              },
            ],
            collectionId: "2",
            createdAt: "2025-03-15T09:15:00Z",
            updatedAt: "2025-04-20T11:45:00Z",
          },
        ]);
      } else {
        // No data for this collection ID
        setCollection(null);
        setCards([]);
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="h-8 w-48 bg-muted/50 animate-pulse rounded-md" />
        <div className="h-4 w-64 bg-muted/30 animate-pulse rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-muted/50" />
          ))}
        </div>
      </div>
    );
  }
  
  if (!collection) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Collection Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The collection you're looking for doesn't exist or has been deleted.
          </p>
          <Button 
            onClick={() => navigate("/")} 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
          <p className="text-muted-foreground">{collection.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-muted hover:bg-primary/20 hover:text-primary"
            onClick={() => navigate(`/collection/${collection.id}/edit`)}
          >
            <Edit className="w-4 h-4" />
            Edit Collection
          </Button>
          
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => navigate("/create")}
          >
            <Plus className="w-4 h-4" />
            Add Card
          </Button>
        </div>
      </div>
      
      {cards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cards.map((card) => (
            <CardPreview 
              key={card.id} 
              card={card} 
              onClick={() => navigate(`/card/${card.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Cards Yet"
          description="Start adding cards to this collection."
          createButtonLabel="Create Card"
          createButtonAction={() => navigate('/create')}
          importButtonLabel="Import Cards"
          importButtonAction={() => navigate('/import')}
        />
      )}
    </div>
  );
}
