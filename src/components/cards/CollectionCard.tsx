
import { CardCollection } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit, FileText } from "lucide-react";

interface CollectionCardProps {
  collection: CardCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border bg-card hover:border-primary/30">
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold truncate text-primary-foreground">{collection.name}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-2 text-sm text-muted-foreground">
        <p className="line-clamp-2">{collection.description}</p>
        <div className="mt-3 text-xs flex items-center justify-between">
          <span className="bg-muted/50 rounded-md px-2 py-1">{collection.cardCount} cards</span>
          <span className="text-muted-foreground/70">Updated {new Date(collection.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="w-full border-muted hover:bg-primary/20 hover:text-primary"
          onClick={() => navigate(`/collection/${collection.id}`)}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Cards
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          className="w-1/4 text-primary hover:bg-primary/20"
          onClick={() => navigate(`/collection/${collection.id}/edit`)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
