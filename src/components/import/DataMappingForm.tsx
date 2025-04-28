
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardField, ImportedCardData } from "@/types";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface DataMappingFormProps {
  importedData: ImportedCardData[][];
  onComplete: (cards: any[]) => void;
  onBack: () => void;
}

export default function DataMappingForm({
  importedData,
  onComplete,
  onBack,
}: DataMappingFormProps) {
  const { toast } = useToast();
  const [cardNameField, setCardNameField] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("New Template");
  
  // Get list of available fields from the first card
  const availableFields = importedData[0]?.map(field => field.fieldName) || [];

  // Check if a certain field name exists in the available fields
  const fieldExists = (fieldName: string) => availableFields.includes(fieldName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNameField) {
      toast({
        variant: "destructive",
        title: "Mapping required",
        description: "Please select which field to use as the card name.",
      });
      return;
    }
    
    try {
      // Create a template for all cards with default positioning
      const generatedCards = importedData.map((cardData, index) => {
        // Find the field value for the card name
        const nameField = cardData.find(field => field.fieldName === cardNameField);
        
        // Create basic card fields (would need more sophisticated logic for real app)
        const cardFields: CardField[] = cardData.map((field, fieldIndex) => {
          // Simple positioning algorithm for demo purposes
          const x = (fieldIndex % 2) * 50;
          const y = Math.floor(fieldIndex / 2) * 25;
          
          return {
            id: `field-${index}-${fieldIndex}`,
            type: 'text',
            content: field.fieldValue,
            x,
            y,
            width: 45,
            height: 20,
            fontSize: 16,
            fontFamily: 'Arial',
            color: 'white',
          };
        });
        
        return {
          id: `card-${index}`,
          name: nameField?.fieldValue || `Card ${index + 1}`,
          fields: cardFields,
          collectionId: 'temp-collection',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });
      
      toast({
        title: "Cards created",
        description: `Successfully created ${generatedCards.length} cards from imported data.`,
      });
      
      onComplete(generatedCards);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error processing data",
        description: "There was an error creating cards from the imported data.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="template-name">Card Template Name</Label>
        <Input
          id="template-name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="bg-muted/50"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-name-field">Choose Card Name Field</Label>
        <Select 
          value={cardNameField || undefined} 
          onValueChange={setCardNameField}
        >
          <SelectTrigger id="card-name-field" className="bg-muted/50">
            <SelectValue placeholder="Select field for card name" />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map((fieldName) => (
              <SelectItem key={fieldName} value={fieldName}>
                {fieldName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-4 border border-border rounded-md bg-muted/30">
        <h3 className="font-medium text-sm mb-3">Preview</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="font-medium text-muted-foreground">Field</div>
          <div className="font-medium text-muted-foreground">First Value</div>
          {importedData[0]?.map((field, index) => (
            <>
              <div key={`field-${index}`} className="truncate">{field.fieldName}</div>
              <div key={`value-${index}`} className="truncate text-muted-foreground">{field.fieldValue}</div>
            </>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">
        <strong>Note:</strong> You can adjust the position and styling of each field 
        after importing. This will create a basic template for all cards.
      </p>
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-muted hover:bg-primary/20 hover:text-primary"
        >
          Go Back
        </Button>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          disabled={!cardNameField}
        >
          Create Cards
        </Button>
      </div>
    </form>
  );
}
