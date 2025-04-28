
import { useEffect, useState } from "react";
import { Card } from "@/types";
import DraggableField from "@/components/editor/DraggableField";
import FieldPropertyEditor from "@/components/editor/FieldPropertyEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Save, Text, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

export default function Create() {
  const { toast } = useToast();
  const [card, setCard] = useState<Card>({
    id: "new-card",
    name: "New Card",
    fields: [],
    collectionId: "temp",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState("New Collection");
  
  const selectedField = card.fields.find((field) => field.id === selectedFieldId);
  
  const handleAddTextField = () => {
    const newField = {
      id: uuidv4(),
      type: "text" as const,
      content: "New Text",
      x: 10,
      y: 10,
      width: 80,
      height: 20,
      fontSize: 16,
      fontFamily: "Arial",
      color: "white",
    };
    
    setCard({
      ...card,
      fields: [...card.fields, newField],
    });
    
    setSelectedFieldId(newField.id);
  };
  
  const handleAddImageField = () => {
    const newField = {
      id: uuidv4(),
      type: "image" as const,
      content: "",
      x: 10,
      y: 40,
      width: 80,
      height: 40,
    };
    
    setCard({
      ...card,
      fields: [...card.fields, newField],
    });
    
    setSelectedFieldId(newField.id);
  };
  
  const handleFieldSelect = (field: typeof card.fields[0]) => {
    setSelectedFieldId(field.id);
  };
  
  const handleUpdateField = (updatedField: typeof card.fields[0]) => {
    setCard({
      ...card,
      fields: card.fields.map((field) => 
        field.id === updatedField.id ? updatedField : field
      ),
    });
  };
  
  const handleSaveCard = () => {
    // In a real app, this would save to Supabase
    toast({
      title: "Card Saved!",
      description: "Connect Supabase to enable saving cards.",
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Card Editor</h1>
        <p className="text-muted-foreground">Design your custom cards by adding and positioning fields</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Card Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="card-name">Card Name</Label>
                <Input
                  id="card-name"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  className="bg-muted/50 max-w-xs"
                />
              </div>
              <Button
                onClick={handleSaveCard}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Card
              </Button>
            </div>
            
            {/* Card Canvas */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-gradient-to-br from-theme-purple-dark to-theme-purple-muted">
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full relative rounded bg-theme-purple-dark/70">
                  {card.fields.map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      onUpdate={handleUpdateField}
                      onSelect={handleFieldSelect}
                      isSelected={field.id === selectedFieldId}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Add Field Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-muted hover:bg-primary/20 hover:text-primary"
                onClick={handleAddTextField}
              >
                <Text className="w-4 h-4" />
                Add Text Field
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-muted hover:bg-primary/20 hover:text-primary"
                onClick={handleAddImageField}
              >
                <Image className="w-4 h-4" />
                Add Image Field
              </Button>
            </div>
          </div>
          
          {/* Collection Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Collection</h2>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="bg-muted/50 max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Field Properties Panel */}
        <div>
          <div className="sticky top-20">
            <h2 className="text-lg font-medium mb-3">Field Properties</h2>
            {selectedField ? (
              <FieldPropertyEditor 
                field={selectedField}
                onUpdate={handleUpdateField}
              />
            ) : (
              <div className="border border-border rounded-md p-6 bg-card/60 text-center">
                <div className="mb-3 opacity-60">
                  <Plus className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-muted-foreground mb-4">
                  No field selected. Add or select a field to edit its properties.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-muted hover:bg-primary/20 hover:text-primary"
                    onClick={handleAddTextField}
                  >
                    <Text className="w-4 h-4 mr-2" />
                    Add Text Field
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-muted hover:bg-primary/20 hover:text-primary"
                    onClick={handleAddImageField}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Add Image Field
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
