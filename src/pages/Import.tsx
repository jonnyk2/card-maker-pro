
import { useState } from "react";
import CsvImportForm from "@/components/import/CsvImportForm";
import DataMappingForm from "@/components/import/DataMappingForm";
import { Card, ImportedCardData } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CardPreview from "@/components/cards/CardPreview";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

enum ImportStep {
  Upload,
  Mapping,
  Preview,
}

export default function Import() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [importStep, setImportStep] = useState<ImportStep>(ImportStep.Upload);
  const [importedData, setImportedData] = useState<ImportedCardData[][]>([]);
  const [generatedCards, setGeneratedCards] = useState<Card[]>([]);
  
  const handleImportData = (data: ImportedCardData[][]) => {
    setImportedData(data);
    setImportStep(ImportStep.Mapping);
  };
  
  const handleCreateCards = (cards: Card[]) => {
    setGeneratedCards(cards);
    setImportStep(ImportStep.Preview);
  };
  
  const handleConfirmImport = () => {
    // In a real app, this would save to Supabase
    toast({
      title: "Cards Imported!",
      description: "Connect Supabase to enable saving imported cards.",
    });
    
    // Go to dashboard
    navigate("/");
  };
  
  const handleBack = () => {
    setImportStep(importStep - 1);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Import Cards</h1>
        <p className="text-muted-foreground">Import your cards from CSV or Excel files</p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-xl">
          <div className="w-full flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${importStep >= ImportStep.Upload ? "bg-primary" : "bg-muted"}`}>
              1
            </div>
            <div className={`h-1 flex-1 ${importStep > ImportStep.Upload ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${importStep >= ImportStep.Mapping ? "bg-primary" : "bg-muted"}`}>
              2
            </div>
            <div className={`h-1 flex-1 ${importStep > ImportStep.Mapping ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${importStep >= ImportStep.Preview ? "bg-primary" : "bg-muted"}`}>
              3
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          {importStep === ImportStep.Upload && (
            <CsvImportForm onImport={handleImportData} />
          )}
          
          {importStep === ImportStep.Mapping && (
            <DataMappingForm 
              importedData={importedData} 
              onComplete={handleCreateCards} 
              onBack={handleBack} 
            />
          )}
          
          {importStep === ImportStep.Preview && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Preview Imported Cards</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {generatedCards.slice(0, 6).map((card) => (
                  <CardPreview key={card.id} card={card} />
                ))}
              </div>
              
              {generatedCards.length > 6 && (
                <p className="text-center text-sm text-muted-foreground">
                  +{generatedCards.length - 6} more cards
                </p>
              )}
              
              <Separator />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-muted hover:bg-primary/20 hover:text-primary"
                >
                  Go Back
                </Button>
                <Button 
                  onClick={handleConfirmImport} 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Confirm Import
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
