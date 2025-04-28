import { useEffect, useState } from "react";
import { Card } from "@/types";
import DraggableField from "@/components/editor/DraggableField";
import FieldPropertyEditor from "@/components/editor/FieldPropertyEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Save, Text, Image, Cards } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
  const { toast } = useToast();
  const [card, setCard] = useState<Card>({
    id: "new-card",
    name: "New Card",
    fields: [],
    collectionId: "temp",
    gameType: "trading",
    cardType: "Character",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState("New Card Game");
  const [gameType, setGameType] = useState<"standard" | "trading" | "roleplaying" | "custom">("trading");
  const [gameDescription, setGameDescription] = useState("");
  const [cardType, setCardType] = useState("Character");
  
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

  const getCardTypeOptions = () => {
    switch (gameType) {
      case "trading":
        return ["Character", "Spell", "Item", "Resource", "Event"];
      case "standard":
        return ["Number", "Action", "Wild", "Special"];
      case "roleplaying":
        return ["Hero", "Enemy", "Equipment", "Ability", "Quest"];
      case "custom":
        return ["Custom Type"];
      default:
        return ["Default"];
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Card Designer</h1>
        <p className="text-muted-foreground">Create custom cards for your game by adding and positioning fields</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="card-type">Card Type</Label>
                <Select 
                  value={cardType} 
                  onValueChange={(value) => {
                    setCardType(value);
                    setCard({ ...card, cardType: value });
                  }}
                >
                  <SelectTrigger id="card-type" className="bg-muted/50">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCardTypeOptions().map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="card-rarity">Rarity (Optional)</Label>
                <Select 
                  value={card.rarity || "common"} 
                  onValueChange={(value) => setCard({ ...card, rarity: value })}
                >
                  <SelectTrigger id="card-rarity" className="bg-muted/50">
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
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
          
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Game Collection</h2>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="collection-name">Game Name</Label>
                <Input
                  id="collection-name"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="bg-muted/50 max-w-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="game-type">Game Type</Label>
                <Select value={gameType} onValueChange={(value: any) => setGameType(value)}>
                  <SelectTrigger id="game-type" className="bg-muted/50 max-w-xs">
                    <SelectValue placeholder="Select game type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Card Game</SelectItem>
                    <SelectItem value="trading">Trading Card Game</SelectItem>
                    <SelectItem value="roleplaying">Roleplaying Card Game</SelectItem>
                    <SelectItem value="custom">Custom Game</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="game-description">Game Description</Label>
                <Textarea
                  id="game-description"
                  value={gameDescription}
                  onChange={(e) => setGameDescription(e.target.value)}
                  placeholder="Describe your card game and its rules..."
                  className="bg-muted/50 h-20 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
        
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
                  <Cards className="w-8 h-8 mx-auto" />
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
