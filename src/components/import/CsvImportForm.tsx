
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ImportedCardData } from "@/types";

interface CsvImportFormProps {
  onImport: (data: ImportedCardData[][]) => void;
}

export default function CsvImportForm({ onImport }: CsvImportFormProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    
    // Check if it's a CSV or Excel file
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'csv' && fileExt !== 'xlsx' && fileExt !== 'xls') {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload a CSV or Excel file.",
      });
      return;
    }

    setFileName(file.name);
    
    // Read the file as text (for CSV)
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string): ImportedCardData[][] => {
    // Simple CSV parsing
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      return headers.map((header, index) => ({
        fieldName: header,
        fieldValue: values[index] || '',
      }));
    }).filter(card => card.some(field => field.fieldValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileContent) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a CSV or Excel file.",
      });
      return;
    }
    
    if (!collectionName) {
      toast({
        variant: "destructive",
        title: "Collection name required",
        description: "Please enter a name for your card collection.",
      });
      return;
    }
    
    try {
      const parsedData = parseCSV(fileContent);
      
      if (parsedData.length === 0) {
        toast({
          variant: "destructive",
          title: "Empty file",
          description: "The uploaded file does not contain any valid data.",
        });
        return;
      }
      
      toast({
        title: "File processed successfully",
        description: `Found ${parsedData.length} cards to import.`,
      });
      
      onImport(parsedData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error processing file",
        description: "Could not parse the uploaded file. Make sure it's valid CSV format.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="collection-name">Collection Name</Label>
        <Input
          id="collection-name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter a name for your card collection"
          className="bg-muted/50"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="collection-description">Description (Optional)</Label>
        <Textarea
          id="collection-description"
          value={collectionDescription}
          onChange={(e) => setCollectionDescription(e.target.value)}
          placeholder="Describe your collection"
          className="bg-muted/50 min-h-24"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Upload CSV or Excel File</Label>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/10" : "border-border",
            fileName && "border-green-500/50 bg-green-500/5"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={handleFileInput}
          />
          
          {fileName ? (
            <div className="flex flex-col items-center">
              <FileText className="w-10 h-10 text-green-500 mb-2" />
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-muted-foreground mt-1">File uploaded successfully</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="font-medium">Drag and drop your file here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: .csv, .xlsx, .xls
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        disabled={!fileContent || !collectionName}
      >
        Import Cards
      </Button>
    </form>
  );
}
